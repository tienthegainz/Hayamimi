import firebase from 'firebase'

const config = require('../firebase_config.json')

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const database = firebase.database();
