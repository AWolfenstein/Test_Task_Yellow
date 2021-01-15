import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getData, removeRace } from "../actions/profileActions";
import TableRace from "./TableRace";
import ModalCreateRace from "./ModalCreateRace";

const User = ({ auth, profile }) => {
  const { user, isAuthenticated } = auth;
  const { userData } = profile;
  const [show, setShow] = useState(false);
  const [dataRace, setDataRace] = useState({});

  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

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
  const logoutNow = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  const removeDataRace = (id_data) => {
    dispatch(removeRace(id_data, user.id));
  };

  const showCreateRace=( )=>{
    setDataRace({
      distOld: "",
      timeOld: "00 00 00",
      dateOld: new Date(),
    })
    setEditMode(false)
    setShow(true)
  }
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
            <TableRace
              data={userData.data}
              removeDataRace={removeDataRace}
              setDataRace={setDataRace}
              setEditMode={setEditMode}
              setShow={setShow}
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
    </>
  );
};

function mapStateToProps(state) {
  const { auth, profile } = state;
  return {
    auth,
    profile,
  };
}
export default connect(mapStateToProps)(User);
