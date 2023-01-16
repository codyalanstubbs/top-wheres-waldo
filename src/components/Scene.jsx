import React, { useState } from "react";
import Character from "./Character";
import "../assets/css/Scene.css";
import SceneImg from "../assets/images/scene-winter.jpeg";
import Waldo from "../assets/images/waldo_400x400.png";
import Wilma from "../assets/images/wilma_400x400.png";
import Wizard from "../assets/images/wizard_400x400.png";

function Scene() {
  const [targetClicked, setTargetClicked] = useState(false);
  const [targetXPos, setTargetXPos] = useState(0);
  const [targetYPos, setTargetYPos] = useState(0);

  const handleClick = (e) => {
    setTargetClicked(true);
    setTargetXPos(e.pageX - 25);
    setTargetYPos(e.pageY - 25);

    // To be used for validating if user clicked correct location
    const scene = document.querySelector(".scene");
    const clickXCoordInScene = e.pageX - scene.offsetLeft;
    const clickYCoordInScene = e.pageY - scene.offsetTop;
    console.log("L: ", clickXCoordInScene - 25);
    console.log("R: ", clickXCoordInScene + 25);
    console.log("T: ", clickYCoordInScene - 25);
    console.log("B: ", clickYCoordInScene + 25);
  };

  if (targetClicked) {
    return (
      <button className="scene-btn" type="button" onClick={handleClick}>
        <img
          width="600px"
          src={SceneImg}
          alt="A Where's Waldo scene."
          className="scene"
        />
        <div
          style={{ left: targetXPos, top: targetYPos }}
          className="target-container"
        >
          <div className="targeting-box" />
          <div className="character-targets">
            <Character name="Waldo" img={Waldo} />
            <Character name="Wilma" img={Wilma} />
            <Character name="Wizard" img={Wizard} />
          </div>
        </div>
      </button>
    );
  }
  if (!targetClicked) {
    return (
      <button className="scene-btn" type="button" onClick={handleClick}>
        <img
          width="600px"
          src={SceneImg}
          alt="A Where's Waldo scene."
          className="App"
        />
      </button>
    );
  }
}

export default Scene;
