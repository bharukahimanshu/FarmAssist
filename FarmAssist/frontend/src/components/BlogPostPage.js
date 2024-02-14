import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/BlogPostPage.css";
import authorImage from "../images/author.png";
import Sidebar from "./Sidebar";
import { fetchBlogs } from "../api/BlogsApi";
import DOMPurify from "dompurify";

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [BlogContent, setBlogContent] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      await fetchBlogs().then((res) => {
        setPost(res.response.result.find((posts) => posts["link"] === id));
        return res.response.result;
      });
    };
    setBlogContent(fetchAPI());
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="post">
            <img
              src={post["image_1"]}
              alt={post["title"]}
              className="post-image"
            />
            <h2 className="post-title">{post["title"]}</h2>
            <div className="post-meta">
              <div className="post-meta-item post-author">
                <img src={authorImage} alt="Author" />
                {post.author}
              </div>
              <div className="post-meta-item post-date">
                <i className="far fa-calendar-alt"></i>
                <span className="post-date-text">{post.date}</span>
              </div>
              <div className="post-meta-item post-read-time">
                <i className="far fa-clock"></i>
                <span className="post-read-time-text">
                  {post["read_time"]} read
                </span>
              </div>
            </div>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post["content"]),
              }}
            ></div>
          </div>
        </div>
        <div className="col-md-4">
          <Sidebar BlogContent={BlogContent} />
          <div>
            <img
              src={post["image_2"]}
              alt={post["title"]}
              className="post-image-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostPage;
