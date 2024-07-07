import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const ComicDetail = () => {
  const {
    DOMAIN_API,
    getDataAPI,
    DateParse,
    handleChapterClick,
    loading,
    error,
    setLoading,
    setError,
  } = useContext(GlobalContext);
  const { slug } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDataAPI(`${DOMAIN_API}/v1/api/truyen-tranh/${slug}`, (data) => {
      setComic(data.data);
      if (data.data) {
        setLoading(false);
      } else {
        setError("Link Hỏng");
      }
    });
  }, [DOMAIN_API, getDataAPI, slug, setLoading, setError]);
  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <LoadingPage error={error} />;
  }

  return (
    <div className="text-white w-full h-full bg-white/70 p-5  ">
      {comic ? (
        <div className="overflow-hidden w-full items-start bg-black/30">
          <div className="flex items-start justify-start ">
            <div className="text-2xl text-start w-full text-black font-bold p-5 m-5 rounded-lg border-4">
              <p className="text-xl md:text-3xl text-center"> {comic.item.name.toUpperCase()}</p>
              <p className="text-center font-light">  {comic.item.origin_name}</p>
              <hr className="m-3"></hr>
              <div className="flex flex-wrap justify-start gap-5 text-start bg-white/0">
                <img
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.item.thumb_url}`}
                  className="md:flex-initial rounded-t-md object-cover object-center rounded-sm border-2 p-1 "
                  alt={comic.item.name}
                />
                <div className="">
                  <table className="h-3/4 divide-y divide-gray-200 justify-start">
                    <tbody>
                      <tr className=" ">
                        <td className="px-6 py-4 text-white/70 font-medium">
                          Tác Giả/Author
                        </td>
                        <td className="px-6 py-4">
                        {comic.item.author}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-white/70 font-medium">
                          Số Chương/Chapters
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {comic.item.chapters[0].server_data.length}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-white/70 font-medium">
                          Tình Trạng/Status
                        </td>
                        <td className={`px-6 py-4 text-gray-900 ${comic.item.status==="ongoing" ? "text-amber-500" : "text-green-800"}`}>
                          {comic.item.status==="ongoing" ? "Đang Ra" : "Hoàn Thành"}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-white/70 font-medium text-start">
                          Thể Loại/Category
                        </td>
                        <td className="px-6 py-4 text-gray-900 ">
                          {Array.isArray(comic.item.category) &&
                            comic.item.category.map((e, index) => (
                              <>
                                {e.name}{" "}
                                {index + 1 < comic.item.category.length
                                  ? "-"
                                  : ""}{" "}
                              </>
                            ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-wrap ml-3 gap-5">
                    <button className="p-3 bg-green-600/50 rounded-xl">
                      <a
                        href={`/truyen-tranh/doc-truyen/${comic.item.slug}?chap=1`}
                      >
                        Đọc Từ Đầu
                      </a>
                    </button>
                    <button className="p-3 bg-green-600/50 rounded-xl">
                      <a
                        href={`/truyen-tranh/doc-truyen/${
                          comic.item.slug
                        }?chap=${
                          comic.item.chapters[0].server_data.length + 1
                        }`}
                      >
                        Đọc Mới Nhất
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-5 text-black rounded-lg border-4 m-5 bg-white/50">
            <h2 className="text-2xl font-bold text-center w-full">Nội Dung</h2>
            <hr></hr>
            <p className="text-wrap ml-2">{comic.item.content.startsWith("<p>") ? comic.item.content.split("<p>")[1].split("</p>")[0] : comic.item.content}</p>
          </div>
          <div className="rounded-lg border-4 m-5 bg-white/50">
            <h2 className="text-2xl font-bold text-black px-1 py-5 text-center w-full ">
              Danh Sách Chương
            </h2>
            <ul>
              {Array.isArray(comic.item.chapters[0].server_data) &&
                comic.item.chapters[0].server_data.map((chap, index) => (
                  <li className="" key={index}>
                    <button
                      className={`p-3 text-black w-full text-left ${
                        index % 2 === 0 ? "bg-black/10" : ""
                      }`}
                      onClick={() => {
                        handleChapterClick(slug, index + 1);
                      }}
                    >
                      {`Chương ${chap.chapter_name} - ${comic.item.name}`}
                    </button>
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
