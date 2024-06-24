import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { GlobalContext } from "./context/GlobalContext";
import ComicList from "./contents/ComicList";
import ComicSlider from "./contents/ComicSlider";

const Home = () => {
  const { category, globalComics } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title>Gấu Truyện</title>
      </Helmet>
      <div className="bg-white/10 mx-5 md:mx-40 h-full p-5 flex flex-col items-center justify-center">
        {category ? <ComicList /> : <ComicSlider />}
        <div className="w-full">
          {!category && (
            <div>
              <h2 className="text-2xl text-white font-bold">TRUYỆN HOT TRONG TUẦN</h2>
              <ComicList />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
