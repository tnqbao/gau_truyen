import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useSearchParams } from "react-router-dom";

const ChapterMenuChange = ({ chapters = [], slug }) => {
  const { handleChapterChange } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const chap = parseInt(searchParams.get("chap"), 10);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const getVisibleChapters = () => {
    return chapters;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    if (dropdownVisible && dropdownRef.current) {
      const currentChapterElement = dropdownRef.current.querySelector(`#chapter-${chap}`);
      if (currentChapterElement) {
        dropdownRef.current.scrollTop = currentChapterElement.offsetTop - dropdownRef.current.offsetTop;
      }
    }
  }, [dropdownVisible, chap]);

  return (
    <div className="flex justify-center gap-3 mt-5 mb-2 p-5">
      <button
        className={`w-32 rounded-md bg-yellow-500 ${chap <= 1 ? "disabled:bg-slate-400" : ""}`}
        onClick={() => handleChapterChange(slug, chap - 1)}
        disabled={chap <= 1}
      >
        Chap Trước
      </button>
      <div className="relative">
        <button
          id="dropdownHoverButton"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDropdown}
        >
          {'Chapter ' + chap}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            id="dropdownHover"
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 overflow-y-auto max-h-40"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              {getVisibleChapters().map((e, index) => (
                <li key={index} id={`chapter-${parseInt(e.chapter_name, 10)}`}>
                  <div
                    className={`"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer " + ${parseInt(e.chapter_name, 10)===chap ? "bg-gray-500/50" : "bg-white" } `}
                    onClick={() => {
                      handleChapterChange(slug, parseInt(e.chapter_name, 10));
                      setDropdownVisible(false);
                    }}
                  >
                    {`Chapter ${e.chapter_name}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        className={`rounded-md w-32 bg-yellow-500 ${chap >= chapters.length ? "disabled:bg-slate-400" : ""}`}
        onClick={() => handleChapterChange(slug, chap + 1)}
        disabled={chap >= chapters.length}
      >
        Chap Tiếp
      </button>
    </div>
  );
};

export default ChapterMenuChange;
 