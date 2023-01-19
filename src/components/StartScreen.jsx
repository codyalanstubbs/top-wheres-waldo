import React from "react";

// eslint-disable-next-line react/prop-types
function StartScreen({ goToGameScreen }) {
  return (
    <div className="App">
      <h1 className="instructions">Where&apos;s Waldo?</h1>
      <button type="button" onClick={goToGameScreen}>
        START
      </button>
    </div>
  );
}

export default StartScreen;
