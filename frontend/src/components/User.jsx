import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import {
  getData,
  removeRace,
  getRangWeekData,
} from "../actions/profileActions";
import TableRace from "./TableRace";
import ModalCreateRace from "./ModalCreateRace";
import ReportCard from "./ReportCard";
import ModalReportRace from "./ModalReportRace";
import ModalError from "./ModalError";

const User = ({ auth, profile, errorsM }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const { user, isAuthenticated } = auth;
  const { userData, weekData } = profile;

  const [show, setShow] = useState(false);
  const [dataRace, setDataRace] = useState({});
  const [isEditMode, setEditMode] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showReport, setReportShow] = useState(false);

  const [showErr, setShowErr] = useState(false);
  const [errorM, setErrorM] = useState("");
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  });

  useEffect(() => {
    if (user && user.id) {
      dispatch(getData(user.id));
    }
  }, []);

  useEffect(() => {
    if (errorsM.message) {
      const err = errorsM.message;
      setErrorM(err);
      setShow(true);
    }
  });

  const logoutNow = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  const removeDataRace = (id_data) => {
    dispatch(removeRace(id_data, user.id));
  };

  const showCreateRace = () => {
    setDataRace({
      distOld: "",
      timeOld: "00 00 00",
      dateOld: new Date(),
    });
    setEditMode(false);
    setShow(true);
  };
  const timeToSeonds = (time) => {
    let hms = time;
    let a = hms.split(":");
    let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    return seconds;
  };

  const getAvg = () => {
    let result = {};
    if (weekData.data) {
      let sumTimeS = 0;
      let sumSpeeds = 0;
      let sumDistanse = 0;
      for (let i = 0; i < weekData.data.length; i++) {
        if (weekData.data[i]) {
          sumTimeS += timeToSeonds(weekData.data[i].raceTime);
          sumSpeeds +=
            parseInt(weekData.data[i].distance) /
            timeToSeonds(weekData.data[i].raceTime);
          sumDistanse += parseInt(weekData.data[i].distance);
        }
      }

      result = {
        avgSpeed: (sumSpeeds / weekData.data.length).toFixed(2),
        avgTime: (sumTimeS / weekData.data.length / 60).toFixed(2),
        totalDis: sumDistanse,
      };
    } else {
      result = {
        avgSpeed: 0,
        avgTime: 0,
        totalDis: 0,
      };
    }

    return result;
  };

  const getReport = () => {
    const week = {
      startDay: startDate,
      endDay: endDate,
      id_user: user.id,
    };

    dispatch(getRangWeekData(week));
    setReportShow(true);
  };

  const body = (
    <Container fluid="md">
      <Row>
        <Col style={{ margin: "20%" }}>
          <Card>
            <Card.Header as="h5">Profile</Card.Header>
            <Card.Body>
              <Card.Title>{user && user.name}</Card.Title>
              <Button variant="primary" onClick={logoutNow}>
                Logout
              </Button>
            </Card.Body>

            <Button
              style={{ marginTop: "1%", marginBottom: "1%" }}
              variant="success"
              onClick={showCreateRace}>
              Create Race
            </Button>
            <div style={{ height: "200px", overflow: "auto" }}>
              <TableRace
                data={userData.data}
                removeDataRace={removeDataRace}
                setDataRace={setDataRace}
                setEditMode={setEditMode}
                setShow={setShow}
              />
            </div>
            <ReportCard
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              getReport={getReport}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
  return (
    <>
      {body}
      <ModalCreateRace
        show={show}
        setShow={setShow}
        userId={user.id}
        dataOld={dataRace}
        isEdit={isEditMode}
      />
      <ModalReportRace
        showReport={showReport}
        setReportShow={setReportShow}
        getAvg={getAvg}
      />
      <ModalError
        show={showErr}
        setShow={setShowErr}
        message={errorM}
        setErrorM={setErrorM}
      />
    </>
  );
};

function mapStateToProps(state) {
  const { auth, profile, errorsM } = state;
  return {
    auth,
    profile,
    errorsM,
  };
}
export default connect(mapStateToProps)(User);
