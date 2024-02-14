import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CropMoreInfo(props) {
  const [show, setShow] = useState(true);
  const crop = props.crop;
  const handleClose = () => {
    props.setMoreInfo(false);
    setShow(false);
  };
  const data = require("./data.json");
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>{crop} Growing Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{data[crop]["Description"]}</p>
          <h2>Season</h2>
          <ul>
            <li>
              <strong>Sowing:</strong> {data[crop]["Season"]["Sowing"]}
            </li>
            <li>
              <strong>Harvesting:</strong> {data[crop]["Season"]["Harvesting"]}
            </li>
          </ul>
          <h2>Ideal Conditions</h2>
          <ul>
            <li>
              <strong>Soil Type:</strong>{" "}
              {data[crop]["Ideal Conditions"]["Soil Type"]}
            </li>
            <li>
              <strong>Climate:</strong>{" "}
              {data[crop]["Ideal Conditions"]["Climate"]}
            </li>
            <li>
              <strong>Temperature:</strong>
              {data[crop]["Ideal Conditions"]["Temperature"]}
            </li>
            <li>
              <strong>Rainfall:</strong>{" "}
              {data[crop]["Ideal Conditions"]["Rainfall"]}
            </li>
          </ul>
          <h2>Nutrient Requirements</h2>
          <ul>
            <li>
              <strong>Nitrogen:</strong>{" "}
              {data[crop]["Nutrient Requirements"]["Nitrogen"]}
            </li>
            <li>
              <strong>Phosphorus:</strong>{" "}
              {data[crop]["Nutrient Requirements"]["Phosphorus"]}
            </li>
            <li>
              <strong>Potassium:</strong>{" "}
              {data[crop]["Nutrient Requirements"]["Potassium"]}
            </li>
          </ul>
          <h2>Helpful Tips</h2>
          <p> {data[crop]["Helpful Tips"]}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CropMoreInfo;
