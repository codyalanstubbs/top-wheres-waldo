import React from "react";
import Character from "./Character";
import Timer from "./Timer";
import Scene from "./Scene";

function GameScreen(props) {
  // eslint-disable-next-line react/prop-types
  const { hours, minutes, seconds, charactersFound, changeCharacterFound } =
    props;
  return (
    <div className="App">
      <h1 className="instructions">Find These Folks:</h1>
      <div className="characters-bin">
        {
          // eslint-disable-next-line react/prop-types
          charactersFound.map((character) => {
            if (character.found) {
              return (
                <div className="found-character">
                  <Character name={character.name} img={character.src} />
                </div>
              );
            }
            return <Character name={character.name} img={character.src} />;
          })
        }
      </div>
      <Timer hours={hours} minutes={minutes} seconds={seconds} />
      <Scene changeCharacterFound={changeCharacterFound} />
    </div>
  );
}

export default GameScreen;
