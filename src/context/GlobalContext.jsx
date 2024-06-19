import React, { createContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [keyWord, setKeyWords] = useState("");
  const [DOMAIN_API] = useState("https://otruyenapi.com");
  const [limit, setLimit] = useState(10);
  const [ep, setEpisode] = useState(1);
  const [page, setPage] = useState(1);
  const [apiURL, setApiURL] = useState(
    `${DOMAIN_API}/v1/api/danh-sach/truyen-moi?page=1`
  );
  const [viewedEpisodes, setViewedEpisodes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const watchedEpisodes =
      JSON.parse(localStorage.getItem("watchedEpisodes")) || {};
    setViewedEpisodes(watchedEpisodes);
  }, []);

  const handleCategorySearch = (keyWords) => {
    if (!keyWords) keyWords = null;
    setKeyWords(keyWords);
    setCategory(keyWords);
    setEpisode(1);
    setPage(1);
    const url = `${DOMAIN_API}/v1/api/tim-kiem?keyword=${keyWords}&page=1`;
    setApiURL(url);
  };

  const handleMenuSelect = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setEpisode(1);
    console.log(newCategory);
    let url = "";
    switch (newCategory) {
      case "Trang Chủ":
        break;
      case "Truyện Mới":
        url = `${DOMAIN_API}/v1/api/danh-sach/truyen-moi?page=1`;
        break;
      case "Truyện Full":
        url = `${DOMAIN_API}/v1/api/danh-sach/hoan-thanh?page=1`;
        break;
      case "Truyện Đang Ra":
        url = `${DOMAIN_API}/v1/api/danh-sach/dang-phat-hanh?page=1`;
        break;
      case "Truyện Sắp Ra Mắt":
        url = `${DOMAIN_API}/v1/api/danh-sach/sap-ra-mat?page=1`;
        break;
      default:
        url = `${DOMAIN_API}/v1/api/the-loai/${newCategory}?page=1`;
        break;
    }
    setApiURL(url);
    if (newCategory === "Trang Chủ") {
      navigate("/");
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
      if (!watchedEpisodes[slug]) {
        watchedEpisodes[slug] = [];
        watchedEpisodes[slug].push("1", "Full");
      }
      if (!watchedEpisodes[slug].includes(episode)) {
        watchedEpisodes[slug].push(episode);
      }
      localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
      setViewedEpisodes(watchedEpisodes);
      setEpisode(episode);
      navigate(`/movie/${slug}/watch?ep=${episode}&server=${server}`);
    },
    [navigate]
  );

  return (
    <GlobalContext.Provider
      value={{
        category,
        keyWord,
        DOMAIN_API,
        limit,
        ep,
        page,
        apiURL,
        viewedEpisodes,
        setCategory,
        setKeyWords,
        setLimit,
        setEpisode,
        setPage,
        setApiURL,
        handleCategorySearch,
        handleMenuSelect,
        handlePageChange,
        handleEpisodeChange,
        setViewedEpisodes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
