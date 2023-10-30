const buffer = 6;
export function keepBoxInContainer(position, box, boxContainer) {
  position.x = Math.max(buffer, position.x);
  position.x = Math.min(
    position.x,
    boxContainer.offsetWidth - (box.offsetWidth + buffer)
  );
  position.y = Math.max(buffer, position.y);
  position.y = Math.min(
    position.y,
    boxContainer.offsetHeight - (box.offsetHeight + buffer)
  );
  return position;
}
