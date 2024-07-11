import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams, useSearchParams } from "react-router-dom";
import ChapterMenuChange from "./ChapteMenuChange";
import LoadingPage from "./LoadingPage";

const ChapterContent = () => {
  const { getDataAPI, loading, error, setLoading, chapterNames } = useContext(GlobalContext);
  const [comic, setComic] = useState([]);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const i = parseInt(searchParams.get("i"));
  const [chapter, setChapter] = useState({});

  useEffect(() => {
    let isMounted = true; 
    setLoading(true);
    getDataAPI(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, (data) => {
      if (isMounted) {
        setComic(data.data.item.chapters[0].server_data);
        console.log(chapterNames)
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; 
    };
  }, [getDataAPI, slug, setLoading]);

  useEffect(() => {
    if (Array.isArray(comic) && comic.length > 0 && i >= 0 && i <= comic.length) {
      let isMounted = true; 
      setLoading(true);
      getDataAPI(comic[i-1].chapter_api_data, (data) => {
        if (isMounted) {
          setChapter(data.data.item);
          setLoading(false);
        }
      });
      window.scrollTo(0, 400);

      return () => {
        isMounted = false; 
      };
    }
  }, [getDataAPI, comic, i, setLoading]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <LoadingPage error={error} />;
  }

  return (
    <div className="bg-gray-900">
      <h1 className="text-white text-xl w-full text-center">
        {"[Chương - " + chapterNames[i] + "]"}
      </h1>
      <ChapterMenuChange chapters={comic} slug={slug} />
      <div className="w-full p-10 flex justify-center items-center flex-col">
        {Array.isArray(chapter.chapter_image) &&
          chapter.chapter_image.map((page, index) => (
            <img
              key={index}
              src={`https://sv1.otruyencdn.com/${chapter.chapter_path}/${page.image_file}`}
              alt={page.image_page}
              loading="lazy"
            />
          ))}
      </div> 
      <ChapterMenuChange chapters={comic} slug={slug} />
    </div>
  );
};

export default ChapterContent;
