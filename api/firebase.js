import * as firebase from 'firebase';

class Firebase {

    // Initialize Firebase
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyB990EntPKvyZEU8HI68_60qqJF_ePYUn8",
            authDomain: "gymapp-2c33b.firebaseapp.com",
            databaseURL: "https://gymapp-2c33b.firebaseio.com",
            projectId: "gymapp-2c33b",
            storageBucket: "gymapp-2c33b.appspot.com",
            messagingSenderId: "824121205141"
        })
    }
}

module.exports = Firebase;