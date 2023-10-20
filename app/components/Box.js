import React, { useState } from "react";
import styles from "./Box.module.css";

export default function Box({ props, handleMove }) {
  const [selected, setSelected] = useState(false);

  const { x, y, id } = props;
  let transform = { transform: `translate(${x}px, ${y}px)` };

  function handleMouseDown(event) {
    setSelected(true);
    console.log(`selected = ${selected}`);
  }
  function handleMouseMove(event) {
    if (!selected) {
      return;
    } else {
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = event.target.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
      // console.log(elemRect);
      // console.log(event.clientX);

      handleMove(id, { x: event.clientX, y: event.clientY });
    }
  }
  return (
    <div
      className={styles.box}
      style={transform}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseLeave={() => setSelected(false)}
      onMouseUp={() => setSelected(false)}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      Im a box
    </div>
  );
}
