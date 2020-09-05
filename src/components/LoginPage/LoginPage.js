import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import "./LoginPage.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    justify: "center",
    color: "white",
    fontFamily: "Crimson Text, Open Sans, sans-serif",
    minHeight: "80vh",
    minWidth: "100vw",
    background: "linear-gradient(360deg, #041E41, #004e92 70%)",
    textAlign: "center",
  },

  longField: {
    width: "380px",
  },
  new: {
    color: "white",
  },
});

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

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.login(event);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
          <div className="header">
            <h2>Welcome to ZEFNET EZ Onboarding! </h2>
            <h3>The first stop for a new ZEF Energy customer</h3>
          </div>
          <br />
          <div>
            <TextField
              className={classes.longField}
              required
              color="secondary"
              variant="outlined"
              label="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            />
          </div>
          <br />
          <div>
            <TextField
              className={classes.longField}
              required
              color="secondary"
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              onKeyDown={this.handleKeyDown}
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            />
          </div>
          <br />
          <div>
            <Button onClick={this.login} variant="contained">
              Sign in!
            </Button>
          </div>
          <center>
            <Button
              className={classes.new}
              onClick={() => {
                this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
              }}
            >
              New User? Click here.
            </Button>
          </center>
        </Grid>
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
