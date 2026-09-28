const { addDays, format } = require("date-fns");

function displayDateFiveDaysFromNow() {
  const currentDate = new Date();
  const futureDate = addDays(currentDate, 5);
  const formattedDate = format(futureDate, "EEEE, MMMM do, yyyy 'at' h:mm a");

  console.log(`Five days from now: ${formattedDate}`);
}

module.exports = displayDateFiveDaysFromNow;