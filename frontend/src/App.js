import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import myProfile from "./profile/myProfile";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/myProfile" component={myProfile} />
      </Switch>
    </Router>
  );
}

export default App;
