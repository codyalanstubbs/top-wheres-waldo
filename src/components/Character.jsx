/* eslint react/prop-types: 0 */

import React from "react";

function Character(props) {
  const { name, img } = props;
  const lowerCaseName = name.toLowerCase();
  const alt = `Look it's ${name}`;
  return <img id={lowerCaseName} width="40px" src={img} alt={alt} />;
}

export default Character;
