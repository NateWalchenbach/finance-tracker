const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  title: { type: String, required: true },
  amount: Number,
  createdAt: Date,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
