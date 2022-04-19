import { gql } from '@apollo/client';


export const QUERY_THOUGHTS = gql`
  query getExpenses {
    expenses {
        _id
        title
        amount
        createdAt
    }
  }
`;