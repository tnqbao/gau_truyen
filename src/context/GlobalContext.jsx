import React, { createContext, useCallback, useState, useMemo } from "react";
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
  const [viewedChapters, setViewedChapters] = useState({});
  const [apiChapter, setApiChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getDataAPI = useCallback(async (apiURL, setParaFunc) => {
    try {
      const response = await axios.get(apiURL);
      setParaFunc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleCategorySearch = useCallback((keyWords) => {
    setKeyWords(keyWords || "");
    setCategory(keyWords || null);
    setPage(1);
    setApiURL(`${DOMAIN_API}/v1/api/tim-kiem?keyword=${keyWords || ""}&page=1`);
  }, [DOMAIN_API]);

  const handleChapterClick = useCallback(
    (slug, index) => {
      navigate(`/truyen-tranh/doc-truyen/${slug}?chap=${index}`);
    },
    [navigate]
  );

  const handleComicClick = useCallback(
    (comic) => {
      navigate(`/truyen-tranh/${comic.slug}`);
    },
    [navigate]
  );

  const handleMenuSelect = useCallback((newCategory) => {
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
  }, [DOMAIN_API, navigate]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setApiURL((prevURL) => prevURL.replace(/page=\d+/, `page=${newPage}`));
  }, []);

  const handleChapterChange = useCallback(
    (slug, chapter) => {
      const watchedChapters =
        JSON.parse(localStorage.getItem("watchedChapters")) || {};
      watchedChapters[slug] = watchedChapters[slug] || ["1", "Full"];
      if (!watchedChapters[slug].includes(chapter)) {
        watchedChapters[slug].push(chapter);
      }
      localStorage.setItem("watchedChapters", JSON.stringify(watchedChapters));
      setViewedChapters(watchedChapters);
      handleChapterClick(slug, chapter);
    },
    [handleChapterClick]
  );

  const reverseString = (str) => {
    return str.split("-").reverse().join("-");
  };

  const DateParse = (dateString) => {
    let dateStrings = dateString.split("T");
    dateStrings[1].split(".");
    return dateStrings[1].split(".")[0] + " " + reverseString(dateStrings[0]);
  };

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
      DateParse,
      handleChapterClick,
      setApiChapter,
      setLoading,
      setError,
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
      getDataAPI,
      handleChapterChange,
      handleComicClick,
      DateParse,
      setGlobalComics,
      handleChapterClick,
      setApiChapter,
      setLoading,
      setError,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
