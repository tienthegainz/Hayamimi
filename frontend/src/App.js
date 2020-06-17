import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FirebaseController from './firebase.js';
import Login from './component/Authenticate/Login.js';
import Register from './component/Authenticate/Register.js';
import Home from './component/Home/Home.js';
import IndexProfile from './component/Profile'
import './App.css';


const App = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setIsLoggedIn);
    return () => {
      unsubscribe();
    };
  });
  // control the auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  let uids = [];
  let currentUid = null;
  uids = FirebaseController.getAllUid();


  const handleLoggedIn = () => {
    if (!isLoggedIn) setIsLoggedIn(true);
  };

  const handleLoggedOut = () => {
    if (isLoggedIn) {
      FirebaseController.logout();
      setIsLoggedIn(false);
    }
  };

  const onAuthStateChange = (callback) => {
    return FirebaseController.auth.onAuthStateChanged((user) => {
      if (user) {
        callback(true);
        currentUid = user.uid;
        
        // console.log(uid);
      }

      else callback(false);
    });
  };

  function handleCurrentUser(id) {
    if(currentUid === null) setIsLoggedIn(false);
    else if(currentUid === id) setIsCurrentUser(true);
    else setIsCurrentUser(false)
  };



  return (
    
    
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login isLoggedIn={isLoggedIn} login={handleLoggedIn} />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => <Register isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Home isLoggedIn={isLoggedIn} logout={handleLoggedOut} />
          )}
        />
        <Route
          exact
          path="/notifications"
          render={() => (
            <Home isLoggedIn={isLoggedIn} logout={handleLoggedOut} />
          )}
        />
        <Route
          exact
          path="/user/:currentUid"

          render={() => (
            <IndexProfile isLoggedIn={isLoggedIn} logout={handleLoggedOut} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
