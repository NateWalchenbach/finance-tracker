import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/Auth";
import ExpensesPage from "./pages/Expenses";
import MainNavigation from "./components/Navigation/MainNavigation";
import "./App.css";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId,
    });
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null,
    });
  };
  render() {
    return (
      <Router>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {this.state.token && (
                  <Route path="/" element={<Navigate replace to="/auth" />} />
                )}
                {this.state.token && (
                  <Route
                    path="/"
                    element={<Navigate replace to="/expenses" />}
                  />
                )}
                {this.state.token && (
                  <Route
                    path="/auth"
                    element={<Navigate replace to="/expenses" />}
                  />
                )}
                {!this.state.token && (
                  <Route path="/auth" element={<AuthPage />} />
                )}
                <Route path="/expenses" element={<ExpensesPage />} />
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
