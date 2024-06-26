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
  const navigate = useNavigate();

  const getDataAPI = useCallback(async (apiURL, setParaFunc) => {
    try {
      const response = await axios.get(apiURL);
      setParaFunc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleCategorySearch = (keyWords) => {
    setKeyWords(keyWords || "");
    setCategory(keyWords || null);
    setPage(1);
    setApiURL(`${DOMAIN_API}/v1/api/tim-kiem?keyword=${keyWords || ""}&page=1`);
  };

  const handleChapterClick = (chapter) => {
    console.log(chapter)
  };
  const handleComicClick = useCallback(
    (comic) => {
      navigate(`/truyen-tranh/${comic.slug}`);
    },
    [navigate]
  );

  const handleMenuSelect = (newCategory) => {
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
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setApiURL((prevURL) => prevURL.replace(/page=\d+/, `page=${newPage}`));
  };

  const handleEpisodeChange = useCallback(
    (slug, episode, server) => {
      const watchedEpisodes =
        JSON.parse(localStorage.getItem("watchedEpisodes")) || {};
      watchedEpisodes[slug] = watchedEpisodes[slug] || ["1", "Full"];
      if (!watchedEpisodes[slug].includes(episode)) {
        watchedEpisodes[slug].push(episode);
      }
      localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
      setViewedChapters(watchedEpisodes);
      navigate(`/movie/${slug}/watch?ep=${episode}&server=${server}`);
    },
    [navigate]
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
      setCategory,
      setKeyWords,
      setPage,
      setApiURL,
      handleCategorySearch,
      handleMenuSelect,
      handlePageChange,
      handleEpisodeChange,
      setViewedChapters,
      getDataAPI,
      handleComicClick,
      setGlobalComics,
      DateParse,
      handleChapterClick,
    }),
    [
      category,
      keyWord,
      page,
      apiURL,
      viewedChapters,
      DOMAIN_API,
      globalComics,
      getDataAPI,
      handleEpisodeChange,
      handleComicClick,
      DateParse,
      setGlobalComics,
      handleChapterClick
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
