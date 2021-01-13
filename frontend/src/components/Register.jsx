import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import ModalError from "./ModalError";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "../styles/form.css";
import { connect, useDispatch } from "react-redux";
import { registerUser  } from "../actions/authActions";

const Register = ({ auth }) => {
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
      name:"",
      password: "",
      password2:"",
    },
    validate() {
      const errors = {};
      if (touched.email && !values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (touched.password && !values.password) {
        errors.password = "Required";
      } else if (values.password.length <= 3) {
        errors.password = "Must be more than 3 characters";
      }
      if (touched.password2 && !values.password2) {
        errors.password2 = "Required";
      } else if (values.password2.length <= 3) {
        errors.password2 = "Must be more than 3 characters";
      }
      if (values.password !== values.password2){
        errors.password = "пароли должны совподать";
        errors.password2 = "пароли должны совподать";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(registerUser(values ,history));
    },
  });

  useEffect(() => {
    if(auth && auth.isAuthenticated){
     history.push("/user")
    }
   });

 /* useEffect(() => {
    if (message) {
      const err = (message && message.message) || message.password.message;
      setErrorM(err);
      setShow(true);
    }
  }, [message]);
*/
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

            <Form.Group controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                {...getFieldProps("name")}
                required
                isValid={touched["name"] && !errors["name"]}
                isInvalid={!!errors["name"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["name"]}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
             Please enter Username 
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password Retry</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                {...getFieldProps("password2")}
                placeholder="Password retry"
                isValid={touched["password2"] && !errors["password2"]}
                isInvalid={
                  !!errors["password2"] //|| (message && message["password2"])
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors["password2"]}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br />
          </Form>
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
  const { auth } = state;
  return {
    auth
  };
}
export default connect(mapStateToProps)(Register);
