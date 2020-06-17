import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import 'firebase/storage';
import 'firebase';

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

  setupProfile(nickName, avatarURL, backgroundURL) {
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

  uploadComment(data){    
    let updatePost = this.db.collection("post").doc(data.post_id);
    updatePost.update({
      comments: app.firestore.FieldValue.arrayUnion(data)
    });
  }
  updateLike(data){
    
  }
}

export default new FirebaseController();
