import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/BlogCard.css";
import { fetchBlogs } from "../api/BlogsApi";
function BlogCard() {
  const [BlogContent, setBlogContent] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setBlogContent(
        await fetchBlogs().then((res) => {
          return res.response.result;
        })
      );
    };
    fetchAPI();
  }, [setBlogContent]);
  return (
    <div className="blog-post-list" style={{ color: "black" }}>
      <Row className="g-4">
        {BlogContent.map((post, index) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            key={index}
            className="blog-post-container"
          >
            <Card className="h-100 blog-post">
              <Card.Img
                variant="top"
                className="blog-post-image"
                src={post["image_1"]}
                alt={post["title"]}
              />
              <Card.Body>
                <Card.Title className="blog-post-title">
                  {post["title"]}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted blog-post-meta">
                  By {post["author"]} on {post["date"]}
                </Card.Subtitle>
                <Card.Text className="blog-post-description">
                  {post["description"]}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="info"
                  className="blog-post-btn"
                  style={{ width: "99%" }}
                >
                  <Link
                    to={`/blogs/${post["link"]}`}
                    className="blog-post-link"
                  >
                    Read More
                  </Link>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BlogCard;
