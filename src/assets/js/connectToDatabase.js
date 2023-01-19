import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function ConnectToDatabase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "top-where-s-waldo.firebaseapp.com",
    projectId: "top-where-s-waldo",
    storageBucket: "top-where-s-waldo.appspot.com",
    messagingSenderId: "20898117017",
    appId: "1:20898117017:web:925946e13a2dea6d350f08",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return db;
}
