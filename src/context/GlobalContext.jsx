import React, { createContext, useCallback, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [keyWord, setKeyWords] = useState("");
  const DOMAIN_API = "https://otruyenapi.com";
  const [page, setPage] = useState(1);
  const [apiURL, setApiURL] = useState(`${DOMAIN_API}/v1/api/home`);
  const [globalComics, setGlobalComics] = useState([]);
  const [viewedChapters, setViewedChapters] = useState(() => JSON.parse(localStorage.getItem("watchedChapters")) || {});
  const [apiChapter, setApiChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapterNames, setChapterNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("watchedChapters", JSON.stringify(viewedChapters));
  }, [viewedChapters]);

  const getDataAPI = useCallback(async (apiURL, setParaFunc) => {
    try {
      const response = await axios.get(apiURL);
      setParaFunc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  }, []);

  const handleCategorySearch = useCallback(
    (keyWords) => {
      setKeyWords(keyWords || "");
      setCategory(keyWords || null);
      setPage(1);
      setApiURL(
        `${DOMAIN_API}/v1/api/tim-kiem?keyword=${keyWords || ""}&page=1`
      );
    },
    [DOMAIN_API]
  );

  const handleChapterClick = useCallback(
    (slug, i) => {
      navigate(`/truyen-tranh/doc-truyen/${slug}?i=${i+1}`);
    },
    [navigate]
  );

  const handleComicClick = useCallback(
    (comic) => {
      navigate(`/truyen-tranh/${comic.slug}`);
    },
    [navigate]
  );

  const handleMenuSelect = useCallback(
    (newCategory) => {
      setCategory(newCategory);
      setPage(1);
      const categoryURLs = {
        "Trang Chủ": "/",
        "Truyện Mới": `${DOMAIN_API}/v1/api/danh-sach/truyen-moi?page=1`,
        "Truyện Full": `${DOMAIN_API}/v1/api/danh-sach/hoan-thanh?page=1`,
        "Truyện Đang Ra": `${DOMAIN_API}/v1/api/danh-sach/dang-phat-hanh?page=1`,
        "Truyện Sắp Ra Mắt": `${DOMAIN_API}/v1/api/danh-sach/sap-ra-mat?page=1`,
      };

      const extractCategory = (url) => {
        const matchDs = url.match(/danh-sach\/(.*?)\?/);
        const matchTl = url.match(/the-loai\/(.*?)\?/);
        if (matchDs) {
          return matchDs[1];
        }
        if (matchTl) {
          return matchTl[1];
        }
        return "";
      };

      const url =
        categoryURLs[newCategory] ||
        `${DOMAIN_API}/v1/api/the-loai/${newCategory}?page=1`;
      setApiURL(url);

      if (newCategory === "Trang Chủ") {
        navigate("/home");
      } else {
        const extractedCategory = extractCategory(url);
        navigate("/danh-sach/" + extractedCategory);
      }
    },
    [DOMAIN_API, navigate]
  );

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setApiURL((prevURL) => prevURL.replace(/page=\d+/, `page=${newPage}`));
  }, []);

  const handleChapterChange = useCallback(
    (slug, i) => {
      const watchedChapters =
        JSON.parse(localStorage.getItem("watchedChapters")) || {};
      watchedChapters[slug] = watchedChapters[slug] || ["1", "Full"];
      if (!watchedChapters[slug].includes(i)) {
        watchedChapters[slug].push(i);
      }
      localStorage.setItem("watchedChapters", JSON.stringify(watchedChapters));
      setViewedChapters(watchedChapters);
      handleChapterClick(slug, i);
    },
    [handleChapterClick]
  );

  const value = useMemo(
    () => ({
      category,
      keyWord,
      DOMAIN_API,
      page,
      apiURL,
      viewedChapters,
      globalComics,
      apiChapter,
      loading,
      error,
      chapterNames,
      setCategory,
      setKeyWords,
      setPage,
      setApiURL,
      handleCategorySearch,
      handleMenuSelect,
      handlePageChange,
      handleChapterChange,
      setViewedChapters,
      getDataAPI,
      handleComicClick,
      setGlobalComics,
      handleChapterClick,
      setApiChapter,
      setLoading,
      setError,
      setChapterNames,
    }),
    [
      category,
      keyWord,
      page,
      apiURL,
      viewedChapters,
      DOMAIN_API,
      globalComics,
      apiChapter,
      loading,
      error,
      chapterNames,
      getDataAPI,
      handleChapterChange,
      handleComicClick,
      setGlobalComics,
      handleChapterClick,
      setApiChapter,
      setLoading,
      setError,
      setChapterNames,
      handleCategorySearch,
      handleMenuSelect,
      handlePageChange,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
