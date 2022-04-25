const Expense = require("../../models/expense");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const expenses = async (expenseIds) => {
  try {
    const expenses = await Expense.find({ _id: { $in: expenseIds } });
    return expenses.map((expense) => {
      return transformExpense(expense);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdExpenses: expenses.bind(this, user.createdExpenses),
    };
  } catch (err) {
    throw err;
  }
};
const transformExpense = (expense) => {
  return {
    ...expense._doc,
    _id: expense.id,
    date: dateToString(expense._doc.date),
    creator: user.bind(this, expense.creator),
  };
};

exports.user = user;
exports.expenses = expenses;
exports.transformExpense = transformExpense;
