import React, { useState, useRef, useEffect } from "react";
import styles from "./Box.module.css";
import { ACTIONS } from "@/party/types";
import { keepBoxInContainer } from "../helpers/boxHelpers";
import { forwardRef } from "react";

const Box = forwardRef(function Box(
  {
    ws,
    position,
    id,
    setMouseIsDown,
    text,
    selected,
    setSelectedBoxId,
    handleMouseDown,
    index,
    setSelectedBoxIndex,
    selectedBoxIndex,
  },
  ref
) {
  const textRef = useRef(null);

  useEffect(() => {
    // sets the height of the textarea based on text inside
    if (textRef.current) {
      textRef.current.style.height = "0px";
      const scrollHeight = textRef.current.scrollHeight;
      textRef.current.style.height = scrollHeight + 1 + "px";
    }
  }, [textRef.current, text]);

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
    <>
      <div
        className={styles.screen}
        style={{ display: selected ? "block" : "none" }}
      ></div>

      <div
        className={styles.box}
        style={{
          left: position.x,
          top: position.y,
          border: selected ? "2px solid" : "",
          zIndex: selectedBoxIndex === index ? "5" : "1",
        }}
        id={id}
        ref={ref}
      >
        <div
          className={styles.upperBar}
          onMouseDown={(e) => {
            e.preventDefault();
            setSelectedBoxIndex(index);
            setSelectedBoxId(id);
            setMouseIsDown(true);
            handleMouseDown(index, e);
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
    </>
  );
});

export default Box;
