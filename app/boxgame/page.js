"use client";
import React, { useRef, useState } from "react";
import usePartySocket from "partysocket/react";
import styles from "./page.module.css";
import Box from "../components/Box";
import { ACTIONS } from "@/party/types";

export default function BoxContainer() {
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [boxes, setBoxes] = useState([]);

  const boxContainer = useRef(null);

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

  return (
    <main id="main" className={styles.main}>
      <section
        ref={boxContainer}
        className={styles.boxContainer}
        onMouseUp={() => setMouseIsDown(false)}
      >
        {boxes.length > 0
          ? boxes.map((box) => (
              <Box
                ws={ws}
                key={box.id}
                position={{ x: box.x, y: box.y }}
                id={box.id}
                setBoxes={setBoxes}
                mouseIsDown={mouseIsDown}
                setMouseIsDown={setMouseIsDown}
                boxContainer={boxContainer.current}
              />
            ))
          : " "}
      </section>
      <button>ADD BOX</button>
    </main>
  );
}
