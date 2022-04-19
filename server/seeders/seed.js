const db = require("../config/connection");
const { Expense } = require("../models");
const expenseSeeds = require("./expenseSeeds.json");
db.once("open", async () => {
  try {
    await Expense.deleteMany({});
    await Expense.insertMany(expenseSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
