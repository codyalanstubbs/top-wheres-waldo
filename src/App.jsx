import React, { useState } from "react";
import Character from "./components/Character";
import Scene from "./components/Scene";
import "./App.css";
import Waldo from "./assets/images/waldo_400x400.png";
import Wilma from "./assets/images/wilma_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  const [charactersFound, setCharactersFound] = useState([
    { name: "waldo", found: false, src: Waldo },
    { name: "wilma", found: false, src: Wilma },
    { name: "wizard", found: false, src: Wizard },
  ]);

  function handleClick() {
    console.log(charactersFound[0].found);
    setCharactersFound([
      { name: "waldo", found: true, src: Waldo },
      { name: "wilma", found: false, src: Wilma },
      { name: "wizard", found: false, src: Wizard },
    ]);
  }

  return (
    <div className="App">
      <h1 className="instructions">Find These Folks:</h1>
      <button type="button" onClick={handleClick}>
        Found Him
      </button>
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
      <h2 className="timer">0:00:00</h2>
      <Scene setCharactersFound />
    </div>
  );
}

export default App;
