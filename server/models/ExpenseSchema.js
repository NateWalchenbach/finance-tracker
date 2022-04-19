const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  id: Number,
  title: String,
  amount: Number,
  createdAt: Date,
});

module.exports = ExpenseSchema;
