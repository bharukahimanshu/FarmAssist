import React from "react";
import { BsGithub } from "react-icons/bs";
import { sendMessage } from "../api/Twillio.js";
import { check_subscribe } from "../api/CheckSubscribe.js";
import OtpModal from "./OtpModal.js";
function Footer() {
  const [otp, setOtp] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [details, setDetails] = React.useState();
  const sendOtp = (e) => {
    e.preventDefault();
    const data = check_subscribe(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value
    );
    data.then((res) => {
      if (res.response.status === "200") {
        const data = sendMessage(e.target[1].value);
        data.then((res) => {
          setOtp(res.response.otp);
          setShow(true);
          setDetails(e.target);
        });
      } else {
        alert(res.response.message);
        setShow(false);
      }
    });
  };

  return (
    <div className="container" style={{ width: "80%", position: "relative" }}>
      {show && (
        <OtpModal otp={otp} details={details} show={show} setShow={setShow} />
      )}
      <footer className="py-5">
        <div className="row-md-4 mb-3 d-flex flex-column flex-sm-row justify-content-start">
          <div className="col-md-2 mb-3 flex-column flex-sm-row">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-light">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/about" className="nav-link p-0 text-light">
                  About
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/news" className="nav-link p-0 text-light">
                  News
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/blogs" className="nav-link p-0 text-light">
                  Blogs
                </a>
              </li>

              <li className="nav-item mb-2">
                <a href="/crop-recommend" className="nav-link p-0 text-light">
                  Crop Recommendation
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/crop-yield" className="nav-link p-0 text-light">
                  Crop Yield Prediction
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/fertilizer-recommend"
                  className="nav-link p-0 text-light"
                >
                  Fertilizer Recommendation
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="col-md-2 offset-md-2 mb-3 d-flex">
            <a
              href="https://github.com/vashz151/Quick-crop"
              rel="noopener noreferrer"
              target={"_blank"}
              style={{ color: "white", textDecoration: "none" }}
            >
              Quick Crop is a free, open source project. It is licensed under
              the DJSCE license. The source code is available on GitHub.
              <BsGithub size={20} style={{ marginLeft: "10px" }} />
            </a>
          </div> */}

          <div
            className="col-md-4 offset-md-3 mb-3 d-flex"
            style={{
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <form onSubmit={sendOtp}>
              <h5>Subscribe to our Newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2  ">
                <label htmlFor="name" className="visually-hidden">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  required
                />
                <label htmlFor="mobile" className="visually-hidden">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>
              <div style={{ paddingTop: "15px" }}>
                <label htmlFor="email" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Email address"
                  required
                />
              </div>

              <button
                className="btn btn-secondary btn-lg btn-block"
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: "#565e64",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr
          style={{
            backgroundColor: "white",
            height: "3px",
            width: "50%",
            marginLeft: "24%",
          }}
        />
        <h6 style={{ textAlign: "center" }}>
          &copy; 2023 FarmAssist, Inc. <br />
          All rights reserved.
        </h6>
      </footer>
    </div>
  );
}

export default Footer;
