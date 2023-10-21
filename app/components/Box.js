import React, { useState, useRef } from "react";
import styles from "./Box.module.css";
import keepBoxInContainer from "../helpers/keepBoxInContainer";

export default function Box({
  position,
  id,
  setBoxes,
  mouseIsDown,
  setMouseIsDown,
  boxContainer,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  //   the left offset from parent div of the draggerContainer

  const box = useRef(null);

  function handleMove(id, position) {
    position.x = Math.max(0, position.x);
    position.x = Math.min(
      position.x,
      boxContainer.offsetWidth - box.current.offsetWidth
    );
    position.y = Math.max(0, position.y);
    position.y = Math.min(
      position.y,
      boxContainer.offsetHeight - box.current.offsetHeight
    );

    // ws.send(JSON.stringify({ id: id, position: position }));
    setBoxes((prev) =>
      prev.map((box) => {
        if (box.id !== id) {
          return { ...box };
        } else {
          return { ...box, x: position.x, y: position.y };
        }
      })
    );
  }

  return (
    <div
      ref={box}
      className={styles.box}
      style={{ left: position.x, top: position.y }}
      onMouseMoveCapture={(e) => {
        if (mouseIsDown) {
          // setDraggerPositionX(offsetX + e.clientX);
          // if the mouse is down, will set the "left" position of the dragger,
          //   based on the offsetLeft of the draggerContainer when the mouse went down
          // plus the mouse position
          // if (offsetX + e.clientX < 0) {
          //   setDraggerPositionX(0);
          // }
          handleMove(id, {
            x: offset.x + e.clientX,
            y: offset.y + e.clientY,
          });
          //   prevents the dragger from being dragged out of the left of the container
        }
      }}
      onMouseDown={(e) => {
        setMouseIsDown(true);
        const nullChecker =
          box.current !== null &&
          setOffset({
            x: box.current.offsetLeft - e.clientX,
            y: box.current.offsetTop - e.clientY,
          });
      }}
    >
      <span>Box</span>
    </div>
  );
}
