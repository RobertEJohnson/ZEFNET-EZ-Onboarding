import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button, TextField, Paper} from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password && this.state.first_name && this.state.last_name) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Grid container direction = 'column' justify = 'center' alignItems = 'center'>
        <Grid item xs = {12} md = {6} lg = {5} xl = {4}>
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}
        <Paper >
            <h1>Create New User Account</h1>
            <div>
                <TextField
                  name="first_name"
                  label ='*First Name'
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                />
                <TextField
                  label = '*Last Name'
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                />
            </div>
            <div>
                <TextField
                  label = '*Email'
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                />
            </div>
            <div>
                <TextField
                  type="password"
                  name="password"
                  label = '*Password'
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
            </div>
              <div>
                  <TextField
                    label = 'Primay Phone (optional)'
                    name='phone'
                    value={this.state.phone}
                    onChange={this.handleInputChangeFor('phone')}
                  />
              </div>
              <br/>
              <div>
                <Button onClick = {this.registerUser}
                  variant = 'contained' color = 'primary'>
                  Create Account
                </Button>
              </div>
             </Paper>
            <div>
            <Button
              color = 'primary'
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Login
            </Button>
            </div>
          </Grid>
        </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

