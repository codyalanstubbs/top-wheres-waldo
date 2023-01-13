import React from "react";
import "./App.css";
import Scene from "./components/Scene";
import Wilma from "./assets/images/wilma_400x400.png";
import Waldo from "./assets/images/waldo_400x400.png";
import Wizard from "./assets/images/wizard_400x400.png";

function App() {
  return (
    <div className="App">
      <h1 className="instructions">Find These Folks:</h1>
      <div className="characters-bin">
        <img
          className="waldo"
          width="40px"
          src={Waldo}
          alt="Look for this guy!"
        />
        <img
          className="wilma"
          width="40px"
          src={Wilma}
          alt="Look for this lady!"
        />
        <img
          className="wizard"
          width="40px"
          src={Wizard}
          alt="Look for this wise man!"
        />
      </div>
      <h2 className="timer">0:00:00</h2>
      <Scene />
    </div>
  );
}

export default App;
