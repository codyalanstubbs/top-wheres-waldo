import React from "react";
import uniqid from "uniqid";
import { doc, setDoc } from "firebase/firestore";
import ConnectToDatabase from "../assets/js/connectToDatabase";

// Connect to database
const db = ConnectToDatabase();

function SubmitScoreSreen(props) {
  // eslint-disable-next-line react/prop-types
  const { finalHour, finalMinute, finalSecond, goToLeaderboard } = props;

  async function handleSubmitScore() {
    // Get the user input for their name
    const userName = document.querySelector("#username").value;

    if (userName !== null && userName !== "" && userName.trim().length) {
      // Generate a unique id for the user
      const userID = uniqid();

      // Add a new user doc with user's data
      await setDoc(doc(db, "users", userID), {
        name: userName,
        hours: finalHour,
        minutes: finalMinute,
        seconds: finalSecond,
      });

      goToLeaderboard();
    }
  }

  return (
    <div className="App">
      <h1 className="instructions glow">You found&apos;em!</h1>
      <h2>
        You finished in {finalHour} hours, {finalMinute} minutes, and{" "}
        {finalSecond} seconds!
      </h2>
      <label htmlFor="username">
        Enter Your Name: <input type="text" name="username" id="username" />
      </label>
      <button className="arcade-btn" type="button" onClick={handleSubmitScore}>
        Submit Score
      </button>
    </div>
  );
}

export default SubmitScoreSreen;
