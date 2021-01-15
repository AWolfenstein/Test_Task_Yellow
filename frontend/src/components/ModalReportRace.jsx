import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const ModalReportRace = ({ showReport, setReportShow, getAvg }) => {
  const handleClose = () => {
    setReportShow(false);
  };
  const result = getAvg();
  return (
    <Modal show={showReport} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report Week AVG</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            AV.Speed: {isNaN(result.avgSpeed) ? 0 : result.avgSpeed} m/s
          </ListGroup.Item>
          <ListGroup.Item>
            AV.Time: {isNaN(result.avgTime) ? 0 : result.avgTime} minuts
          </ListGroup.Item>
          <ListGroup.Item>Total Distance: {result.totalDis} m</ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalReportRace;
