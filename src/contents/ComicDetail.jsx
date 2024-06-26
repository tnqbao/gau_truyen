import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";

const ComicDetail = () => {
  const { DOMAIN_API, getDataAPI, DateParse, handleChapterClick } = useContext(GlobalContext);
  const { slug } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    getDataAPI(`${DOMAIN_API}/v1/api/truyen-tranh/${slug}`, (data) => {
      setComic(data.data);
    });
  }, [DOMAIN_API, getDataAPI, slug]);

  return (
    <div className="text-white w-full h-full bg-white/70 p-5">
      {comic ? (
        <div className="overflow-hidden w-full items-start">
          <div className="flex items-start justify-start">
            <div className="text-2xl text-start w-full text-black font-bold p-5 m-5">
              <p className="text-2xl md:text-xl"> {comic.item.name}</p>
              <time>{DateParse(comic.item.updatedAt)}</time>
              <div className="flex flex-wrap justify-start gap-5 text-start bg-white/0">
                <img
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.item.thumb_url}`}
                  className="md:flex-initial	 rounded-t-md object-cover object-center md: "
                  alt={comic.item.name}
                />
                <div className="">
                  <table className="h-3/4 divide-y divide-gray-200 justify-start">
                    <tbody>
                      <tr className=" ">
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          Tên Khác
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {comic.item.origin_name}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          Tác Giả
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {comic.item.author}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          Tình Trạng
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {comic.item.status}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-6 py-4 text-gray-500 font-medium text-start">
                          Thể Loại
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
                      <a href={`/truyen-tranh/${comic.item.slug}/chap=1`}>
                        Đọc Từ Đầu
                      </a>
                    </button>
                    <button className="p-3 bg-green-600/50 rounded-xl">
                      <a
                        href={`/truyen-tranh/${comic.item.slug}/chap=${
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
          <div className="flex flex-wrap mt-5 text-black">
            <h2 className="text-2xl font-bold">Nội Dung</h2>
            <p className="text-wrap">{comic.item.content}</p>
          </div>
          <div>
            <ul>
              {Array.isArray(comic.item.chapters[0].server_data) &&
                comic.item.chapters[0].server_data.map((chap, index) => (
                  <li className="" key={index}>
                    <button className="" onClick={handleChapterClick}>
                    <a
                      href={`/truyen-tranh/${comic.item.slug}/chap=${
                        index + 1
                      }`}
                    >{`Chap ${chap.chapter_name} - ${comic.item.name}`}</a>
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
