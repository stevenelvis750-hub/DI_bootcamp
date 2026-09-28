function getTimeUntilNewYear() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const secondsLeft = Math.floor((newYear - now) / 1000);
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const time = [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");

  return `January 1 is in ${days} days and ${time}.`;
}

module.exports = getTimeUntilNewYear;