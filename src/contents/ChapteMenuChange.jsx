import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useSearchParams } from "react-router-dom";

const ChapterMenuChange = ({ chapters = [], slug }) => {
  const { handleChapterChange} = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const chap = parseInt(searchParams.get("chap"), 10);
  return (
    <div className="flex justify-center gap-3 mt-5 mb-2 p-5">
      <button className={`w-20 bg-white ${chap<=1 ? "disabled:bg-slate-400" : ""}`} onClick={() =>
        {
            handleChapterChange(slug,chap-1);
        }
      }
      disabled={chap <= 1}>Chap Trước</button>
      <div>
        <ul>
          {chapters.map((chap, index) => {
            <li key={index}>{`chapter` + chap.chapter_name}</li>;
          })}
        </ul>
      </div>
      <button className={`w-20 bg-white ${chap<=1 ? "disabled:bg-slate-400" : ""}`} onClick={() =>
        {
            handleChapterChange(slug,chap+1);
        }
      }
      disabled={chap >= chapters.length}> Chap Tiếp</button>
    </div>
  );
};

export default ChapterMenuChange;
