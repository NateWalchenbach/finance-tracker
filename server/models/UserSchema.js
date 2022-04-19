const { Schema, model } = require("mongoose");
const ExpenseSchema = require("./ExpenseSchema");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: { type: String, required: true, minlength: 5 },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
