import React from "react";
import GlowingWaldo from "./GlowingWaldo";

// eslint-disable-next-line react/prop-types
function StartScreen({ goToGameScreen }) {
  return (
    <div className="App">
      <h1 className="instructions glow">Where&apos;s Waldo?</h1>
      <GlowingWaldo classList="svgGlow" w="200" h="200" />
      <button type="button" onClick={goToGameScreen}>
        START
      </button>
    </div>
  );
}

export default StartScreen;
