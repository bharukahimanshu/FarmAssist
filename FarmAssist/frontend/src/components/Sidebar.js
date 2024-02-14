import React, { useEffect, useState } from "react";
import "../css/BlogPostPage.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchBlogs } from "../api/BlogsApi";
const Sidebar = () => {
  const { id } = useParams();
  const [BlogContent, setBlogContent] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      await fetchBlogs().then((res) => {
        setBlogContent(res.response.result);
      });
    };
    fetchAPI();
  }, []);
  return (
    <div className="sidebar">
      <h3>Recent Posts</h3>
      <ul>
        {BlogContent.filter((post) => post["link"] !== id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6)
          .map((post) => (
            <Link
              to={`/blogs/${post["link"]}`}
              key={post["link"]}
              className="recent-post"
            >
              <img src={post["image_1"]} alt="Recent Post" />
              <div>
                <p className="recent-post-title">{post["title"]}</p>
                <p className="recent-post-date">{post["date"]}</p>
              </div>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
