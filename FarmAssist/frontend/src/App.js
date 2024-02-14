import "./css/App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CropRecommend from "./components/CropRecommend";
import CropYield from "./components/CropYield";
import BlogPostPage from "./components/BlogPostPage";
import BlogCard from "./components/BlogCard";
import Fertilizer from "./components/Fertilizer";
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route
            exact
            path="/crop-recommend"
            element={<CropRecommend />}
          ></Route>
          <Route exact path="/crop-yield" element={<CropYield />}></Route>
          <Route
            exact
            path="/fertilizer-recommend"
            element={<Fertilizer />}
          ></Route>
          <Route exact path="/blogs" element={<BlogCard />}></Route>
          <Route exact path="/blogs/:id" element={<BlogPostPage />}></Route>
          <Route exact path="/news" element={<News />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
