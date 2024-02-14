import NewsItem from "./NewsItem";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import { fetchNews } from "../api/NewsData";
import { fetchImages } from "../api/Unsplash";
const News = () => {
  const [results, setresults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [images, setImages] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const pageSize = 30;
  const limitPerUser = 30;
  const words = [
    "agriculture",
    "farming",
    "farmer",
    "farmers",
    "crop",
    "crops",
    "farmland",
    "farmlands",
    "farm",
    "farms",
    "agricultural",
    "agriculture",
    "agriculturalist",
  ];
  const filterData = (parsedData) => {
    let filteredData = parsedData.results.filter((item) => {
      let count = 0;
      let description = item.description;
      if (description === null) {
        return null;
      }
      description = description.toLowerCase();

      for (let j = 0; j < words.length; j++) {
        if (description.includes(words[j]) === true) {
          let re = new RegExp(words[j], "g");
          let matches = description.match(re);
          count += matches.length;
        }
      }
      if (item.language === "hindi" || count >= 1) {
        return item;
      } else {
        return null;
      }
    });
    return filteredData;
  };

  const fetchMoreData = async () => {
    let data = await fetchNews(page);
    let filteredData = filterData(data);
    setresults(results.concat(filteredData));
    setImageIndex(imageIndex + filteredData.length);
    if ((imageIndex + filteredData.length) % pageSize === 0) {
      setSearchPage(searchPage + 1);
    }
    setPage(data.nextPage);
    setTotalResults(totalResults - data.results.length);
  };

  useEffect(() => {
    const updateImages = async () => {
      let results = await fetchImages(searchPage, pageSize, "Breaking News");
      setImages(images.concat(results));
    };
    updateImages();
    // eslint-disable-next-line
  }, [searchPage]);

  useEffect(() => {
    const updateNews = async () => {
      let parsedData = await fetchNews(page);
      let filteredData = filterData(parsedData);
      setresults(filteredData);
      setImageIndex(imageIndex + filteredData.length);
      if ((imageIndex + filteredData.length) % pageSize === 0) {
        setSearchPage(searchPage + 1);
      }
      setPage(parsedData.nextPage);
      setTotalResults(parsedData.totalResults - parsedData.results.length);
    };
    updateNews();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "1.4rem",
        }}
      >
        Headlines
      </h1>
      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreData}
        hasMore={results.length <= limitPerUser ? true : false}
        loader={<Loading />}
        endMessage={
          <p
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginTop: "10px",
            }}
          >
            <b>Yay! You have seen it all!</b>
          </p>
        }
      >
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {results.map((item, index) => {
              if (item.image_url === null && images[index] !== undefined) {
                item.image_url = images[index].urls.small;
              } else if (item.image_url === null && images[index] === null) {
              }
              return (
                <div className="col" key={index}>
                  <NewsItem
                    image_url={item.image_url}
                    title={item.title ? item.title : ""}
                    description={item.description ? item.description : ""}
                    link={item.link}
                    creator={item.creator}
                    source_id={item.source_id}
                    pubDate={item.pubDate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  language: "en,hi",
  keywords: "agriculture OR farming OR farmers",
};
News.propTypes = {
  country: PropTypes.string,
  apikey: PropTypes.string,
};
export default News;
