export function keepBoxInContainer(position, box, boxContainer) {
  position.x = Math.max(0, position.x);
  position.x = Math.min(position.x, boxContainer.offsetWidth - box.offsetWidth);
  position.y = Math.max(0, position.y);
  position.y = Math.min(
    position.y,
    boxContainer.offsetHeight - box.offsetHeight
  );
  return position;
}
