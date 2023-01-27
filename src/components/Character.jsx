/* eslint react/prop-types: 0 */

import React from "react";

function Character(props) {
  const { name, img, classList } = props;
  const lowerCaseName = name.toLowerCase();
  const alt = `Look it's ${name}`;
  return (
    <img
      id={lowerCaseName}
      className={classList}
      width="91px"
      src={img}
      alt={alt}
    />
  );
}

export default Character;
