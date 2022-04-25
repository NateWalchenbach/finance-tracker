const Expense = require("../../models/expense");
const { dateToString } = require("../../helpers/date");
const { transformExpense } = require("./merge");
const User = require("../../models/user");

module.exports = {
  expenses: async () => {
    try {
      const expenses = await Expense.find();
      return expenses.map((expense) => {
        return transformExpense(expense);
      });
    } catch (err) {
      throw err;
    }
  },
  createExpense: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const expense = new Expense({
      title: args.expenseInput.title,
      price: +args.expenseInput.price,
      date: dateToString(args.expenseInput.date),
      creator: req.userId,
    });
    let createdExpense;
    try {
      const result = await expense.save();
      createdExpense = transformExpense(result);
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("Creator not found");
      }
      creator.createdExpenses.push(expense);
      await creator.save();

      return createdExpense;
    } catch (err) {
      throw err;
    }
  },
};
