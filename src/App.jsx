import React, { useCallback, useState, useRef, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import SubmitScoreScreen from "./components/SubmitScoreScreen";
import Leaderboard from "./components/Leaderboard";
import GameScreen from "./components/GameScreen";

import "./App.css";
import Waldo from "./assets/images/waldo_400x400.png";
import Wilma from "./assets/images/wilma_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  const [startScreen, setStartScreen] = useState(true);
  const [gameScreen, setGameScreen] = useState(false);
  const [endScreen, setEndScreen] = useState(false);
  const [leaderboardDisplay, setLeaderboardDisplay] = useState(false);

  const [charactersFound, setCharactersFound] = useState([
    { name: "waldo", found: false, src: Waldo },
    { name: "wilma", found: false, src: Wilma },
    { name: "wizard", found: false, src: Wizard },
  ]);

  // Set states for the timer
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  const changeCharacterFound = useCallback(
    (characterName) => {
      // Create a separate charactersFound array from state
      const newCharactersFound = [...charactersFound];

      // Find the character by name and set found property
      const character = newCharactersFound.find((char) => {
        return char.name === characterName;
      });
      character.found = true;

      // Check if there are still characters that have not been found
      const characterStillNotFound = newCharactersFound.some((char) => {
        return char.found === false;
      });

      // If there are no more characters to find...
      if (!characterStillNotFound) {
        // ...transition from GameScreen to SubmitScoreScreen
        setGameScreen(false);
        setEndScreen(true);
      }

      setCharactersFound(newCharactersFound);
    },
    [setCharactersFound, charactersFound]
  );

  // Calculate and set times - to be used in handleStartClick
  function getTime(startTime) {
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
  }

  // Store a reference to the interval
  const interval = useRef();

  // Clear time on component dismount
  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  // Start and stop interval on gameScreen change
  useEffect(() => {
    if (gameScreen) {
      // Set the startTime for timer
      const startTime = Date.now();

      // Set interval for incrementing the timer
      interval.current = setInterval(() => getTime(startTime), 1000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [gameScreen]);

  // After transitioning to leaderboard, reset character found properties
  // and time
  useEffect(() => {
    if (leaderboardDisplay) {
      setCharactersFound([
        { name: "waldo", found: false, src: Waldo },
        { name: "wilma", found: false, src: Wilma },
        { name: "wizard", found: false, src: Wizard },
      ]);
      setSeconds("00");
      setMinutes("00");
      setHours("00");
    }
  }, [leaderboardDisplay]);

  function goToGameScreen() {
    // Transition from start screen to game screen
    setStartScreen(false);
    setGameScreen(true);
  }

  const goToLeaderboard = useCallback(() => {
    // Transition from submit data screen to leaderboard screen
    setEndScreen(false);
    setLeaderboardDisplay(true);
  });

  const goToStartScreen = useCallback(() => {
    // Transition from leaderboard screen to start screen
    setLeaderboardDisplay(false);
    setStartScreen(true);
  });

  if (startScreen) {
    return (
      <div className="App">
        <h1 className="instructions">Where&apos;s Waldo?</h1>
        <button type="button" onClick={goToGameScreen}>
          START
        </button>
      </div>
    );
  }

  if (endScreen) {
    return (
      <SubmitScoreScreen
        finalHour={hours}
        finalMinute={minutes}
        finalSecond={seconds}
        goToLeaderboard={goToLeaderboard}
      />
    );
  }

  if (leaderboardDisplay) {
    return <Leaderboard goToStartScreen={goToStartScreen} />;
  }

  if (gameScreen) {
    return (
      <GameScreen
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        charactersFound={charactersFound}
        changeCharacterFound={changeCharacterFound}
      />
    );
  }
}

export default App;
