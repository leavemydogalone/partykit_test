import React, { useState, useRef } from "react";
import styles from "./Box.module.css";

export default function Box({ props, setBoxes }) {
  const [offsetX, setOffsetX] = useState(0);
  //   the left offset from parent div of the draggerContainer
  const [isDown, setIsDown] = useState(false);
  //   if the mouse is held down
  const [draggerPositionX, setDraggerPositionX] = useState(0);
  //   The "left" postition of the draggerContainer

  const box = useRef(null);

  const { x, y, id } = props;
  let transform = { transform: `translate(${x}px, ${y}px)` };

  function handleMove(id, position) {
    // ws.send(JSON.stringify({ id: id, position: position }));
    setBoxes((prev) =>
      prev.map((box) => {
        if (box.id !== id) {
          return { ...box };
        } else {
          // console.log(boxes);
          return { ...box, x: position.x, y: 0 };
        }
      })
    );
  }

  function handleMouseMove(event) {
    if (!selected) {
      return;
    } else {
      let bodyRect = box.current.getBoundingClientRect(),
        elemRect = event.target.getBoundingClientRect(),
        offsetX = bodyRect.left - elemRect.left,
        offsetY = elemRect.top - bodyRect.top;

      handleMove(id, {
        x: offsetX + event.clientX,
        y: offsetY + event.clientY,
      });
    }
  }

  return (
    <div
      ref={box}
      className={styles.box}
      style={{ left: draggerPositionX }}
      onMouseUp={() => setIsDown(false)}
      onMouseLeave={() => setIsDown(false)}
      onMouseMoveCapture={(e) => {
        if (isDown) {
          setDraggerPositionX(offsetX + e.clientX);
          // if the mouse is down, will set the "left" position of the dragger,
          //   based on the offsetLeft of the draggerContainer when the mouse went down
          // plus the mouse position
          if (offsetX + e.clientX < 0) {
            setDraggerPositionX(0);
          }
          //   prevents the dragger from being dragged out of the left of the container
        }
      }}
      onMouseDown={(e) => {
        setIsDown(true);
        const nullChecker =
          box.current !== null &&
          setOffsetX(box.current.offsetLeft - e.clientX);
      }}
    >
      <span>Box</span>
    </div>
  );
}
