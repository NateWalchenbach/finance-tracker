const db = require("../config/connection");
// const { mongoose } = require("mongoose");
const { Expense } = require("../models");
const expenseSeeds = require("./expenseSeeds.json");
// console.log(Expense);
db.once("open", async () => {
  // try {
  await Expense.deleteMany({});
  await Expense.insertMany(expenseSeeds);

  console.log("all done!");
  process.exit(0);
  // } catch (err) {
  //   throw err;
  // }
});
