import React, { useState } from "react";
import './App.css';
import Login from './component/Authenticate/Login.js';
import Register from './component/Authenticate/Register.js';
// import DummyHome from './component/Home/DummyHome.js';
import Home from './component/Home/Home.js';
import Profile from './component/Profile/Profile.js';

import FirebaseController from './firebase.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  // control the auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function handleLoggedIn() {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  }

  function handleLoggedOut() {
    if (isLoggedIn) {
      FirebaseController.logout()
      setIsLoggedIn(false);
    }
  }
  FirebaseController.auth.onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
    }
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/user" component={Profile} />
        <Route exact path="/login" render={() => <Login isLoggedIn={isLoggedIn} login={handleLoggedIn} />} />
        <Route exact path="/register" render={() => <Register isLoggedIn={isLoggedIn} />} />
        <Route exact path="/" render={() => <Home isLoggedIn={isLoggedIn} logout={handleLoggedOut} />} />
      </Switch>
    </Router>
  );
}

export default App;
