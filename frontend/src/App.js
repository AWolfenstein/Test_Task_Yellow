import React ,{ useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { useDispatch } from "react-redux";

import SignIn from "./components/SignIn";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import "./App.css";



function App() {
  const dispatch = useDispatch();

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {

    dispatch(logoutUser());
    window.location.href = "./login";
  }
}
  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Switch>
          <Route exact path="/user">
            <User />
          </Route >
        </Switch>
        <Route component={NotFound} />
      </Router>
    </div>
  );
}

export default App;
