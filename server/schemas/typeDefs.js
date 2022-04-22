const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    expenses: [Expense]
  }

  type Expense {
    _id: ID
    title: String
    amount: Int
    createdAt: Date
  }

  type Query {
    expenses: [Expense]
  }
`;

module.exports = typeDefs;
