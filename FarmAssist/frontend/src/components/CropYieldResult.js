import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LineGraph from "./LineGraph";
import { SendResult } from "../api/SendResult";
function CropYieldResult(props) {
  const handleClose = () => props.setShow(false);
  const handleSubmit = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    const res = SendResult(name, email, props.body);
    res.then((data) => {
      alert("Result sent to your email");
      handleClose();
    });
  };
  return (
    <>
      <Modal show={props.show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Crop Yield</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            The predicted {props.crop} production is {props.prediction} kg. The
            predicted yield is {(props.prediction / props.area).toFixed(2)} kg
            per acre.
          </p>
          <LineGraph
            data={props.yearData}
            title="Year-wise Yield"
            xlabel="Year"
          />

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
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CropYieldResult;
