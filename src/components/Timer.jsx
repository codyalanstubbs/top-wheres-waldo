import React from "react";
import "../assets/css/Timer.css";

// eslint-disable-next-line react/prop-types
function Timer({ hours, minutes, seconds }) {
  return (
    <h2 className="timer">
      <div className="hours">{hours}</div>
      <div className="colon">:</div>
      <div className="minutes">{minutes}</div>
      <div className="colon">:</div>
      <div className="seconds">{seconds}</div>
    </h2>
  );
}

export default Timer;
