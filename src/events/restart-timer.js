const updateTimer = ($, startTime) => {
  const totalMilliseconds = Date.now() - startTime;
  const seconds = Math.floor(totalMilliseconds/1000) % 60;
  const minutes = Math.floor(totalMilliseconds/(1000 * 60));
  const secondsString = String(seconds).padStart(2, 0);
  const minutesString = String(minutes).padStart(2, 0);
  $('#timer').innerText = `${minutesString}:${secondsString}`;
};

export default ($, mapConfig) => {
  const startTime = Date.now();
  clearInterval(mapConfig.timerInterval);
  mapConfig.timerInterval = setInterval(() => {
    updateTimer($, startTime);
  }, 1)
};
