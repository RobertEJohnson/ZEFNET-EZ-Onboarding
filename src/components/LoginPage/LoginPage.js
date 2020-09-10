import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DynamicButton from "../Buttons/DynamicButton";

const styles = (theme) => ({
    input: {
      '--dark-background':'#1c2447',
      '--focus-background':'#244d6e',
      color: 'white',
      border: '1px solid white',
      backgroundColor: 'var(--dark-background)',
      caretColor:'white',
      width: '400px',
      '&:focus':{
        backgroundColor: 'var(--focus-background)'
      },
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 40px var(--dark-background) inset',
        '-webkit-text-fill-color': 'white',
        '&:focus':{
          WebkitBoxShadow: '0 0 0 30px var(--focus-background) inset',
        }
      },
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
          email: this.state.email.toLowerCase(),
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
      <Grid item style={{ marginBottom: "150px", position: 'relative'}} align='center'>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div style={{ color: "white" }}>
          <h2 style={{ margin: "0px" }}>Welcome to ZEFNET EZ Onboarding! </h2>
          <h3 style={{ margin: "0px" }}>
            The first stop for a new ZEF Energy customer
          </h3>
        </div>
        <br />
          <TextField
            required
            variant="filled"
            label="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChangeFor("email")}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            inputProps={{
              className: classes.input, 
            }}
            InputLabelProps={{
              style:{color: 'white'}
            }}
          />
        <br/>
        <br/>
          <TextField
            required
            variant="filled"
            type="password"
            label="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor("password")}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            inputProps={{
              className: classes.input, 
            }}
            InputLabelProps={{
              style:{color: 'white'}
            }}
            onKeyDown={this.handleKeyDown}
          />
        <br/>
        <br/>
        <DynamicButton type='glow' text='Sign in' handleClick={this.login}/>
        <DynamicButton type='dark' text='New User?' 
          handleClick={()=>this.props.dispatch({ type: "SET_TO_REGISTER_MODE" })}
          />
      </Grid>
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
