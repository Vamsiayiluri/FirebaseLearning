import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyA9SuuR54iI9cGUJwrkf9iclIkN6ZR2Ykg",
  authDomain: "vuefire2-cc79f.firebaseapp.com",
  databaseURL: "https://vuefire2-cc79f-default-rtdb.firebaseio.com",
  projectId: "vuefire2-cc79f",
  storageBucket: "vuefire2-cc79f.appspot.com",
  messagingSenderId: "421623353489",
  appId: "1:421623353489:web:15ed19436b593c877aef30"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export default db;
