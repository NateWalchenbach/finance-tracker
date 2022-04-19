import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Login from './pages/Login';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route 
              path="/" 
              element={[<NewExpense onAddExpense={addExpenseHandler} />, <Expenses items={expenses} />] }
            />
              
            <Route 
              path="/login" 
              element={ <Login />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

// Going to be root component
