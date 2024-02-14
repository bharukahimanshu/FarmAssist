import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import s1 from "../images/s1.jpg";
import s2 from "../images/s2.jpg";
import s3 from "../images/s3.jpg";
function Services() {
  const cards = {
    card1: {
      title: "Crop Recommendation",
      src: s1,
      alt: "crop-recommend",
      text: "Our crop recommendation system uses advanced algorithms and machine learning techniques to analyze soil, weather, and crop data to recommend the best fertilizers and crop varieties for your farm.",
      url: "/crop-recommend",
    },
    card2: {
      title: "Crop Yield Prediction",
      src: s2,
      alt: "crop-yield-prediction",
      text: "Our platform uses advanced algorithms and machine learning to provide accurate predictions of crop yield based on a range of factors, including weather, soil conditions, and crop type.",
      url: "/crop-yield",
    },
    card3: {
      title: "Fertilizer Recommendation",
      src: s3,
      alt: "fertilizer-recommend",
      text: "Our personalized fertilizer recommendations uses advanced algorithms are based on the specific needs of each crop, taking into account factors such as soil nutrient levels, crop type, and weather conditions.",
      url: "/fertilizer-recommend",
    },
  };
  const navigate = useNavigate();
  return (
    <div style={{ width: "99%" }}>
      <h2
        style={{
          textAlign: "inherit",
          fontSize: "40px",
          margin: "20px", 
          fontWeight: "700",
        }}
      >
        Our Services
      </h2>
      <Row xs={1} md={3} className="g-2" style={{ color: "black" }}>
        {Object.values(cards).map((card, idx) => (
          <Col key={idx}>
            <Card
              style={{ margin: "25px" }}
              bg="light"
              onClick={() => navigate(card.url)}
            >
              <Card.Img
                variant="top"
                src={card.src}
                alt={card.alt}
                style={{ height: "250px" }}
              />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  {card.title}
                </Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Services;
