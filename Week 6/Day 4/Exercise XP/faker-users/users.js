const { faker } = require("@faker-js/faker");

const users = [];

function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    addressStreet: faker.location.streetAddress(),
    country: faker.location.country(),
  };

  users.push(user);
  return user;
}

async function promptAndAddUser() {
  const readline = require("node:readline/promises");
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const name = (await terminal.question("Name: ")).trim();
    const addressStreet = (await terminal.question("Street address: ")).trim();
    const country = (await terminal.question("Country: ")).trim();

    if (!name || !addressStreet || !country) {
      throw new Error("All fields are required.");
    }

    const user = { name, addressStreet, country };
    users.push(user);
    return user;
  } finally {
    terminal.close();
  }
}

module.exports = { users, addFakeUser, promptAndAddUser };