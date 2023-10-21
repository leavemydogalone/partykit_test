"use client";
import React, { useRef, useState } from "react";
import usePartySocket from "partysocket/react";
import styles from "./page.module.css";
import Box from "../components/Box";

export default function BoxContainer() {
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [boxes, setBoxes] = useState([
    {
      x: 0,
      y: 0,
      id: 9,
    },
    {
      x: 0,
      y: 0,
      id: 20,
    },
  ]);

  const boxContainer = useRef(null);

  const ws = usePartySocket({
    host: "localhost:1999",
    room: "boxes",
    party: "boxes",
    onOpen() {
      console.log("connected");
    },
    onMessage(event) {
      console.log(JSON.parse(event.data));
    },
  });

  return (
    <main id="main" className={styles.main}>
      <section
        ref={boxContainer}
        className={styles.boxContainer}
        onMouseUp={() => setMouseIsDown(false)}
        // onMouseLeave={() => setMouseIsDown(false)}
      >
        {boxes.map((box) => (
          <Box
            key={box.id}
            position={{ x: box.x, y: box.y }}
            id={box.id}
            setBoxes={setBoxes}
            mouseIsDown={mouseIsDown}
            setMouseIsDown={setMouseIsDown}
            boxContainer={boxContainer.current}
          />
        ))}
      </section>
    </main>
  );
}
