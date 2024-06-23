import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { GlobalContext } from "./context/GlobalContext";
import ComicList from "./contents/ComicList";
import ComicSlider from "./contents/ComicSlider";
const Home = () => {
  const { category, getDataAPI } = useContext(GlobalContext);
  return (
    <>
      <Helmet>
        <title>Gấu Truyện</title>
      </Helmet>
      <div className=" flex bg-[#121111] mx-5 md:mx-20 h-2/4 p-10">
        {category ? <ComicList /> : <ComicSlider />}
        <div>{category ? "" : <ComicList />}</div>
      </div>
  
    </>
  );
};

export default Home;
