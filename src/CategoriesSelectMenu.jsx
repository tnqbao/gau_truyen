import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./context/GlobalContext";
const CategoriesSelectMenu = ({ element, handleMenuSelect }) => {
  const [categories, setCategories] = useState([]);
  const { DOMAIN_API } = useState(GlobalContext);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/the-loai`
        );
        setCategories(response.data.data.items);
        console.log(response.data.data.items);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDocumentClick = (e) => {
    const cateList = document.getElementById("cate-list");
    const cateToggleButton = document.getElementById("cate-button");

    if (cateToggleButton && cateToggleButton.contains(e.target)) {
      if (cateList) {
        cateList.classList.toggle("hidden");
        console.log("Toggled cate-list visibility");
      }
    } else if (cateList && !cateList.contains(e.target)) {
      cateList.classList.add("hidden");
      console.log("Hid cate-list");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const topMenu = document.getElementById("cate-list");
    if (topMenu) {
      topMenu.classList.add("hidden");
    }
  }, []);

  return (
    <div className="relative">
      <div
        id="cate-button"
        className="text-slate-200 text-xl font-medium ml-5 flex gap-3 p-7 cursor-pointer text-center border-y-slate-500 hover:bg-[#2c3f3b] relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
      >
        {element}
        <svg
          className="self-end w-6 h-6 hover:text-stone-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        id="cate-list"
        className="hidden bg-white shadow-lg rounded-lg mt-2 p-4 left-0 z-0 text-black "
      >
        <div className="flex flex-wrap gap-4 md:gap-2 justify-start ">
          {categories.map((category) => (
            <div
              key={category._id}
              className="p-2 hover:bg-gray-200 cursor-pointer bg-black/30"
              onClick={() => handleMenuSelect(category.slug)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategoriesSelectMenu;
