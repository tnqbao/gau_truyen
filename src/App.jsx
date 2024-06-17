import React from 'react';
import './App.css';
import Header from './layout/header/Header';
import Home from './layout/Home';
import Navbar from './layout/navbar/Navbar';
import ComicList from './layout/contents/ComicList';
import ChapterContent from './layout/contents/ChapterContent';
import ComicDetail from './layout/contents/ComicDetail';
import { GlobalProvider } from './context/GlobalContext';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<ComicList />} />
          <Route path="/truyen/:slug" element={<ComicDetail />} />
          <Route path="/truyen/:slug/chap=:chap" element={<ChapterContent />} />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
