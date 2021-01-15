import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import ModalError from "./ModalError";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "../styles/form.css";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";

const SignIn = ({ auth, errorsM }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [errorM, setErrorM] = useState("");
  let history = useHistory();

  const {
    values,
    handleSubmit,
    submitCount,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate() {
      const error = {};
      if (touched.email && !values.email) {
        error.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        error.email = "Invalid email address";
      }
      if (touched.password && !values.password) {
        error.password = "Required";
      } else if (values.password.length <= 3) {
        error.password = "Must be more than 3 characters";
      }
      return error;
    },
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      history.push("/user");
    }
  });

  useEffect(() => {
    if (errorsM.message) {
      const err = errorsM.message 
      setErrorM(err);
      setShow(true);
    }
  } );

  const toRegister = () => {
    history.push("/register");
  };

  const body = (
    <Container fluid="md">
      <Row>
        <Col className="colForm">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                {...getFieldProps("email")}
                required
                isValid={touched["email"] && !errors["email"]}
                isInvalid={!!errors["email"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["email"]}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                {...getFieldProps("password")}
                placeholder="Password"
                isValid={touched["password"] && !errors["password"]}
                isInvalid={
                  !!errors["password"] //|| (message && message["password"])
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors["password"]}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>

            <br />
          </Form>
          <Row>
            <Col>
              <br />
              <div>Dont have account? </div>
              <Button variant="primary" onClick={toRegister}>
                Register
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {body}
      <ModalError
        show={show}
        setShow={setShow}
        message={errorM}
        setErrorM={setErrorM}
      />
    </>
  );
};

function mapStateToProps(state) {
  const { auth ,errorsM} = state;
  return {
    auth,
    errorsM
  };
}
export default connect(mapStateToProps)(SignIn);
