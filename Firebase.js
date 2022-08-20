// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVt_xZaQfY8ZYtFvf9qV7u3U8q9xi9rWY",
  authDomain: "dystopian-be98a.firebaseapp.com",
  projectId: "dystopian-be98a",
  storageBucket: "dystopian-be98a.appspot.com",
  messagingSenderId: "285401881962",
  appId: "1:285401881962:web:0245493cb2d1a8976b9913"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default app;
export { db, auth };