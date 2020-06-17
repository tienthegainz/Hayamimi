import app from "firebase/app";
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

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password, nickName, birthday) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.db.collection("followings").doc(this.auth.currentUser.uid).set({
      following: [this.auth.currentUser.uid]
    })
    return this.auth.currentUser.updateProfile({
      displayName: nickName,
      photoUrl:
        "https://i0.wp.com/www.mvhsoracle.com/wp-content/uploads/2018/08/default-avatar.jpg",
    });
  }

  setupProfile(nickName, avatarURL) {
    this.auth.currentUser.updateProfile({
      displayName: nickName,
      photoURL: avatarURL
    }).then(function () {
      console.log("Update Success!");
    }).catch(error => {
      console.log(error);
    })
  }


  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  uploadPost(data) {
    this.db
      .collection("posts")
      .add(data)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      });
  }

  // async uploadImage(image) {
  //   const random_name = (Math.random().toString(36) + '00000000000000000').slice(2, 10) + '.' + (image.name).split(".").slice(-1);
  //   // console.log(random_name)
  //   return this.storage.ref(`images/${random_name}`).put(image.originFileObj), random_name;
  //   // await uploadTask.on('state_changed',
  //   //   (snapshot) => {
  //   //   },
  //   //   (error) => {
  //   //     // error function ....
  //   //     console.log('Error: ', error);
  //   //   },
  //   //   () => {
  //   //     // complete function ....
  //   //     url = this.storage.ref('images').child(random_name).getDownloadURL()
  //   //   });
  //   // return url
  // }
}

export default new FirebaseController();
