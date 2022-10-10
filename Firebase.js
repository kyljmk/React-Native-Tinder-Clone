// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPj209FvCj0g1gmDjFN6JxmjxzDm7ZNMk",
  authDomain: "tinder-clone-74b76.firebaseapp.com",
  projectId: "tinder-clone-74b76",
  storageBucket: "tinder-clone-74b76.appspot.com",
  messagingSenderId: "477243720323",
  appId: "1:477243720323:web:cd45a1be1a6ffd760cd1b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
