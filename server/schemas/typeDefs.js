const { gql } = require('apollo-server-express');

export  const typeDefs = gql`
    type User {
        _id: id
        name: String!
        email: String!
        password: String!
        expenses: [Expense]
    } 

    type Expense {
        _id: id
        title: String
        amount: Number
        date: String
    }
    
`