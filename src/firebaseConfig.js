// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb6jQWvXv1R6HNHrGtFKQpr_1HMXwqoxU",
  authDomain: "linksphere-14365.firebaseapp.com",
  projectId: "linksphere-14365",
  storageBucket: "linksphere-14365.firebasestorage.app",
  messagingSenderId: "354824921058",
  appId: "1:354824921058:web:33e1bef1c93200c8eaa3bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { auth, app, firestore, storage} 