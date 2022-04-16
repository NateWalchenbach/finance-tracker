const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const ExpenseSchema = new Schema({
  id: Number,
  title: String,
  amount: Number,
  date: Date,
});
