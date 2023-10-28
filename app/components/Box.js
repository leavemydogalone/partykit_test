import React, { useState, useRef } from "react";
import styles from "./Box.module.css";
import { ACTIONS } from "@/party/types";

export default function Box({
  ws,
  position,
  id,
  mouseIsDown,
  setMouseIsDown,
  boxContainer,
  text,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  //   the left offset of the box from parent div

  const box = useRef(null);

  function keepBoxInContainer(position) {
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
    return position;
  }
  function handleMove(id, position) {
    let positionWithinBox = keepBoxInContainer(position);

    ws.send(
      JSON.stringify({
        action: ACTIONS.MOVE_BOX,
        payload: {
          id: id,
          position: { x: positionWithinBox.x, y: positionWithinBox.y },
        },
      })
    );
  }

  function handleInputChange(e) {
    ws.send(
      JSON.stringify({
        action: ACTIONS.UPDATE_BOX_TEXT,
        payload: {
          id: id,
          text: e.target.value,
        },
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
          handleMove(id, {
            x: offset.x + e.clientX,
            y: offset.y + e.clientY,
          });
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
      <input onChange={(e) => handleInputChange(e)} value={text} />
    </div>
  );
}
