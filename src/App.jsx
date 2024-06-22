import React from "react";
import "./App.css";
import Header from "./header/Header";
import Home from "./Home";
import Navbar from "./navbar/Navbar";
import ChapterContent from "./contents/ChapterContent";
import ComicDetail from "./contents/ComicDetail";
import { GlobalProvider } from "./context/GlobalContext";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./footer/Footer";

function App() {
  return (
    <div>
      <GlobalProvider>
        <HelmetProvider>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/danh-sach/:category" element={<Home />} />
            <Route path="/truyen-tranh/:slug" element={<ComicDetail />} />
            <Route
              path="/truyen-tranh/:slug/chap=:chap"
              element={<ChapterContent />}
            />
          </Routes>
          <Footer />
        </HelmetProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
