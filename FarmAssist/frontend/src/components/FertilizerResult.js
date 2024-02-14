import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SendResult } from "../api/SendResult";
function FertilizerResult({ prediction, show, setShow, body }) {
  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    const res = SendResult(name, email, body);
    res.then((data) => {
      alert("Result sent to your email");
      handleClose();
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>The suitable fertilizer is {prediction.data}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {prediction.desc1}</p>
          <p> {prediction.desc2}</p>
          <p> {prediction.desc3}</p>
          <p>{prediction.desc4}</p>

          <div>
            <p>
              <b>Get the Results on Email</b>
            </p>
            <label>Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              autoFocus
              placeholder="Enter Name"
              value={localStorage.getItem("name")}
              onChange={(e) => localStorage.setItem("name", e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={localStorage.getItem("email")}
              placeholder="Enter Email"
              onChange={(e) => localStorage.setItem("email", e.target.value)}
              required
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FertilizerResult;
