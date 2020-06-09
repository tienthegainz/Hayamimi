import React, { useState } from "react";
import './App.css';
import Login from './component/Authenticate/Login.js';
import Register from './component/Authenticate/Register.js';
import DummyHome from './component/Home/DummyHome.js';
import FirebaseController from './firebase.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


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
        <Route exact path="/login" render={() => <Login isLoggedIn={isLoggedIn} login={handleLoggedIn} />} />
        <Route exact path="/register" render={() => <Register isLoggedIn={isLoggedIn} />} />
        <Route exact path="/" render={() => <DummyHome isLoggedIn={isLoggedIn} />} />
      </Switch>
    </Router>
  );
}

export default App;
