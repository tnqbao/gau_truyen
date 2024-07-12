import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ComicCard from "./ComicCard";
import { Helmet } from "react-helmet-async";
import LoadingPage from "./LoadingPage";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [dataAPI, setDataAPI] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const {
    apiURL,
    getDataAPI,
    handlePageChange,
    page,
    handleComicClick,
    category,
    DOMAIN_API,
    setGlobalComics,
    loading,
    error,
    setLoading
  } = useContext(GlobalContext);

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
    return Math.ceil((windowSize.width - 640) / 256 + 2);
  };

  const goToPage = useCallback(
    (pageNumber) => {
      handlePageChange(pageNumber);
    },
    [handlePageChange]
  );

  const columnCount = getColumnCount();

  useEffect(() => {
    setLoading(true);
    getDataAPI(`${apiURL}`, (data) => {
      if (Array.isArray(data.data.items)) {
        setComics(data.data.items);
        setGlobalComics(data.data.items);
        setDataAPI(data.data);
        setTotalPages(
          Math.ceil(
            data.data.params.pagination.totalItems /
              data.data.params.pagination.totalItemsPerPage
          ) || 1
        );
        setLoading(false);
      } else {
        
      }
    });
  }, [getDataAPI, apiURL, setGlobalComics, setLoading]);

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

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (error) {
    return (
      <LoadingPage error={error}/>
    );
  }

  return (
    <div className="bg-[#121111]/0 w-full">
      <Helmet>
        <meta
          name="description"
          content={`Danh sách truyện thuộc thể loại ${category}. Tìm truyện mới nhất và phổ biến nhất trong thể loại này.`}
        />
      </Helmet>
      <h1 className="font-bold text-center text-zinc-50 text-2xl lg:text-4xl">
        {dataAPI.titlePage && String(dataAPI.titlePage).toUpperCase()}
      </h1>
      {dataAPI.titlePage && (
        <div className="flex justify-center py-5 px-3 border-solid-[#dba902] text-sm">
          <button
            className="flex-1 cursor-pointer p-3 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <p>Trang Trước</p>
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
              className={`flex-1 border-solid cursor-pointer p-3 m-6 rounded-md font-bold relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                pageNumber === page
                  ? "bg-[#dba902] text-black"
                  : "bg-gray-800 text-white hidden md:block"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="flex-1 border-solid cursor-pointer p-3 m-6 rounded-md font-bold bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Trang Sau
          </button>
        </div>
      )}
      <div className="border-2 border-double border-amber-500 overflow-hidden w-full">
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
      {dataAPI.titlePage && (
        <div className="flex justify-center border-solid-[#dba902] p-10">
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
              className={`flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md font-bold relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                pageNumber === page
                  ? "bg-[#dba902] text-black"
                  : "bg-gray-800 text-white hidden md:block"
              }`}
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
      )}
    </div>
  );
};

export default ComicList;
