// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseApp = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STRORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

// export const auth = firebaseApp.auth();

// const db = firebaseApp.firestore();
// export default db;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyLMUGXJ-cpDKALBmxNbFvVGX97BcW0M4",
  authDomain: "ivy-lee.firebaseapp.com",
  databaseURL: "https://ivy-lee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ivy-lee",
  storageBucket: "ivy-lee.appspot.com",
  messagingSenderId: "565450224925",
  appId: "1:565450224925:web:d9d781868b5936f89f5df4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, app, auth };
