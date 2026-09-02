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

displayNumbersDivisible();   // default 23
displayNumbersDivisible(3);
displayNumbersDivisible(45);


// Exercise 2: Shopping List
const stock = {
  banana: 6,
  apple: 0,
  pear: 12,
  orange: 32,
  blueberry: 1
};

const prices = {
  banana: 4,
  apple: 2,
  pear: 1,
  orange: 1.5,
  blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;

  for (let item of shoppingList) {
    if (item in stock && stock[item] > 0) {
      total += prices[item];

      // Bonus: decrease stock by 1
      stock[item]--;
    }
  }

  return total;
}

console.log("Total is:", myBill());
console.log(stock);


// Exercise 3: changeEnough
function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  let total = 0;

  for (let i = 0; i < amountOfChange.length; i++) {
    total += amountOfChange[i] * coinValues[i];
  }

  return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0])); // true
console.log(changeEnough(14.11, [2, 100, 0, 0])); // false
console.log(changeEnough(0.75, [0, 0, 20, 5])); // true


// Exercise 4: Hotel Cost
function hotelCost() {
  let nights;

  do {
    nights = Number(prompt("How many nights would you like to stay?"));
  } while (!Number.isInteger(nights) || nights <= 0);

  return nights * 140;
}

function planeRideCost() {
  let destination;

  do {
    destination = prompt("What is your destination?");
  } while (typeof destination !== "string" || destination.trim() === "");

  if (destination === "London") return 183;
  if (destination === "Paris") return 220;
  return 300;
}

function rentalCarCost() {
  let days;

  do {
    days = Number(prompt("How many days would you like to rent a car?"));
  } while (!Number.isInteger(days) || days <= 0);

  let total = days * 40;

  if (days > 10) {
    total *= 0.95;
  }

  return total;
}

function totalVacationCost() {
  const hotel = hotelCost();
  const plane = planeRideCost();
  const car = rentalCarCost();

  const total = hotel + plane + car;

  console.log("The car cost:", car);
  console.log("The hotel cost:", hotel);
  console.log("The plane tickets cost:", plane);
  console.log("The total cost:", total);

  return total;
}

totalVacationCost();