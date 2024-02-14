import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InfoGraph from "./InfoGraph";
import LineGraph from "./LineGraph";
function InfoModal({ title, body, info, setInfo, cryield, graph, prediction }) {
  const smallTitle = title.toLowerCase();
  const handleClose = () => setInfo({ [smallTitle]: false });
  return (
    <>
      <Modal
        show={info[smallTitle]}
        onHide={handleClose}
        centered
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {graph && cryield ? (
            <LineGraph
              data={body}
              title={`${title} - wise - Yield`}
              xlabel={title}
            />
          ) : graph ? (
            <>
              <div>
                <p>
                  The first graph shows the best crop probabilities for various
                  &nbsp;
                  {smallTitle}. It helps in identifying the most suitable crop
                  for a given &nbsp;
                  {smallTitle} range.
                </p>
                <p>
                  The second graph shows the predicted crop probabilities for
                  various &nbsp;
                  {smallTitle}. It helps in predicting the most likely crop that
                  can be grown in a given &nbsp;
                  {smallTitle} &nbsp;range.
                </p>
              </div>
              <InfoGraph
                infoData={body}
                xlabel={title}
                title={`Crop Probability vs ${title}`}
                prediction={`${prediction}`}
              />
            </>
          ) : (
            body
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;
