const { Expense, User } = require("../models");

const resolvers = {
  Query: {
    expenses: async () => {
      return Expense.find().sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
