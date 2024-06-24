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
      <div className="bg-[#121111]/80 mx-5 md:mx-20 h-full p-5 flex flex-col items-center justify-center">
        {category ? <ComicList /> : <ComicSlider />}
        <div className="w-full">
          {category ? null : <ComicList />}
        </div>
      </div>
    </>
  );
};

export default Home;
