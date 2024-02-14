import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UserAlert from "./UserAlert";
import { subscribe } from "../api/Subscribe.js";
function OtpModal({ otp, details, show, setShow }) {
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const handleShow = () => setShow(!show);
  const handleSubmit = () => {
    const votp = document.getElementsByName("otp")[0].value;
    if (otp.toString() === votp.toString()) {
      setValid(true);
      setMessage("OTP verified successfully");
      setVariant("success");
      const data = subscribe(
        details[0].value,
        details[1].value,
        details[2].value
      );
      data.then((res) => {
        if (res.response.status === "200") {
          setValid(true);
          setMessage(res.response.message);
          setVariant("success");
        } else {
          setValid(true);
          setMessage(res.response.message);
          setVariant("danger");
        }
      });
      setTimeout(() => {
        setShow(false);
      }, 1000);
    } else {
      setValid(true);
      setMessage("Invalid OTP! Please try again");
      setVariant("danger");
    }
  };
  const handleReset = () => {};
  return (
    <>
      <Modal
        show={show}
        onHide={handleShow}
        style={{ color: "black" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification</Modal.Title>
        </Modal.Header>
        {valid && <UserAlert message={message} variant={variant} />}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter otp sent to your mobile number</Form.Label>
              <Form.Control
                name="otp"
                type="tel"
                maxLength="4"
                placeholder="Enter OTP"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OtpModal;
