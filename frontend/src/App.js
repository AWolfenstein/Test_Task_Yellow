  
import React from "react";
import { BrowserRouter as Router, Switch, Route ,Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/SignIn";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
function App() {
 
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/register" >
            <Register  />
          </Route>
          <Route exact path="/login" >
            <SignIn  />
          </Route>
          <Route path="/user" >
            <User />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;