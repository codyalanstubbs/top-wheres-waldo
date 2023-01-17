import React, { useCallback, useState } from "react";
import Character from "./components/Character";
import Timer from "./components/Timer";
import Scene from "./components/Scene";
import "./App.css";
import Waldo from "./assets/images/waldo_400x400.png";
import Wilma from "./assets/images/wilma_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  const [startScreen, setStartScreen] = useState(true);

  const [charactersFound, setCharactersFound] = useState([
    { name: "waldo", found: false, src: Waldo },
    { name: "wilma", found: false, src: Wilma },
    { name: "wizard", found: false, src: Wizard },
  ]);

  const changeCharacterFound = useCallback(
    (characterName) => {
      const newCharactersFound = [...charactersFound];
      const character = newCharactersFound.find((char) => {
        return char.name === characterName;
      });
      character.found = true;
      setCharactersFound(newCharactersFound);
    },
    [setCharactersFound]
  );

  // Set states for the timer
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

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
