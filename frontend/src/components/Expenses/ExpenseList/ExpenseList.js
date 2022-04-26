import React from "react";
import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem/ExpenseItem";

const expenseList = (props) => {
  const expenses = props.expenses.map((expense) => {
    return (
      <ExpenseItem
        key={expense._id}
        expenseId={expense._id}
        title={expense.title}
        price={expense.price}
        date={expense.date}
      />
    );
  });
  return <ul className="expenses__list">{expenses}</ul>;
};
export default expenseList;
