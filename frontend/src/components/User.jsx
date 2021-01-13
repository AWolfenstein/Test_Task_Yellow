import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { logoutUser  } from "../actions/authActions";

const User = ({ auth }) => {
  const { user,isAuthenticated } = auth;
  const dispatch = useDispatch();
  let history = useHistory()
  useEffect(() => {
    if( !isAuthenticated) {history.push("/login")}
  }, );
 const logoutNow =()=>{
    dispatch(logoutUser())  
    history.push("/login")
 }
  const body = (
    <Container fluid="md">
      <Row>
        <Col style={{ margin: "20%" }}>
          <Card>
            <Card.Header as="h5">Profile</Card.Header>
            <Card.Body>
              <Card.Title>{user && user.name}</Card.Title>
              <Button variant="primary" onClick={logoutNow}>Logout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  return body;
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}
export default connect(mapStateToProps)(User);
