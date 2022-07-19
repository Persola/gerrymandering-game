export default idString => {
  const match = idString.match(/(\d+)\-(\d+)/);
  return [Number(match[1]), Number(match[2])];
};
