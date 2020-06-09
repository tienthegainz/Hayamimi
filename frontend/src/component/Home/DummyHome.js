import React, { useState } from "react";
import { withRouter, Redirect } from 'react-router-dom'
import FirebaseController from '../../firebase.js'

function DummyHome(props) {
    var isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
        return <div>Hi {FirebaseController.getCurrentUser().displayName}</div>
    } else {
        props.history.replace('/login')
        return null
    }
};

export default withRouter(DummyHome);