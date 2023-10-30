"use client";
import React, { useState } from "react";
import usePartySocket from "partysocket/react";
import styles from "./Clicker.module.css";

export default function Clicker() {
  const [clicks, setClicks] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const ws = usePartySocket({
    host: "https://partykit_next_test.leavemydogalone.partykit.dev",
    room: "my-room",

    onOpen() {
      console.log("connected");
    },
    onMessage(event) {
      setClicks(event.data);
    },
    onError(error) {
      console.log(error);
    },
  });

  function handleClick() {
    ws.send("click");
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }
  return (
    <div className={styles.clickerContainer}>
      <h1 className={styles.h1}>Open another browser and ADD THOSE CLICKS</h1>
      <h2 className={styles.h2}>Clicks: {clicks === 0 ? "-" : clicks}</h2>
      <button disabled={disabled} onClick={handleClick}>
        Add a Click
      </button>
    </div>
  );
}
