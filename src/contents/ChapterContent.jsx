import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams, useSearchParams } from "react-router-dom";
import ChapterMenuChange from "./ChapteMenuChange";

const ChapterContent = () => {
  const { getDataAPI } = useContext(GlobalContext);
  const [comic, setComic] = useState([]);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const chap = parseInt(searchParams.get('chap'), 10); 
  const [chapter, setChapter] = useState({});

  useEffect(() => {
    getDataAPI(
      `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`,
      (data) => {
        setComic(data.data.item.chapters[0].server_data);
      }
      
    );
    
  }, [getDataAPI, slug]);

  useEffect(() => {
    if (Array.isArray(comic) && comic.length > 0 && chap > 0 && chap <= comic.length) {
      getDataAPI(comic[chap - 1].chapter_api_data, (data) => {
        setChapter(data.data.item);
      });
      window.scrollTo(0, 0);
    }
  }, [getDataAPI, comic, chap]);

  return (
    <div>
      <h1 className="text-white text-xl w-full text-center">{"[Chương - " + chap + "]"}</h1>
      <ChapterMenuChange chapters={comic} slug={slug}/>
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
      <ChapterMenuChange chapters={comic} slug={slug}/>
    </div>
  );
};

export default ChapterContent;
