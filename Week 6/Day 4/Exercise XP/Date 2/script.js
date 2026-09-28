const getMinutesLived = require("./date");

const birthdate = "1990-05-20";
console.log(`You have lived ${getMinutesLived(birthdate).toLocaleString()} minutes.`);