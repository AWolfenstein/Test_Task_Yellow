import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getProfile,logout } from "../actions/authAction";
const User = ({ user,isLoggedIn }) => {
  const dispatch = useDispatch();
  let history = useHistory()
  useEffect(() => {
    isLoggedIn ? dispatch(getProfile()) : history.push("/login")
  }, [isLoggedIn]);
 const logoutNow =()=>{
    dispatch(logout())  
  
 }
  const body = (
    <Container fluid="md">
      <Row>
        <Col style={{ margin: "20%" }}>
          <Card>
            <Card.Header as="h5">Profile</Card.Header>
            <Card.Body>
              <Card.Title>{user && user.name}</Card.Title>
              <Card.Text>{user && user.email}</Card.Text>
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
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
}
export default connect(mapStateToProps)(User);
