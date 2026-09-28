import { people } from "./data.js";

function calculateAverageAge(personList) {
  if (personList.length === 0) {
    return 0;
  }

  const totalAge = personList.reduce((total, person) => total + person.age, 0);
  return totalAge / personList.length;
}

console.log(`Average age: ${calculateAverageAge(people).toFixed(1)}`);