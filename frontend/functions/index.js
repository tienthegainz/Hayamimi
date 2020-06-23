const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
var admin = require('firebase-admin');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hayamimi-68a01.firebaseio.com"
});

exports.deleteUser = functions.firestore
    .document('users/{userID}')
    .onDelete((snap, context) => {
        // console.log("Delete User ", userID);
        const uid = snap.data().uid;
        admin.auth().deleteUser(uid).then(() => {
            return;
        }).catch((error) => {
            console.log('Error deleting user:', error);
        });
    });
