import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeField from "react-simple-timefield";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createRace,updateRace } from "../actions/profileActions";

const ModalCreateRace = ({ show, setShow, userId, dataOld, isEdit }) => {
  const [distance, setDistance] = useState(dataOld.distOld);
  const [date, setDate] = useState(dataOld.dateOld);
  const [time, setTime] = useState(dataOld.timeOld);
  const dispatch = useDispatch();

  useEffect(() => {
    setDistance(() => dataOld.distOld);
    setDate(new Date(moment(dataOld.dateOld).format("YYYY/MM/DD")));
    setTime(dataOld.timeOld);
  }, [show]);

  const handleClose = () => {
    setDistance("");
    setDate(new Date());
    setTime("00 00 00");
    setShow(false);
  };

  const onTimeChange = (time) => {
    setTime(time);
  };

  const createNewRace = () => {
    let raceData = {
      distance: distance,
      raceTime: time,
      raceDate: date,
    };

    isEdit
      ? (raceData.id_data = dataOld.id_data)
      : (raceData.id_user = userId);

    isEdit ? dispatch(updateRace(raceData, userId)) : dispatch(createRace(raceData, userId));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit race" : "Create race"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Distance</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Distance"
            aria-label="Distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text>metrs</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Race Time</InputGroup.Text>
          </InputGroup.Prepend>
          <TimeField
            value={time}
            onChange={(event, value) => onTimeChange(value)}
            input={<FormControl />}
            colon=":"
            showSeconds
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Race Date</InputGroup.Text>
          </InputGroup.Prepend>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={createNewRace}>
          {isEdit ? "Edit" : "Create!"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalCreateRace;
