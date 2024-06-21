import React from "react";
import { useNavigate } from "react-router-dom";

const ComicCard = ({ comic }) => {
  const navigate = useNavigate();

  const handleFilmClick = () => {
    navigate(`/truyen-tranh/${comic.slug}`);
  };

  const nameLength =comic.name.length;
  const displayName =
    nameLength > 30
      ? `${comic.name.substring(0, 45)}...`
      : nameLength <= 14
      ? `${comic.name}`
      :comic.name;

  return (
    <div
      className="relative p-2 border border-gray-800 rounded-lg cursor-pointer hover:shadow-lg m-2 hover:contrast-100 object-fill text-transparent hover:backdrop-brightness-200"
      onClick={handleFilmClick}
      style={{ height: '400px' }} 
    >
      <div className="relative w-full h-full">
        <img
          className="w-full h-full rounded-md object-cover object-center"
          src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
          alt={comic.name}
          loading="lazy"
        />
        {comic.quality && (
          <span className="absolute top-2 left-2 bg-red-600 text-black text-xs font-bold px-2 py-1 rounded">
            {comic.quality}
          </span>
        )}
        {comic.episode_current && (
          <span className="absolute top-2 right-2 bg-green-600 text-black text-xs font-bold px-2 py-1 rounded">
            {comic.episode_current}
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-xl">
          {displayName}
        </div>
      </div>
    </div>
  );
};

export default ComicCard;