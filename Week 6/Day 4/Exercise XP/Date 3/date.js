const holidays = [
  { name: "New Year's Day", month: 0, day: 1 },
  { name: "Valentine's Day", month: 1, day: 14 },
  { name: "St. Patrick's Day", month: 2, day: 17 },
  { name: "Independence Day", month: 6, day: 4 },
  { name: "Halloween", month: 9, day: 31 },
  { name: "Christmas Day", month: 11, day: 25 },
];

function formatCountdown(milliseconds) {
  const secondsLeft = Math.floor(milliseconds / 1000);
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const time = [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");

  return `${days} days and ${time}`;
}

function getTodayAndNextHoliday() {
  const now = new Date();
  const upcomingHolidays = holidays
    .map((holiday) => {
      let date = new Date(now.getFullYear(), holiday.month, holiday.day);
      if (date <= now) {
        date = new Date(now.getFullYear() + 1, holiday.month, holiday.day);
      }
      return { ...holiday, date };
    })
    .sort((first, second) => first.date - second.date);
  const nextHoliday = upcomingHolidays[0];

  return `Today is ${now.toLocaleDateString()}. The next holiday is ${nextHoliday.name} (${nextHoliday.date.toLocaleDateString()}) in ${formatCountdown(nextHoliday.date - now)}.`;
}

module.exports = getTodayAndNextHoliday;