import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Carousel.css";
import img1 from "../images/c5.png";
import img2 from "../images/c6.jpg";
import img3 from "../images/c7.png";
import right from "../images/right.svg";
import left from "../images/left.svg";
import background from "../videos/background.mp4";
function BootstrapCarousel() {
  return (
    <Carousel
      style={{
        width: "100%",
        verticalAlign: "center",
        marginTop: "-5px",
      }}
      indicators={false}
      nextIcon={<img src={right} alt="right" height={"10%"} />}
      prevIcon={<img src={left} alt="left" height={"10%"} />}
    >
      <Carousel.Item interval={2000}>
        <video
          autoPlay
          muted
          loop
          className="d-block w-100 adjust"
          style={{ objectFit: "cover" }}
        >
          <source src={background} />
        </video>
        <Carousel.Caption className="cap">
          <h3>Transforming Agriculture Through Data-Driven Innovations</h3>
          <p>
          Join us on a journey to revolutionize farming by harnessing data, technology, and expertise to empower farmers, 
          increase yields, and ensure food security for all
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100 adjust" src={img1} alt="Second slide" />
        <Carousel.Caption className="cap">
          <h3>A Sustainable Future Starts with Smart Farming</h3>
          <p>
          At FarmAssist, we're redefining farming practices to enhance sustainability, one field at a time. 
          Explore how precision agriculture and technology are shaping a more eco-friendly and prosperous future.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100 adjust" src={img2} alt="Third slide" />
        <Carousel.Caption className="cap">
          <h3>Our Commitment to Rural Prosperity</h3>
          <p>
          We're dedicated to improving the lives of farmers and the communities they support. 
          Discover how our data-driven solutions are boosting agricultural productivity and income, driving positive change
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100 adjust" src={img3} alt="Fourth slide" />
        <Carousel.Caption className="cap">
          <h3>Harvesting Knowledge, Not Just Crops</h3>
          <p>
          FarmAssist isn't just a farming tool; 
          it's a knowledge hub. Learn how we're arming farmers with insights, information, and technology to help them thrive in an ever-changing agricultural landscape
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BootstrapCarousel;
