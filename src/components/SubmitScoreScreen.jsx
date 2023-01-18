import React from "react";
import uniqid from "uniqid";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function SubmitScoreSreen(props) {
  // eslint-disable-next-line react/prop-types
  const { finalHour, finalMinute, finalSecond, goToLeaderBoard } = props;

  async function handleSubmitScore() {
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

    // Generate a unique id for the user
    const userID = uniqid();

    // Get the user input for their name
    const userName = document.querySelector("#username").value;

    // Add a new user doc with user's data
    await setDoc(doc(db, "users", userID), {
      name: userName,
      hours: finalHour,
      minutes: finalMinute,
      seconds: finalSecond,
    });

    goToLeaderBoard();
  }

  return (
    <div className="App">
      <h1 className="instructions">You found&apos;em!</h1>
      <h2>
        You finished in {finalHour} hours, {finalMinute} minutes, and{" "}
        {finalSecond} seconds!
      </h2>
      <label htmlFor="username">
        Enter Your Name: <input type="text" name="username" id="username" />
      </label>
      <button type="button" onClick={handleSubmitScore}>
        Submit Score
      </button>
    </div>
  );
}

export default SubmitScoreSreen;
