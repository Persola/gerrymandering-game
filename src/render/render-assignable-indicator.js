import assignableClassName from '../data/assignable-class';

export default ($, hoveredSlot) => {
  const indicatedSlot = $(`.${assignableClassName}`);

  if (indicatedSlot === hoveredSlot) {
    return;
  }

  if (indicatedSlot !== null) {
    indicatedSlot.classList.remove(assignableClassName);
  }

  if (hoveredSlot !== null) {
    hoveredSlot.classList.add(assignableClassName);
  }
};
