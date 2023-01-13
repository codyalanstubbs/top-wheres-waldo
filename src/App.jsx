import React from "react";
import Character from "./components/Character";
import Scene from "./components/Scene";
import "./App.css";
import Waldo from "./assets/images/waldo_400x400.png";
import Wilma from "./assets/images/wilma_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  return (
    <div className="App">
      <h1 className="instructions">Find These Folks:</h1>
      <div className="characters-bin">
        <Character name="Waldo" img={Waldo} />
        <Character name="Wilma" img={Wilma} />
        <Character name="Wizard" img={Wizard} />
      </div>
      <h2 className="timer">0:00:00</h2>
      <Scene />
    </div>
  );
}

export default App;
