import React, { useState } from "react";
import styles from "./Box.module.css";

export default function Box({ props, handleMove }) {
  const { x, y, id } = props;
  let transform = { transform: `translate(${x}px, ${y}px)` };
  return (
    <div
      className={styles.box}
      style={transform}
      onMouseDown={() => handleMove()}
    >
      Im a box
    </div>
  );
}
