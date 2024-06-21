import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ComicCard from "./ComicCard";
import { Helmet } from "react-helmet"; 

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { apiURL, getDataAPI, handlePageChange, page , handleComicClick, category, DOMAIN_API} = useContext(GlobalContext);
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getColumnCount = () => {
    return Math.ceil((windowSize.width - 640) / 256 + 1);
  };

  const goToPage = useCallback(
    (pageNumber) => {
      handlePageChange(pageNumber);
    },
    [handlePageChange]
  );

  const columnCount = getColumnCount();

  useEffect(() => {
    getDataAPI(`${apiURL}/v1/api/the-loai`, (data) => {
      if (Array.isArray(data.data.items)) {
        setComics(data.data.items);
        setTotalPages(
          Math.ceil(
            data.data.params.pagination.totalItems /
              data.data.params.pagination.totalItemsPerPage
          ) || 1
        );
      } else {
        console.error("Expected data to be an array", data);
      }
    });
  }, [getDataAPI, apiURL]);

  const getPageNumbers = useCallback(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (page === 1) {
      return [1, 2, 3, "...", totalPages];
    } else if (page >= totalPages) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (page <= totalPages / 2) {
      return [page - 1, page, page + 1, "...", totalPages];
    } else if (page > totalPages / 2) {
      return [1, "...", page - 1, page, page + 1];
    }
    return [];
  }, [totalPages, page]);

  return (
    <div className="bg-[#121111]">
      <Helmet>
        {/* <title>{category} - Cú Phim</title> */}
        <meta
          name="description"
          content={`Danh sách phim thuộc thể loại ${category}. Tìm phim mới nhất và phổ biến nhất trong thể loại này.`}
        />
      </Helmet>
      <br />
      <br />
      <h1 className="font-bold text-center text-zinc-50 text-4xl">
        {category}
      </h1>
      <br />
      <div className="flex justify-center border-solid-[#dba902]">
        <button
          className="flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Trang Trước
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === "..."}
            onClick={() => {
              if (pageNumber !== "...") {
                goToPage(pageNumber);
              }
            }}
            className={
              "flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 " +
              (pageNumber === page
                ? "bg-[#dba902] text-black"
                : "bg-gray-800 text-white hidden md:block")
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Trang Sau
        </button>
      </div>
      <div className="border-2 border-double border-amber-500 overflow-hidden">
        <div className="flex flex-wrap justify-start">
          {Array.isArray(comics) &&
            comics.map((comic, index) => (
              <div
                key={comic._id}
                className="p-1"
                style={{
                  flex: `0 0 ${100 / columnCount}%`,
                  maxWidth: `${100 / columnCount}%`,
                }}
              >
                <ComicCard
                  comic={comic}
                  DOMAIN_API={DOMAIN_API}
                  onClick={() => handleComicClick(comic)}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center border-solid-[#dba902]">
        <button
          className="flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Trang Trước
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === "..."}
            onClick={() => {
              if (pageNumber !== "...") {
                goToPage(pageNumber);
              }
            }}
            className={
              "flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 " +
              (pageNumber === page
                ? "bg-[#dba902] text-black"
                : "bg-gray-800 text-white hidden md:block")
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Trang Sau
        </button>
      </div>
    </div>
  );
};

export default ComicList;
