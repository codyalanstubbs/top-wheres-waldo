import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Character from "./Character";
import "../assets/css/Scene.css";
import SceneImg from "../assets/images/scene-winter.jpeg";
import Waldo from "../assets/images/waldo_400x400.png";
import Wilma from "../assets/images/wilma_400x400.png";
import Wizard from "../assets/images/wizard_400x400.png";

function getCharCoordData(characterName) {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "top-wheres-waldo-b4094.firebaseapp.com",
    projectId: "top-wheres-waldo-b4094",
    storageBucket: "top-wheres-waldo-b4094.appspot.com",
    messagingSenderId: "811092831655",
    appId: "1:811092831655:web:be49ee2a65374322fcda82",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const docRef = doc(db, "characters", characterName);
  let docSnap;
  const charCoords = (async () => {
    docSnap = await getDoc(docRef);
    let coordData = null;
    if (docSnap.exists()) {
      coordData = docSnap.data();
    }
    return coordData;
  })();
  return charCoords;
}

function Scene(props) {
  // eslint-disable-next-line react/prop-types
  const { changeCharacterFound } = props;

  const [clicked, setClicked] = useState(false);
  const [clickXPos, setClickXPos] = useState(0);
  const [clickYPos, setClickYPos] = useState(0);

  // Display the targeting box by altering corresponding states
  const handleTargetClick = (e) => {
    setClicked(true);
    setClickXPos(e.pageX);
    setClickYPos(e.pageY);
  };

  // Function for validating the user's character selection
  // has the correct coordinates
  function characterSelected(e) {
    // Find the coordinates of the click position in the scene
    const scene = document.querySelector(".scene");
    const clickXCoordInScene = clickXPos - scene.offsetLeft;
    const clickYCoordInScene = clickYPos - scene.offsetTop;

    // Get the selected character's coordindate data from DB
    const characterName = e.target.id;
    const charCoordData = getCharCoordData(characterName);

    // Check if the clicked coordinates are in the character's
    const checkClickedCoords = async () => {
      const charCoords = await charCoordData;
      if (
        charCoords.left <= clickXCoordInScene &&
        charCoords.right >= clickXCoordInScene &&
        charCoords.bottom >= clickYCoordInScene &&
        charCoords.top <= clickYCoordInScene
      ) {
        console.log("Correct!");
        changeCharacterFound(characterName);
        setClicked(false);
      } else {
        console.log("Incorrect!");
        setClicked(false);
      }
    };

    checkClickedCoords();
  }

  // If the scene has been clicked...
  if (clicked) {
    // ...then return the scene with a targeting box and
    // the character selection boxes
    return (
      <div>
        <button className="scene-btn" type="button" onClick={handleTargetClick}>
          <img
            width="600px"
            src={SceneImg}
            alt="A Where's Waldo scene."
            className="scene"
          />
        </button>
        <div
          style={{ left: clickXPos - 25, top: clickYPos - 25 }}
          className="target-container"
        >
          <div className="targeting-box" />
          <div className="character-targets">
            <button
              id="waldo"
              className="select-character"
              type="button"
              onClick={characterSelected}
            >
              <Character name="Waldo" img={Waldo} />
            </button>
            <button
              id="wilma"
              className="select-character"
              type="button"
              onClick={characterSelected}
            >
              <Character name="Wilma" img={Wilma} />
            </button>
            <button
              id="wizard"
              className="select-character"
              type="button"
              onClick={characterSelected}
            >
              <Character name="Wizard" img={Wizard} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If the scene has not been clicked...
  if (!clicked) {
    // ...then just display the scene
    return (
      <button className="scene-btn" type="button" onClick={handleTargetClick}>
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
