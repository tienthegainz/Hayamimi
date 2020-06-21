import app, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import 'firebase/storage';

const config = require("./firebase_config.json");

class FirebaseController {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async login(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        localStorage.setItem('isLoggedIn', true);
        // This will return one result
        const userDoc = await this.db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        localStorage.setItem('uid', userData.uid);
        localStorage.setItem('displayName', userData.displayName);
        localStorage.setItem('avatar', userData.avatarURL);
        localStorage.setItem('background', userData.backgroundURL);
        localStorage.setItem('following', userData.following);
      }
    });
  }

  async logout() {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', false);
    await this.auth.signOut();
  }

  async register(email, password, nickName) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.db.collection("users").doc(this.auth.currentUser.uid).set({
      following: [this.auth.currentUser.uid],
      avatarURL: "https://i0.wp.com/www.mvhsoracle.com/wp-content/uploads/2018/08/default-avatar.jpg",
      backgroundURL: "https://giaysg.com/wp-content/uploads/2017/06/grey-background.png",
      displayName: nickName,
      uid: this.auth.currentUser.uid,
    })
    return this.auth.currentUser.updateProfile({
      displayName: nickName
    });
  }

  setupProfile(nickName, avatarURL) {
    this.auth.currentUser.updateProfile({
      displayName: nickName,
      photoURL: avatarURL
    }).then(function () {
      console.log("Update Auth Success!");
    }).catch(error => {
      console.log(error);
    })
  }

  setupProfileDB(nickName, avatarURL, backgroundURL) {
    this.db.collection("users").doc(this.auth.currentUser.uid).update({
      displayName: nickName,
      avatarURL: avatarURL,
      backgroundURL: backgroundURL
    }).then(() => {
      console.log("Update database success");
    }).catch(error => {
      console.log(error);
    })
  }

  getAllUid() { //Get uid by followings uid
    const users = [];
    const uidRef = this.db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        users.push(doc.id);
      });
    });

    return users;
  }

  getUserByUid(uid) {
    this.db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.id === uid) return doc.data(uid);
      });
    });
  }

  getAllUserData() {
    let users = [];
    this.db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        users.push(doc.data());
      });
    });
    console.log(users);
    return users;


  }


  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  handleChangeName(newName) {
    this.db.collection("users").doc(this.auth.currentUser.uid).update({
      displayName: newName
    })
  }



  handleFollowing(otherID) {
    this.db.collection("users").doc(this.auth.currentUser.uid)
      .update({
        following: firestore.FieldValue.arrayUnion(otherID)
      })
      .then(() => {
        console.log("Followed!");
      });
  }

  handleUnFollow(otherID) {
    this.db.collection("users").doc(this.auth.currentUser.uid)
      .update({
        following: firestore.FieldValue.arrayRemove(otherID)
      })
      .then(() => {
        console.log("unFollowed!");
      });
  }

  uploadPost(data) {
    this.db
      .collection("posts")
      .add(data)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      });
  }

  async uploadImage(image) {
    let url = null;
    const random_name = (Math.random().toString(36) + '00000000000000000').slice(2, 10) + '.' + (image.name).split(".").slice(-1);
    // console.log(random_name)
    const uploadTask = this.storage.ref(`images/${random_name}`).put(image.originFileObj);
    await uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
        // error function ....
        console.log('Error: ', error);
      },
      () => {
        // complete function ....
        url = this.storage.ref('images').child(random_name).getDownloadURL()
      });
    return url;
  }

  uploadComment(data) {
    this.db
      .collection("comments")
      .add(data)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      });
    let updatePost = this.db.collection("post").doc(data.post_id);
    updatePost.update({
      comments: app.firestore.FieldValue.arrayUnion(data)
    });
  }
}


export default new FirebaseController();
