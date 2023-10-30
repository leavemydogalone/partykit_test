//padding of boxContainer
const padding = 6;

// TODO allow the boxContainer to be larger than the screen and use
//the scrollWidth of the boxContainer rather than offsetWidth
export function keepBoxInContainer(position, box, boxContainer) {
  position.x = Math.max(padding, position.x);
  position.x = Math.min(
    position.x,
    boxContainer.offsetWidth - (box.offsetWidth + padding)
  );
  position.y = Math.max(padding, position.y);
  position.y = Math.min(
    position.y,
    boxContainer.offsetHeight - (box.offsetHeight + padding)
  );
  return position;
}
