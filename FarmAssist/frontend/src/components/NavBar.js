import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../images/logo.jpg";
import "../css/navbar.css";
import translate from "../images/translate.gif";

function NavBar() {
  // eslint-disable-next-line
  const [duplicate, setDuplicate] = useState(0);
  const navigatw = useNavigate();
  const googleTranslateElementInit = () => {
    setDuplicate((duplicate) => {
      if (duplicate === 0) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,hi,gu,ta,te,ml,kn,pa,or,bn,as,ur,mr",
          },
          "google_translate_element"
        );
      }
      return duplicate + 1;
    });
  };
  React.useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    // eslint-disable-next-line
  }, []);
  const langaugeselector = () => {
    setExpanded(!expanded);
    var x = document.getElementById("google_translate_element");
    var y = x.getElementsByTagName("select")[0];
    var z = y.getElementsByTagName("option");
    for (var i = 0; i < z.length; i++) {
      if (z[i].innerHTML === "Hindi") {
        z[i].innerHTML = "हिंदी";
      }
      if (z[i].innerHTML === "Select Language") {
        z[i].innerHTML = "English";
      }
      if (z[i].innerHTML === "Telugu") {
        z[i].innerHTML = "తెలుగు";
      }
      if (z[i].innerHTML === "Tamil") {
        z[i].innerHTML = "தமிழ்";
      }
      if (z[i].innerHTML === "Kannada") {
        z[i].innerHTML = "ಕನ್ನಡ";
      }
      if (z[i].innerHTML === "Marathi") {
        z[i].innerHTML = "मराठी";
      }
      if (z[i].innerHTML === "Punjabi") {
        z[i].innerHTML = "ਪੰਜਾਬੀ";
      }
      if (z[i].innerHTML === "Odia (Oriya)") {
        z[i].innerHTML = "ଓଡ଼ିଆ";
      }
      if (z[i].innerHTML === "Bengali") {
        z[i].innerHTML = "বাংলা";
      }
      if (z[i].innerHTML === "Assamese") {
        z[i].innerHTML = "অসমীয়া";
      }
      if (z[i].innerHTML === "Urdu") {
        z[i].innerHTML = "اردو";
      }
      if (z[i].innerHTML === "Gujarati") {
        z[i].innerHTML = "ગુજરાતી";
      }
      if (z[i].innerHTML === "Malayalam") {
        z[i].innerHTML = "മലയാളം";
      }
    }
  };
  const [expanded, setExpanded] = useState(false);
  return (
    <div id="navdiv">
      <Navbar
        bg="dark"
        variant="dark"
        fixed="top"
        expand="md"
        expanded={expanded}
        ml="auto"
      >
        <Container fluid>
          <img
            id="logo"
            src={logo}
            alt="logo"
            onClick={() => {
              navigatw("/");
              setExpanded(false);
            }}
          />
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => setExpanded(expanded ? false : true)}
            onBlur={() => setExpanded(false)}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-3 my-lg-0" navbarScroll>
              <Nav.Link
                as={Link}
                to="/"
                bsPrefix="nav-link active"
                onClick={() => setExpanded(false)}
                onBlur={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                bsPrefix="nav-link active"
                onClick={() => setExpanded(false)}
                onBlur={() => setExpanded(false)}
              >
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/blogs"
                bsPrefix="nav-link active"
                onClick={() => setExpanded(false)}
                onBlur={() => setExpanded(false)}
              >
                Blogs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/news"
                bsPrefix="nav-link active"
                onClick={() => setExpanded(false)}
                onBlur={() => setExpanded(false)}
              >
                News
              </Nav.Link>
            </Nav>
            <div className="flex-container1">
              <div
                id="google_translate_element"
                className="flex-items1"
                onClick={langaugeselector}
                onBlur={() => setExpanded(false)}
              ></div>
              <img
                src={translate}
                alt="translate"
                id="translate"
                className="flex-items1"
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
