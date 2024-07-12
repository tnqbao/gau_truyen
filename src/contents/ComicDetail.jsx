import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const ComicDetail = () => {
  const {
    DOMAIN_API,
    getDataAPI,
    loading,
    error,
    setLoading,
    setError,
    chapterNames,
    setChapterNames,
  } = useContext(GlobalContext);
  const { slug } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDataAPI(`${DOMAIN_API}/v1/api/truyen-tranh/${slug}`, (data) => {
      setComic(data.data);
      setLoading(false);
      if (!data.data) {
        setError("Link Hỏng");
      }
    });
  }, [DOMAIN_API, getDataAPI, slug, setLoading, setError]);

  useEffect(() => {
    if (
      comic &&
      comic.item &&
      comic.item.chapters[0] &&
      comic.item.chapters[0].server_data
    ) {
      const chapterNames_ = comic.item.chapters[0].server_data.map(
        (chap) => chap.chapter_name
      );
      console.log(chapterNames_);
      setChapterNames(chapterNames_);
    }
  }, [comic, setChapterNames]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <LoadingPage error={error} />;
  }

  return (
    <div className="text-white w-full h-full bg-gray-900 p-5">
      {comic ? (
        <div className="overflow-hidden w-full items-start bg-black/30">
          <div className="flex items-start justify-start">
            <div className="text-2xl text-start w-full text-gray-50 font-bold p-5  rounded-lg border-4">
              <p className="text-xl md:text-3xl text-center bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent ">
                {comic.item.name.toUpperCase()}
              </p>

              <p className="text-center font-light p-2">
                {comic.item.origin_name}
              </p>
              <hr className="" />
              <div className="flex flex-wrap justify-center gap-24 text-start bg-white/0 items-stretch pt-10">
                <div className="flex-auto">
                  <img
                    src={`https://img.otruyenapi.com/uploads/comics/${comic.item.thumb_url}`}
                    className="md:flex-initial rounded-t-md object-cover object-center rounded-sm border-2 p-1 w-full"
                    alt={comic.item.name}
                    loading="lazy"
                  />
                </div>
                <div className="flex-auto flex flex-col gap-10">
                  <table className="flex h-3/4 divide-y divide-gray-200 w-full max-w-2xl  text-start items-center">
                    <tbody className="">
                      <tr className="flex w-full space-x-4 justify-evenly py-3 flex-wrap">
                        <td className="px-2 py-2 bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent font-medium flex-1 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <p> Tác Giả</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 text-white font-bold"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                          </div>
                        </td>
                        <td className="px-2 py-2 flex-1 bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent text-wrap">
                          {comic.item.author}
                        </td>
                      </tr>
                      <tr className="flex w-full space-x-4 justify-between py-3 flex-wrap">
                        <td className="px-2 py-2 bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent font-medium flex-1 whitespace-nowrap">
                          Số Chương
                        </td>
                        <td className="px-2 py-2 text-gray-50 flex-1 text-wrap">
                          {comic.item.chapters[0].server_data.length}
                        </td>
                      </tr>
                      <tr className="flex w-full space-x-4 justify-between py-3 flex-wrap">
                        <td className="px-2 py-2 bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent font-medium flex-1 whitespace-nowrap">
                          Tình Trạng
                        </td>
                        <td
                          className={`px-2 py-2 flex-1 text-wrap ${
                            comic.item.status === "ongoing"
                              ? "text-amber-500"
                              : "text-green-800"
                          }`}
                        >
                          {comic.item.status === "ongoing"
                            ? "Đang Ra"
                            : "Hoàn Thành"}
                        </td>
                      </tr>
                      <tr className="flex w-full space-x-4 justify-between py-3 flex-wrap">
                        <td className="px-2 py-2 bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent font-medium text-start flex-1 whitespace-nowrap">
                          Thể Loại
                        </td>
                        <td className="px-2 py-2 text-gray-50 flex-1 flex flex-wrap">
                          {Array.isArray(comic.item.category) &&
                            comic.item.category.map((e, index) => (
                              <span key={index} className="text-wrap">
                                {e.name}
                                {index + 1 < comic.item.category.length
                                  ? " "
                                  : ""}
                              </span>
                            ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex flex-wrap p-10 justify-start gap-10 ">
                    <button className="p-2 bg-green-600/50 rounded-xl">
                      <a
                        href={`/truyen-tranh/doc-truyen/${comic.item.slug}?i=1`}
                      >
                        Đọc Từ Đầu
                      </a>
                    </button>
                    <button className="p-2 bg-green-600/50 rounded-xl">
                      <a
                        href={`/truyen-tranh/doc-truyen/${comic.item.slug}?i=${chapterNames.length}`}
                      >
                        Đọc Mới Nhất
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mt-5 text-black rounded-lg border-4  bg-gray-900 ">
            <h2 className="text-2xl font-bold text-center w-full bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent">Nội Dung</h2>
            <hr />
            <p className="text-wrap ml-2 bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent">
              {comic.item.content.startsWith("<p>")
                ? comic.item.content.split("<p>")[1].split("</p>")[0]
                : comic.item.content}
            </p>
          </div>
          <div className="rounded-lg border-4  bg-gray-900 mt-5">
            <h2 className="text-2xl font-bold text-black px-1 py-5 text-center w-full bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent ">
              Danh Sách Chương
            </h2>
            <ul className="flex flex-col w-full flex-wrap justify-center items-center">
              {Array.isArray(comic.item.chapters[0].server_data) &&
                comic.item.chapters[0].server_data.map((chap, index) => (
                  <li key={index} className={`w-full py-5 ${
                        index % 2 === 0 ? "bg-black/10" : ""
                      }`}>
                    <a
                      className={`text-white bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparents w-full text-left pl-5`}
                      href={`/truyen-tranh/doc-truyen/${comic.item.slug}?i=${index+1}`}
                    >
                      {`Chương ${chap.chapter_name} - ${comic.item.name}`}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ComicDetail;
