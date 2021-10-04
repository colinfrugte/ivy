// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
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
const db = getFirestore();
const auth = getAuth();
connectFirestoreEmulator(db, "localhost", 8080);
export { db, auth, app };
