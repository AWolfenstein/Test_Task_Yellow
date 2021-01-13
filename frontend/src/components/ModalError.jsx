import React from "react";
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/authAction";
import { useDispatch } from "react-redux";

const ModalError = ({ show, setShow, message,setErrorM }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setErrorM("")
    dispatch(clearMessage());
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
