"use client";
import React from "react";
import usePartySocket from "partysocket/react";

export default function Clicker() {
  const ws = usePartySocket({
    host: "localhost:1999", // or localhost:1999 in dev
    room: "my-room",

    onOpen() {
      console.log("connected");
    },
  });

  return <div>clicker</div>;
}
