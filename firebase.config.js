// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-g3taizaxE3ivdI7m_lo9eTTiJIzEBNU",
  authDomain: "blog-using-next-js.firebaseapp.com",
  projectId: "blog-using-next-js",
  storageBucket: "blog-using-next-js.appspot.com",
  messagingSenderId: "307795531900",
  appId: "1:307795531900:web:dbbea81248050c6f57d1f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
