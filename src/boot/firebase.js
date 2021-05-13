import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcMKvd0K8_fm_DtldtIO25SxiPBUIbEcY",
  authDomain: "fire-auth-app-982cd.firebaseapp.com",
  databaseURL: "https://fire-auth-app-982cd-default-rtdb.firebaseio.com",
  projectId: "fire-auth-app-982cd",
  storageBucket: "fire-auth-app-982cd.appspot.com",
  messagingSenderId: "255671423613",
  appId: "1:255671423613:web:8e1b192b78d08adbe39714",
  measurementId: "G-Q44Y9HB0FK"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.database()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }