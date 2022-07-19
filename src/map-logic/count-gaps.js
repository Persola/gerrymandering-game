export default (neighborsOfDistrict) => {
  /*
    Only cells in the four basic directions count as adjacent. Diagonals are
    only referenced in order to do this.
  */
  const directions = [
    'downRight',
    'right',
    'upRight',
    'up',
    'upLeft',
    'left',
    'downLeft',
    'down',
  ];

  let inSelectedDistrict = neighborsOfDistrict.down;
  let gaps = 0;

  for (const directionInd in directions) {
    const direction = directions[directionInd];

    if (inSelectedDistrict) {
      if (!neighborsOfDistrict[direction]) {
        inSelectedDistrict = false;
        gaps ++;
      }
    } else {
      if (
        neighborsOfDistrict[direction] &&
        ['down', 'right', 'up', 'left'].includes(direction)
      ) {
        inSelectedDistrict = true;
      }
    }
  }

  return gaps;
};
