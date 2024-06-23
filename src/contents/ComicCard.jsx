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
        <div className="absolute top-1 left-1 text-center bg-green-600 font-semibold rounded-md p-1 text-black">
          {comic.status === "completed"
            ? "Hoàn Thành"
            : comic.status === "coming_soon"
            ? "Sắp Ra Mắt"
            : "Đang Ra"}
        </div>
        <div className="absolute top-1 right-1 text-center bg-red-600 font-semibold rounded-md p-1 text-black">
          {comic.chaptersLatest
            ? comic.status === "completed"
              ? `${comic.chaptersLatest[0].chapter_name} Chap`
              : `Chap ${comic.chaptersLatest[0].chapter_name}`
            : ""}
        </div>
        <div className="absolute top-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black via-black/30 to-transparent rounded-t-md">
          <div className="absolute bottom-0 left-2 right-2 text-white font-semibold text-xl">
            {displayName}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-black ">
          <div className="absolute bottom-7 right-4 left-4  text-center bg-amber-500 hover:bg-green-600 font-semibold rounded-md p-1 text-black">
            {"Xem Truyện"}
          </div>
          {/* <div className="flex flex-wrap mt-2 ml-2 gap-1 justify-stretch">
            {Array.isArray(comic.category) &&
              comic.category.map((cate, index) => (
                <div key={index}>
                { 
                index<3 ?   <div className="py-0 px-3 bg-amber-400 font-semibold text-black rounded-md">
                    {cate.name}
                  </div> : ""}
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
