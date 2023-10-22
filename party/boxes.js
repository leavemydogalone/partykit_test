/* eslint-env browser */
import { ACTIONS } from "./types";
// @ts-check
// Optional JS type checking, powered by TypeScript.
/** @typedef {import("partykit/server").Party} Party */
/** @typedef {import("partykit/server").Server} Server */
/** @typedef {import("partykit/server").Connection} Connection */
/** @typedef {import("partykit/server").ConnectionContext} ConnectionContext */

/**
 * @implements {Server}
 */
class PartyServer {
  /**
   * @param {Party} party - The Party object.
   */
  constructor(party) {
    /** @type {Party} */
    this.party = party;
  }
  boxes = [{ position: { x: 0, y: 0 }, id: 0, selected: false }];

  async onStart() {
    // await this.party.storage.put("boxes", this.boxes);

    this.boxes = (await this.party.storage.get("boxes")) ?? [];
  }
  /**
   * @param {Connection} conn - The connection object.
   * @param {ConnectionContext} ctx - The context object.
   */
  async onConnect(conn, ctx) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.party.id}
  url: ${new URL(ctx.request.url).pathname}
  this is a box party`
    );

    // Send a message to the connection
    // new URL(ctx.request.url).pathname
    conn.send(JSON.stringify(this.boxes));
  }

  /**
   * @param {string} message
   * @param {Connection} sender
   */
  onMessage(message, sender) {
    const { payload, action } = JSON.parse(message);
    switch (action) {
      case ACTIONS.MOVE_BOX:
        this.boxes = this.boxes.map((box) => {
          if (box.id !== payload.id) {
            return { ...box };
          } else {
            return { ...box, x: payload.position.x, y: payload.position.y };
          }
        });
        this.party.broadcast(JSON.stringify(this.boxes));
      default:
        this.party.broadcast(JSON.stringify(this.boxes));
    }
  }
}

export default PartyServer;
