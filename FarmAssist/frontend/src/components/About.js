import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../css/About.css";
import about from "../images/about.jpeg";
import mission from "../images/mission.jpeg";
import c1 from "../images/t1.jpg";
import c2 from "../images/t2.jpg";
import c3 from "../images/t3.jpg";
import Services from "./Services";
import github from "../images/github.gif";
import linkedin from "../images/linkedin.gif";
const About = () => {
  return (
    <div>
      <section className="about-section">
        <Container>
          <Row>
            <Col md={6}>
              <h1>About Us</h1>
              <p>
                Welcome to FarmAssist! We are a team of agricultural
                enthusiasts who are passionate about helping farmers increase
                their crop yield and profitability through the use of
                data-driven approaches. Our crop yield prediction services are
                based on cutting-edge machine learning algorithms that take into
                account a range of factors including weather patterns, soil
                characteristics, crop history, and more. This allows us to
                provide our clients with accurate yield estimates that they can
                rely on when making important decisions about their farm. We are
                proud of the impact that our services have had on the
                agricultural industry, and we are committed to continuing to
                help farmers achieve their goals. Thank you for considering our
                services, and we look forward to working with you to optimize
                your crop yield and profitability.
              </p>
            </Col>
            <Col md={6}>
              <Image
                className="about-image"
                src={about}
                alt="Farm field"
                fluid
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mission-section">
        <Container>
          <Row>
            <Col md={6}>
              <Image
                className="mission-image"
                src={mission}
                alt="Farmer"
                fluid
              />
            </Col>
            <Col md={6}>
              <h2>Our Mission</h2>
              <p>
                At FarmAssist, our mission is to help farmers maximize their crop
                yields and profitability by leveraging the power of data and
                technology. We believe that agriculture can benefit greatly from
                advancements in machine learning, predictive modeling, and
                artificial intelligence. That's why we have developed a suite of
                tools and services that can help farmers make data-driven
                decisions, from crop yield prediction and fertilizer
                recommendation. Our goal is to make these advanced technologies
                accessible and affordable to farmers of all sizes, so they can
                increase their productivity, reduce waste, and improve the
                sustainability of their operations. Our mission is to
                revolutionize the agriculture industry by empowering farmers
                with the information and tools they need to achieve sustainable
                and profitable farming practices. We believe that through our
                platform, we can make a positive impact on the environment and
                improve the livelihoods of farmers around the world.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="team-section">
        <Container>
          <Row>
            <Col>
              <h2>Meet Our Team</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="team-member">
                <Image src={c1} alt="Team member" roundedCircle fluid />
                <h3>Vashisth Zatakia</h3>
                <p>ML Enthusiast </p>
                <a
                  href="https://github.com/vashz151"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={github}
                    alt="github"
                    style={{
                      width: "15%",
                      borderRadius: "0px",
                      height: "15%",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/vashisth-zatakia/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{
                      width: "20%",
                      borderRadius: "0px",
                      height: "20%",
                    }}
                  />
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div className="team-member">
                <Image src={c1} alt="Team member" roundedCircle fluid />
                <h3>Vashisth Zatakia</h3>
                <p>ML Enthusiast </p>
                <a
                  href="https://github.com/vashz151"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={github}
                    alt="github"
                    style={{
                      width: "15%",
                      borderRadius: "0px",
                      height: "15%",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/vashisth-zatakia/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{
                      width: "20%",
                      borderRadius: "0px",
                      height: "20%",
                    }}
                  />
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div className="team-member">
                <Image src={c2} alt="Team member" roundedCircle fluid />
                <h3>Rahul Kapadia</h3>
                <p>Software Developer</p>
                <a
                  href="https://github.com/RahulK142002"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={github}
                    alt="github"
                    style={{
                      width: "15%",
                      borderRadius: "0px",
                      height: "15%",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahul-kapadia-577058220/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{
                      width: "20%",
                      borderRadius: "0px",
                      height: "20%",
                    }}
                  />
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div className="team-member">
                <Image src={c3} alt="Team member" fluid />
                <h3>Mihir Panchal</h3>
                <p>Software Developer</p>
                <a
                  href="https://github.com/sLaYerUnleAsheD"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={github}
                    alt="github"
                    style={{
                      width: "15%",
                      borderRadius: "0px",
                      height: "15%",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/mihir-panchal-24440a209"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{
                      width: "20%",
                      borderRadius: "0px",
                      height: "20%",
                    }}
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section className="services-section">
        <Container>
          <Services />
        </Container>
      </section>
    </div>
  );
};

export default About;
