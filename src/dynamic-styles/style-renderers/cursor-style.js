export default (color, innerColor) => {
  const first = (
    `url(`
      + `"data:image/svg+xml,%3C`
        + `svg%20xmlns='http://www.w3.org/2000/svg'%20`
        + `height='54'%20`
        + `width='36'`
      + `%3E`
      + `%3C`
        + `polygon%20`
        + `points='1,0%2026,32%201,44'%20`
        + `fill='%23${color}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const optional = (
      `%3C`
        + `polygon%20`
        + `points='1,30%2018,22%2026,32%201,44'%20`
        + `fill='%23${innerColor}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const last = `%3C/svg%3E") 0 0, default`;

  if (innerColor !== null) {
    return first + optional + last;
  } else {
    return first + last;
  }
};
