import React from "react";
import loading from "../images/loading.svg";

const Loading = () => {
  return (
    <div className="text-center">
      <img
        src={loading}
        alt="loading"
        style={{ width: "100px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default Loading;
