function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  const numbers = [];

  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      numbers.push(i);
      sum += i;
    }
  }

  console.log(numbers.join(" "));
  console.log("Sum:", sum);
}

displayNumbersDivisible();
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// Exercise 2: Shopping List
const stock = {
  banana: 6,
  apple: 0,
  pear: 12,
  orange: 32,
  blueberry: 1,
};

const prices = {
  banana: 4,
  apple: 2,
  pear: 1,
  orange: 1.5,
  blueberry: 10,
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;

  for (let item of shoppingList) {
    if (Object.prototype.hasOwnProperty.call(stock, item) && stock[item] > 0) {
      total += prices[item];
      stock[item]--;
    }
  }

  return total;
}

console.log("Total is:", myBill());
console.log(stock);

// Exercise 3: changeEnough
function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.1, 0.05, 0.01];
  let total = 0;

  for (let i = 0; i < amountOfChange.length; i++) {
    total += amountOfChange[i] * coinValues[i];
  }

  return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));

// Exercise 4: Hotel Cost
function getInput(promptText, defaultValue) {
  if (typeof prompt === "function") {
    let value;
    do {
      value = prompt(promptText);
    } while (value === null || value === "");
    return value;
  }

  return defaultValue;
}

function hotelCost(nights = 3) {
  if (typeof prompt === "function") {
    let enteredNights;
    do {
      enteredNights = Number(getInput("How many nights would you like to stay?", 3));
    } while (!Number.isInteger(enteredNights) || enteredNights <= 0);
    return enteredNights * 140;
  }

  return nights * 140;
}

function planeRideCost(destination = "London") {
  if (typeof prompt === "function") {
    let enteredDestination;
    do {
      enteredDestination = getInput("What is your destination?", "London");
    } while (typeof enteredDestination !== "string" || enteredDestination.trim() === "");
    destination = enteredDestination;
  }

  if (destination === "London") return 183;
  if (destination === "Paris") return 220;
  return 300;
}

function rentalCarCost(days = 4) {
  if (typeof prompt === "function") {
    let enteredDays;
    do {
      enteredDays = Number(getInput("How many days would you like to rent a car?", 4));
    } while (!Number.isInteger(enteredDays) || enteredDays <= 0);
    days = enteredDays;
  }

  let total = days * 40;

  if (days > 10) {
    total *= 0.95;
  }

  return total;
}

function totalVacationCost(hotelNights = 3, destination = "London", rentalDays = 4) {
  const hotel = hotelCost(hotelNights);
  const plane = planeRideCost(destination);
  const car = rentalCarCost(rentalDays);

  const total = hotel + plane + car;

  console.log("The car cost:", car);
  console.log("The hotel cost:", hotel);
  console.log("The plane tickets cost:", plane);
  console.log("The total cost:", total);

  return total;
}

console.log("Running Vacation Cost example...");
totalVacationCost();