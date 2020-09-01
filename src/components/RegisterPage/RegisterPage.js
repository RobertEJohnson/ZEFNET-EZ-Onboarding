import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button, TextField, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';


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
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
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
          <Paper className = {classes.paper} elevation = {0}>
              <h1>Create User Account</h1>
              <div>
                  <TextField
                    variant = 'outlined'
                    className = {classes.input}
                    color = 'secondary'
                    name="first_name"
                    label ='*First Name'
                    value={this.state.first_name}
                    onChange={this.handleInputChangeFor('first_name')}
                  />
                  {/* {'\u00A0'} {'\u00A0'} */}
                  <TextField
                    variant = 'outlined'
                    color = 'secondary'
                    label = '*Last Name'
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleInputChangeFor('last_name')}
                  />
              </div>
              <div>
                  <TextField
                    variant = 'outlined'
                    color = 'secondary'
                    className = {classes.longField}
                    label = '*Email'
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChangeFor('email')}
                  />
              </div>
              <div>
                <TextField
                  variant = 'outlined'
                  color='secondary'
                  className = {classes.longField}
                  type="password"
                  name="password"
                  label = '*Password'
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
            </div>
              <div>
                  <TextField
                    variant = 'outlined'
                    color = 'secondary'
                    className = {classes.longField}
                    label = 'Primay Phone (optional)'
                    name='phone'
                    value={this.state.phone}
                    onChange={this.handleInputChangeFor('phone')}
                  />
              </div>
              <br/>
              <div>
                <Button onClick = {this.registerUser}
                  variant = 'contained'>
                  Create Account
                </Button>
              </div>
             </Paper>
            <div className = {classes.right}>
            <Button
              className= {classes.login}
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Have an Account?
            </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


