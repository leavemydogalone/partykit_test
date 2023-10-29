import React, { useState, useRef, useEffect } from "react";
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
  selected,
  setSelectedBoxId,
}) {
  //   the left offset of the box from parent div
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const box = useRef(null);
  const textRef = useRef(null);

  //TODO
  //need to create logic to handle when a box is selected or being edited by someone else
  //prevent others from editing
  //make the box rise to the top of z-index for the one moving/making the edit and
  //prevent text select when moving

  useEffect(() => {
    if (textRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textRef.current.style.height = "0px";
      const scrollHeight = textRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textRef.current.style.height = scrollHeight + 1 + "px";
    }
  }, [textRef.current, text]);

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

  function handleRemove() {
    ws.send(
      JSON.stringify({
        action: ACTIONS.REMOVE_BOX,
        payload: {
          id: id,
        },
      })
    );
  }

  return (
    <div
      ref={box}
      className={styles.box}
      style={{
        left: position.x,
        top: position.y,
        border: selected ? "2px solid" : "",
        zIndex: selected ? "5" : "1",
      }}
      onMouseMoveCapture={(e) => {
        if (mouseIsDown) {
          handleMove(id, {
            x: offset.x + e.clientX,
            y: offset.y + e.clientY,
          });
        }
      }}
    >
      <div
        className={styles.upperBar}
        onMouseDown={(e) => {
          setSelectedBoxId(id);
          setMouseIsDown(true);
          const nullChecker =
            box.current !== null &&
            setOffset({
              x: box.current.offsetLeft - e.clientX,
              y: box.current.offsetTop - e.clientY,
            });
        }}
      ></div>
      <main className={styles.centerContainer}>
        <textarea
          onChange={(e) => handleInputChange(e)}
          value={text}
          ref={textRef}
        />
      </main>
      <button className={styles.delete} onClick={() => handleRemove()}>
        x
      </button>
    </div>
  );
}
