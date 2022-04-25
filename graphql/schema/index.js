const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Expense {
    _id: ID!
    title: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdExpenses: [Expense!]
  }

  type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
  }

input ExpenseInput {
    title: String!
    price: Float!
    date: String!
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    expenses: [Expense!]!
    login (email: String!, password: String!) : AuthData!
}

type RootMutation {
    createExpense( expenseInput: ExpenseInput ): Expense
    createUser( userInput: UserInput ): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
