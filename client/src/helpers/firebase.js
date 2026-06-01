import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "yt-mern-blog-amryluxe.firebaseapp.com",
  projectId: "yt-mern-blog-amryluxe",
  storageBucket: "yt-mern-blog-amryluxe.firebasestorage.app",
  messagingSenderId: "979156643971",
  appId: "1:979156643971:web:ddef04126a70e13c876bb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }