import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = require('./firebase_config.json')


class FirebaseController {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(email, password, nickName, birthday) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: nickName
            // birthday: birthday
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUser() {
        return this.auth.currentUser
    }

    uploadPost(data) {
        this.db
            .collection("posts")
            .add(data)
            .then((ref) => {
                console.log("Added document witd ID: ", ref.id);
            });
    }


}


export default new FirebaseController()