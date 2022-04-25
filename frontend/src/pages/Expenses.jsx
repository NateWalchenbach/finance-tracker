import React, { Component } from "react";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import ExpenseList from "../components/Expenses/ExpenseList/ExpenseList";
import "./Expenses.css";

class ExpensesPage extends Component {
  state = {
    creating: false,
    expenses: [],
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchExpenses();
  }

  startCreateExpensesHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;

    if (title.trim().length === 0 || price <= 0 || date.trim().length === 0) {
      return;
    }

    const expense = { title, price, date };
    console.log(expense);

    const requestBody = {
      query: `
          mutation {
            createExpense(expenseInput: {title: "${title}", price: ${price}, date: "${date}"}) {
              _id
              title
              date
              price
            }
          }
        `,
    };

    const token = this.context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        this.fetchExpenses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  fetchExpenses() {
    const requestBody = {
      query: `
          query {
            expenses {
              _id
              title
              date
              price
            }
          }
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const expenses = resData.data.expenses;
        this.setState({ expenses: expenses });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Expense"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="expenses-control">
            <p>Create an Expense!</p>
            <button className="btn" onClick={this.startCreateExpensesHandler}>
              Create Expense
            </button>
          </div>
        )}
        <ExpenseList expenses={this.state.expenses} />
      </React.Fragment>
    );
  }
}

export default ExpensesPage;
