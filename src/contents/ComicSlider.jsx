import React, { useState, useEffect, useRef, useContext } from "react";
import ComicCard from "./ComicCard";
import { GlobalContext } from "../context/GlobalContext";

const ComicSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [comicsPerPage, setComicsPerPage] = useState(4);
  const [loopCount, setLoopCount] = useState(0);
  const maxLoops = 3;
  const intervalRef = useRef(null);
  const { globalComics, handleComicClick, category } = useContext(GlobalContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setComicsPerPage(1);
      } else if (window.innerWidth < 768) {
        setComicsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setComicsPerPage(3);
      } else {
        setComicsPerPage(Math.ceil(window.innerWidth / 320));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const nextSlide = () => {
      setStartIndex((prevIndex) => {
        const newIndex = prevIndex + comicsPerPage;
        if (newIndex >= globalComics.length) {
          setLoopCount((prevLoopCount) => {
            if (prevLoopCount + 1 >= maxLoops) {
              return 0;
            }
            return prevLoopCount + 1;
          });
          return 0;
        }
        return newIndex;
      });
    };

    intervalRef.current = setInterval(nextSlide, 10000);

    return () => clearInterval(intervalRef.current);
  }, [comicsPerPage, globalComics.length]);

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + comicsPerPage;
      if (newIndex >= globalComics.length) {
        setLoopCount((prevLoopCount) => {
          if (prevLoopCount + 1 >= maxLoops) {
            return 0;
          }
          return prevLoopCount + 1;
        });
        return 0;
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex === 0) {
        setLoopCount((prevLoopCount) => {
          if (prevLoopCount > 0) {
            return prevLoopCount - 1;
          }
          return maxLoops - 1;
        });
        return globalComics.length - comicsPerPage;
      }
      return prevIndex - comicsPerPage;
    });
  };

  const displayedComics =
    globalComics.length > 0
      ? globalComics.slice(startIndex, startIndex + comicsPerPage)
      : [];

  return (
    <div className="w-full relative">
    </div>
  );
};

export default ComicSlider;
