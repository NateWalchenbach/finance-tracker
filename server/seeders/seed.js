const db = require("../config/connection");
const { Expense, User } = require("../models");
const expenseSeeds = require("./expenseSeeds.json");
const userSeeds = require("./userSeeds.json")
db.once("open", async () => {
  try {
    await Expense.deleteMany({});
    await Expense.insertMany(expenseSeeds);
    await User.insertMany(userSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
