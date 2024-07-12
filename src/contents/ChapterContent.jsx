import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams, useSearchParams } from "react-router-dom";
import ChapterMenuChange from "./ChapterMenuChange";
import LoadingPage from "./LoadingPage";

const ChapterContent = () => {
  const { getDataAPI, loading, error, setLoading } = useContext(GlobalContext);
  const [comic, setComic] = useState([]);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const i = parseInt(searchParams.get("i"));
  const [chapter, setChapter] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const imageControllersRef = useRef([]); 

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    getDataAPI(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, (data) => {
      if (isMounted) {
        setComic(data.data.item.chapters[0].server_data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [getDataAPI, slug, setLoading]);

  useEffect(() => {
    if (Array.isArray(comic) && comic.length > 0 && i > 0 && i <= comic.length) {
      if (imageControllersRef.current.length > 0) {
        imageControllersRef.current.forEach(controller => controller.abort());
      }
      imageControllersRef.current = [];

      const controller = new AbortController();
      const signal = controller.signal;
      setLoading(true);

      getDataAPI(comic[i].chapter_api_data, (data) => {
        setChapter(data.data.item);
        setLoading(false);
      }, signal);

      window.scrollTo(0, 400);

      return () => {
        controller.abort();
      };
    }
  }, [getDataAPI, comic, i, setLoading]);

  useEffect(() => {
    if (chapter.chapter_image && chapter.chapter_image.length > 0) {
      const controllers = [];
      const newImageUrls = [];

      chapter.chapter_image.forEach((page, index) => {
        const controller = new AbortController();
        controllers.push(controller);

        fetch(`https://sv1.otruyencdn.com/${chapter.chapter_path}/${page.image_file}`, { signal: controller.signal })
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            newImageUrls[index] = url; 
            setImageUrls([...newImageUrls]); 
          })
          .catch(error => {
            if (error.name !== 'AbortError') {
              console.error('Failed to fetch images:', error);
            }
          });
      });

      imageControllersRef.current = controllers;
    }

    return () => {
      imageControllersRef.current.forEach(ctrl => ctrl.abort());
      imageControllersRef.current = [];
    };
  }, [chapter.chapter_image, chapter.chapter_path]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <LoadingPage error={error} />;
  }

  return (
    <div className="bg-gray-900">
      <h1 className="text-white text-3xl w-full text-center p-10">
        {"[Chương - " + comic[i-1].chapter_name + "]"}
      </h1>
      <ChapterMenuChange chapters={comic} slug={slug} />
      <div className="w-full p-10 flex justify-center items-center flex-col">
        {Array.isArray(imageUrls) &&
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Page ${index + 1}`}
              loading="lazy"
            />
          ))}
      </div> 
      <ChapterMenuChange chapters={comic} slug={slug} />
    </div>
  );
};

export default ChapterContent;
