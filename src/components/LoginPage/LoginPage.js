import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoginPage.css";

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: 'white', 
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '80vh', 
    minWidth: '100vw', 
    background: 'linear-gradient(360deg, #041E41, #004e92 70%)',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: 'transparent',
    justify: 'center',
    margin: '0px',
    borderRadius: '5px',
    border: 'none',
    color: 'white'
    },

    longField:{
      width: '388px',
    },
    login:{
      color:'white',
      marginLeft: '30vw'
    },
})



class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="header">
          <h3>Welcome to the ZEFNET easy onboarding site! </h3>
          <h3>Let's set up those new chargers.</h3>
        </div>
        <form onSubmit={this.login}>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor("email")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            New User? Click here.
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
