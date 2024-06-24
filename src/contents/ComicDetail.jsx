import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";

const ComicDetail = () => {
  const { DOMAIN_API, getDataAPI } = useContext(GlobalContext);
  const {slug} = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    getDataAPI(`${DOMAIN_API}/v1/api/truyen-tranh/${slug}`, (data) => {
      setComic(data.data);
      console.log(data.data);
    }, [slug]);
  }, [] );

  return (
    <div className="text-white w-full h-full">
       {comic && <img scr={`https://img.otruyenapi.com/uploads/comics/${comic.item.thumb_url}`}></img>}
    </div>
  );
};

export default ComicDetail;
