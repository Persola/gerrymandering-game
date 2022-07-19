export default (array) => {
  let swapSlot;
  let currentIndex = array.length - 1;

  while (currentIndex !== 0) {
    const randomLowerIndex = Math.floor(Math.random() * currentIndex);
    swapSlot = array[currentIndex];
    array[currentIndex] = array[randomLowerIndex];
    array[randomLowerIndex] = swapSlot;
    currentIndex -= 1;
  }

  return array;
};
