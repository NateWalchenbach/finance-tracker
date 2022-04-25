import React from "react";
import "./ExpenseItem.css";

const expenseItem = (props) => (
  <li key={props.expenseId} className="expenses__list-item">
    {props.title}
  </li>
);

export default expenseItem;
