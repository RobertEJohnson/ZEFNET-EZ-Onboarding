import React, { Component } from "react";
import { connect } from "react-redux";
import{Grid, Button, TextField, } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';

import "./LoginPage.css";

const styles = theme => ({ 
  input: {
    color: 'white',
    border: `1px solid white`,
    backgroundColor: '#1c2447',
    backgroundColor: '#243353',
    outline: `1px solid transparent`,// we use a transparent outline here so the component doesn't move when focused
    },
    longField:{
      width: '380px',
    },
    whiteText:{
      color: 'white',
      backgroundColor: '#1c2447',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: '#243953',
      }
    }
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
    const {classes} = this.props;
    return (
      <Grid item align='center' style={{marginBottom: '150px'}}>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div style={{color:'white'}}>
          <h2>Welcome to ZEFNET EZ Onboarding! </h2>
          <h3>The first stop for a new ZEF Energy customer</h3>
        </div>
        <br/>
          <div>
              <TextField
                className = {classes.longField}
                required
                variant = 'outlined'
                label = 'Email Address'
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor("email")}
                InputProps={{
                  classes: {
                    root: classes.input,
                  }
                }}
                InputLabelProps={{
                  style: { color: '#fff' }
                }}
              />
          </div>
          <br/>
          <div>
              <TextField
                className = {classes.longField}
                required
                variant = 'outlined'
                type="password"
                label = 'Password'
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
                InputProps={{
                  classes: {
                    root: classes.input,
                  }
                }}
                InputLabelProps={{
                  style: { color: '#fff' }
                }}
              />
          </div>
          <br/>
          <div>
            <Button onClick = {this.login}
            variant = 'contained'
            style={{color: '#006dcc', backgroundColor: 'white', marginLeft: '90px'}}
            >
             Sign in!
            </Button>
            <Button className = {classes.whiteText} style={{float: 'right'}}
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            New User? 
          </Button>
          </div>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));