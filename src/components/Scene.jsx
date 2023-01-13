import React from "react";
import SceneImg from "../assets/images/scene-winter.jpeg";
import "../assets/css/Scene.css";

function Scene() {
  const handleClick = (e) => {
    const img = document.querySelector("img");
    const x = e.pageX - img.offsetLeft;
    const y = e.pageY - img.offsetTop;
    console.log("x: ", x);
    console.log("y: ", y);
  };

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

export default Scene;
