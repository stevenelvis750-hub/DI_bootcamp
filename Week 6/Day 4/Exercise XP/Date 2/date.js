function getMinutesLived(birthdate) {
  const birth = new Date(birthdate);

  if (Number.isNaN(birth.getTime())) {
    throw new Error("Birthdate must be a valid date, such as 1990-05-20.");
  }

  const minutesLived = Math.floor((Date.now() - birth.getTime()) / 60000);
  if (minutesLived < 0) {
    throw new Error("Birthdate cannot be in the future.");
  }

  return minutesLived;
}

module.exports = getMinutesLived;