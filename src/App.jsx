import React, { useCallback, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import uniqid from "uniqid";
import { initializeApp } from "firebase/app";
import {
  query,
  orderBy,
  getFirestore,
  doc,
  setDoc,
  collection,
  limit,
  getDocs,
} from "firebase/firestore";
import Character from "./components/Character";
import Timer from "./components/Timer";
import Scene from "./components/Scene";
import "./App.css";
import Waldo from "./assets/images/waldo_400x400.png";
import Wilma from "./assets/images/wilma_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  const [startScreen, setStartScreen] = useState(true);
  const [endScreen, setEndScreen] = useState(false);
  const [leaderboardDisplay, setLeaderboardDisplay] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const [charactersFound, setCharactersFound] = useState([
    { name: "waldo", found: false, src: Waldo },
    { name: "wilma", found: false, src: Wilma },
    { name: "wizard", found: false, src: Wizard },
  ]);

  // Set states for the timer
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  // Set states for completion time for end screen
  const [finalSecond, setFinalSecond] = useState(null);
  const [finalMinute, setFinalMinute] = useState(null);
  const [finalHour, setFinalHour] = useState(null);

  const changeCharacterFound = useCallback(
    (characterName) => {
      const newCharactersFound = [...charactersFound];
      const character = newCharactersFound.find((char) => {
        return char.name === characterName;
      });
      character.found = true;

      const characterStillNotFound = newCharactersFound.some((char) => {
        return char.found === false;
      });

      if (!characterStillNotFound) {
        setFinalHour(hours);
        setFinalMinute(minutes);
        setFinalSecond(seconds);
        setEndScreen(true);
      }

      setCharactersFound(newCharactersFound);
    },
    [setCharactersFound, setEndScreen, hours, minutes, seconds]
  );

  // Calculate and set times - to be used in handleStartClick
  const getTime = (startTime) => {
    const time = Date.now() - startTime;

    let newHours = (Math.floor(time / (1000 * 60 * 60)) % 24).toString();
    let newMinutes = Math.floor((time / 1000 / 60) % 60).toString();
    let newSeconds = Math.floor((time / 1000) % 60).toString();

    if (newHours.length === 1) newHours = `0${newHours}`;
    if (newMinutes.length === 1) newMinutes = `0${newMinutes}`;
    if (newSeconds.length === 1) newSeconds = `0${newSeconds}`;

    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  };

  // Once user clicks start button, then...
  function handleStartClick() {
    // ...change startScreen state to display Scene
    setStartScreen(false);

    // Set the startTime for timer
    const startTime = Date.now();

    // Set interval for incrementing the timer
    const interval = setInterval(() => getTime(startTime), 1000);
    return () => clearInterval(interval);
  }

  // Handle submit score click
  async function handleSubmitScore() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "top-wheres-waldo-b4094.firebaseapp.com",
      projectId: "top-wheres-waldo-b4094",
      storageBucket: "top-wheres-waldo-b4094.appspot.com",
      messagingSenderId: "811092831655",
      appId: "1:811092831655:web:be49ee2a65374322fcda82",
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
      hours,
      minutes,
      seconds,
    });
    // Transition from submit data screen to leaderboard scene
    setEndScreen(false);
    setLeaderboardDisplay(true);
  }

  function retrieveLeaderboard() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "top-wheres-waldo-b4094.firebaseapp.com",
      projectId: "top-wheres-waldo-b4094",
      storageBucket: "top-wheres-waldo-b4094.appspot.com",
      messagingSenderId: "811092831655",
      appId: "1:811092831655:web:be49ee2a65374322fcda82",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const usersRef = collection(db, "users");

    // Build query for getting top 20 fastest players
    const q = query(
      usersRef,
      orderBy("hours", "desc"),
      orderBy("minutes", "desc"),
      orderBy("seconds", "desc"),
      limit(20)
    );

    // Build a leaderboard data array for setting to the state
    const boardData = (async () => {
      const querySnapshot = await getDocs(q);
      const data = [];
      let rank = 1;
      querySnapshot.forEach((u) => {
        const user = u.data();
        data.push({ rank, user });
        rank += 1;
      });
      return data;
    })();

    // Once the data is retrieved, then set leadboardData state
    boardData.then((data) => setLeaderboardData(data));
  }

  if (startScreen) {
    return (
      <div className="App">
        <h1 className="instructions">Where&apos;s Waldo?</h1>
        <button type="button" onClick={handleStartClick}>
          START
        </button>
      </div>
    );
  }

  if (endScreen) {
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

  if (leaderboardDisplay) {
    retrieveLeaderboard();
    return (
      <div className="App">
        <h1 className="instructions">You&apos;re score has been submitted!</h1>
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
          {leaderboardData.map((row) => {
            return (
              <tr>
                <td>{row.rank}</td>
                <td>{row.user.name}</td>
                <td>{row.user.hours}</td>
                <td>{row.user.minutes}</td>
                <td>{row.user.seconds}</td>
              </tr>
            );
          })}
        </table>
        <button type="button" onClick={handleStartClick}>
          Play Again?
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="instructions">Find These Folks:</h1>
      <div className="characters-bin">
        {charactersFound.map((character) => {
          if (character.found) {
            return (
              <div className="found-character">
                <Character name={character.name} img={character.src} />
              </div>
            );
          }
          return <Character name={character.name} img={character.src} />;
        })}
      </div>
      <Timer hours={hours} minutes={minutes} seconds={seconds} />
      <Scene changeCharacterFound={changeCharacterFound} />
    </div>
  );
}

export default App;
