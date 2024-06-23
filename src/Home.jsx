import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { GlobalContext } from "./context/GlobalContext";
import ComicList from "./contents/ComicList";
import ComicSlider from "./contents/ComicSlider";
const Home = () => {
  const { category } = useContext(GlobalContext);
  return (
    <>
      <Helmet>
        <title>Gấu Truyện</title>
      </Helmet>
      <div className=" flex bg-[#121111]/80 mx-5 md:mx-20 h-full p-5">
        <div className="">{category ? <ComicList /> : <ComicSlider />}</div>
        {console.log(category)}
        <div>{category ? null : <ComicList />}</div>
      </div>
    </>
  );
};

export default Home;
