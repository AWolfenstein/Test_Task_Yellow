import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";

const ModalError = ({ show, setShow, message,setErrorM }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setErrorM("")
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalError;
