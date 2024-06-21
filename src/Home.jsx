import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { GlobalContext } from "./context/GlobalContext";
const Home = () => {
  const {category} = useContext(GlobalContext);
  return (
    <>
      <Helmet>
        <title>Cú Truyện</title>
      </Helmet>
      <div className=" flex bg-slate-200 mx-5 md:mx-20 h-2/4">
      {category ? "" : ""}
      </div>
    </>
  );
};

export default Home;
