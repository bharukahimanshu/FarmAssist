import React from "react";
const NewsItem = (props) => {
  const format = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  let { title, link, description, image_url, source_id, creator, pubDate } =
    props;
  const image =
    "https://images.hindustantimes.com/img/2022/09/17/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1663372914274_1663372914274.jpeg";
  return (
    <div
      className="card h-100 text-bg-secondary mb-3"
      style={{ backgroundColor: "black" }}
      onClick={() => {
        window.open(link, "_blank");
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
          fontSize: "1.3rem",
          textEmphasis: "bold",
        }}
      >
        <span className="badge rounded-pill bg-info text-white">
          {source_id}
        </span>
      </div>
      <img
        style={{
          height: "30vh",
          width: "100%",
          objectFit: "cover",
          border: "1px solid white",
        }}
        src={image_url ? image_url : image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = image;
        }}
        className="card-img-top"
        alt="breaking news"
      />
      <div
        className="card-body d-flex flex-column"
        style={{ backgroundColor: "white", border: "1px solid white" }}
      >
        <h5 className="card-title text-black">{title}</h5>
        <p
          className="card-text text-truncate text-black"
          style={{ overflow: "hidden" }}
        >
          {description}
        </p>
        <a
          rel="noreferrer"
          href={link}
          target={"_blank"}
          className="btn btn-secondary active btn-lg  mt-auto"
          style={{ borderRadius: "0.4rem" }}
        >
          Read More
        </a>
      </div>
      <div className="card-footer">
        <small className="text-light">
          By {!creator ? "Anonymous" : creator} on{" "}
          {new Date(pubDate).toLocaleString("en-IN", format)} IST
        </small>
      </div>
    </div>
  );
};
export default NewsItem;
