import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SendResult } from "../api/SendResult";
function ResultModal({ show, setShow, body }) {
  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const res = SendResult(name, email, body);
    res.then((data) => {
      handleClose();
      alert("Result sent to your email");
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ color: "black" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Get the Results on Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResultModal;
