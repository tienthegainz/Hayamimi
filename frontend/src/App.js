import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FirebaseController from './firebase.js';
import Login from './component/Authenticate/Login.js';
import Register from './component/Authenticate/Register.js';
import Home from './component/Home/Home.js';
import IndexProfile from './component/Profile';
import './App.css';


const App = () => {

  return (


    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => <Register />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Home />
          )}
        />
        <Route
          exact
          path="/user/:uid"

          render={() => (
            <Home />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
