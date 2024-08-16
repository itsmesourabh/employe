// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSswErASd_LGyQsn4ODQJRI2TftbVl62s",
  authDomain: "apps-b1989.firebaseapp.com",
  projectId: "apps-b1989",
  storageBucket: "apps-b1989.appspot.com",
  messagingSenderId: "601828453418",
  appId: "1:601828453418:web:665059479a189f099d2753",
  measurementId: "G-RY54EYL0WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };