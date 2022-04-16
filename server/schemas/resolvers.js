const { Expense, User } = require('../models');

export const resolvers = {
    Query: {
        expenses: async () => {
            return Expense.find().sort({ createdAt: -1  })
        },
    },
};