export const SLOW_DOWN_SENTINEL = "slowdown";
export const GO_AWAY_SENTINEL = "goaway";
export enum ACTIONS {
  ADD_BOX,
  MOVE_BOX,
  STOP_BOX,
  REMOVE_BOX,
}
export type Box = {
  position: { x: 0; y: 0 };
  id: 0;
  selected: false;
};
