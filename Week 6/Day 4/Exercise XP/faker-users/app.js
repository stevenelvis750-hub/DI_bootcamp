const { users, addFakeUser, promptAndAddUser } = require("./users");

async function main() {
  addFakeUser();
  await promptAndAddUser();
  console.log("Users:", users);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});