import React from "react";
import { useNavigate } from "react-router-dom";

const ComicCard = ({ comic }) => {
  const navigate = useNavigate();

  const handleFilmClick = () => {
    navigate(`/truyen-tranh/${comic.slug}`);
  };

  const nameLength = comic.name.length;
  const displayName =
    nameLength > 30
      ? `${comic.name.substring(0, 45)}...`
      : nameLength <= 14
      ? `${comic.name}`
      : comic.name;

  return (
    <div
      className="relative p-2 border border-gray-800 rounded-lg cursor-pointer hover:shadow-lg m-2 hover:contrast-100 object-fill text-transparent hover:backdrop-brightness-200"
      onClick={handleFilmClick}
      style={{ height: "400px" }}
    >
      <div className="relative w-full h-full">
        <img
          className="w-full h-full rounded-t-md object-cover object-center"
          src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
          alt={comic.name}
          loading="lazy"
        />
        <div className="absolute top-1 right-1 bg-amber-500 font-semibold rounded-md p-1 text-black"> {comic.chaptersLatest && "Tới Tập " + comic.chaptersLatest[0].chapter_name}</div>
        <div className="absolute top-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black via-black/30 to-transparent rounded-t-md">
          <div className="absolute bottom-0 left-2 right-2 text-white font-semibold text-xl">
            {displayName}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-black ">
          <div className="flex flex-wrap mt-2 ml-2 gap-2 justify-stretch">
            {Array.isArray(comic.category) &&
              comic.category.map((cate, index) => (
                <div key={index}>
                { 
                index<3 ?   <div className="py-1 px-3 bg-white/50 font-semibold text-black rounded-md">
                    {cate.name}
                  </div> : ""}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
