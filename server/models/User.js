const mongoose = require("mongoose");
const Schema = mongoose.Schema;

import { ExpenseSchema } from "./Expense";

export const UserSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  expenses: [ExpenseSchema],
});
