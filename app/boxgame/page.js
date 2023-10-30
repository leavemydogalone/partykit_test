"use client";
import React, { useEffect, useRef, useState } from "react";
import usePartySocket from "partysocket/react";
import styles from "./page.module.css";
import Box from "../components/Box";
import { ACTIONS } from "@/party/types";
import { keepBoxInContainer } from "../helpers/boxHelpers";

export default function BoxContainer() {
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const boxContainer = useRef(null);
  const ref = useRef([]);

  const ws = usePartySocket({
    host: "localhost:1999",
    room: "boxes",
    party: "boxes",
    onOpen(event) {
      console.log("connected");
    },
    onMessage(event) {
      setBoxes(JSON.parse(event.data));
    },
  });

  function handleMove(id, index, position) {
    let positionWithinBox = keepBoxInContainer(
      position,
      ref.current[index],
      boxContainer.current
    );

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

  function handleMouseDown(index, e) {
    const nullChecker =
      ref.current[index] !== null &&
      setOffset({
        x: ref.current[index].offsetLeft - e.clientX,
        y: ref.current[index].offsetTop - e.clientY,
      });
  }

  return (
    <main id="main" className={styles.main}>
      <section
        ref={boxContainer}
        className={styles.boxContainer}
        onMouseMoveCapture={(e) => {
          if (mouseIsDown) {
            handleMove(selectedBoxId, selectedBoxIndex, {
              x: offset.x + e.clientX,
              y: offset.y + e.clientY,
            });
          }
        }}
        onMouseUp={() => {
          setMouseIsDown(false);
          setSelectedBoxId(null);
        }}
      >
        {boxes.length > 0
          ? boxes.map((box, index) => (
              <Box
                ws={ws}
                key={box.id}
                position={{ x: box.x, y: box.y }}
                text={box.text || ""}
                id={box.id}
                setBoxes={setBoxes}
                setMouseIsDown={setMouseIsDown}
                selected={box.id === selectedBoxId}
                setSelectedBoxId={setSelectedBoxId}
                setSelectedBoxIndex={setSelectedBoxIndex}
                handleMouseDown={handleMouseDown}
                ref={(el) => (ref.current[index] = el)}
                index={index}
                selectedBoxIndex={selectedBoxIndex}
              />
            ))
          : " "}
      </section>
      <button
        onClick={() => {
          ws.send(
            JSON.stringify({
              action: ACTIONS.ADD_BOX,
              payload: {},
            })
          );
        }}
      >
        ADD BOX
      </button>
    </main>
  );
}
