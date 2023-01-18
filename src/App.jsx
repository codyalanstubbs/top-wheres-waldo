import React, { useCallback, useState } from "react";
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

  const goToLeaderboard = useCallback(() => {
    // Transition from submit data screen to leaderboard scene
    setEndScreen(false);
    setLeaderboardDisplay(true);
  });

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
      <SubmitScoreScreen
        finalHour={finalHour}
        finalMinute={finalMinute}
        finalSecond={finalSecond}
        goToLeaderboard={goToLeaderboard}
      />
    );
  }

  if (leaderboardDisplay) {
    return <Leaderboard />;
  }

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

export default App;
