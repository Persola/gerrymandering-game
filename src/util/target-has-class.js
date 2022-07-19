export default (className, evnt) => {
  return (
    evnt.target.className &&
    evnt.target.className.split(' ').includes(className)
  )
};
