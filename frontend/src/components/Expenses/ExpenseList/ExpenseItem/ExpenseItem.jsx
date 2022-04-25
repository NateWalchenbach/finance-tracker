import React from "react";
import "./ExpenseItem.css";

const expenseItem = (props) => (
  <li key={props.expenseId} className="expenses__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>$19.85</h2>
    </div>
    <div>
      <button className="btn">View Details</button>
    </div>
  </li>
);

export default expenseItem;
