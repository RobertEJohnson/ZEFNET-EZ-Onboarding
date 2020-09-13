import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, 
  TextField, 
  Paper, 
  Dialog,
  DialogContent, 
  DialogActions, 
  DialogContentText,
  Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import DynamicButton from '../Buttons/DynamicButton'


const styles = theme => ({ 
  BottomBuffer:{
    marginBottom: '10px'
  },
  ButtonRightBuffer:{
    marginRight: '14px'
  },
  ButtonContainer:{
    marginTop: '.5rem',
    position: 'relative',
    maxWidth: '450px',
  },
  RegisterPage: {
    color: 'white',
    marginBottom: '100px',
    width: '450px'
  },
  Title: {
    fontSize: "30px",
    marginBottom: '1rem'
  },
  TextField: {
    width: '400px',
    '--text-color':'#fff',
    '--dark-background':'#1c2447',
    '--focus-background':'#244d6e',
    color: 'var(--text-color)',
    border: '1px solid var(--text-color)',
    backgroundColor: 'var(--dark-background)',
    caretColor:'var(--text-color)',
    '&:focus':{
      backgroundColor: 'var(--focus-background)'
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 40px var(--dark-background) inset',
      '-webkit-text-fill-color': 'var(--text-color)',
      '&:focus':{
        WebkitBoxShadow: '0 0 0 30px var(--focus-background) inset',
      }
    },
  },
  ShortTextField:{
    width: '193px',
    '--text-color':'#fff',
    '--dark-background':'#1c2447',
    '--focus-background':'#244d6e',
    color: 'var(--text-color)',
    border: '1px solid var(--text-color)',
    backgroundColor: 'var(--dark-background)',
    caretColor:'var(--text-color)',
    '&:focus':{
      backgroundColor: 'var(--focus-background)'
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 40px var(--dark-background) inset',
      '-webkit-text-fill-color': 'var(--text-color)',
      '&:focus':{
        WebkitBoxShadow: '0 0 0 30px var(--focus-background) inset',
      }
    },
  },

})


class RegisterPage extends Component {
  state = {
    open: false,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    confirm_password:''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password && this.state.first_name && this.state.last_name) {
      if (this.state.password === this.state.confirm_password){
        const lowerEmail = this.state.email.toLowerCase();
        this.props.dispatch({
            type: 'REGISTER',
            payload: {
              email: lowerEmail,
              password: this.state.password,
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              phone: this.state.phone,
            }
         });
         this.props.history.push("/home");
     } else {
       //open error dialog for password mismatch
       this.setState({...this.state, open: true})  
      }
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };


  render() {
    const {classes} = this.props;
    return (
          <Grid item align='center' className={classes.RegisterPage}>
          <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="password-missmatch"
                aria-describedby="make-sure-passwords-match"
                >
                    <DialogContent>
                        <DialogContentText id="make-sure-passwords-match">
                            Oops! Passwords don't match!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        OK
                    </Button>
                    </DialogActions>
              </Dialog>
            {this.props.errors.registrationMessage && (
              <h2 className="alert" role="alert">{this.props.errors.registrationMessage}</h2>
            )}
              <h1 className={classes.Title}>Create User Account</h1>
              <TextField
                required
                variant = 'filled'
                className={classes.ButtonRightBuffer}
                name="first_name"
                label ='First Name'
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
                InputProps={{classes: {root: classes.ShortTextField}}}
                inputProps={{className: classes.ShortTextField}}
                InputLabelProps={{style:{color: 'white'}}}
              />
              <TextField
                required
                variant = 'filled'
                className={classes.BottomBuffer}
                label = 'Last Name'
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
                InputProps={{classes: {root: classes.ShortTextField}}}
                inputProps={{className: classes.ShortTextField}}
                InputLabelProps={{style:{color: 'white'}}}
              />
              <br/>
              <TextField
                required
                variant = 'filled'
                className={classes.BottomBuffer}
                label = 'Email'
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
                InputProps={{classes: {root: classes.TextField}}}
                inputProps={{className: classes.TextField}}
                InputLabelProps={{style:{color: 'white'}}}
              />
            <br/>
            <TextField
              required
              variant = 'filled'
              className={classes.BottomBuffer}
              type="password"
              name="password"
              label = 'Password'
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              required
              variant = 'filled'
              className={classes.BottomBuffer}
              type="password"
              name="confirm_password"
              label = 'Confirm Password'
              value={this.state.confirm_password}
              onChange={this.handleInputChangeFor('confirm_password')}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              variant = 'filled'
              className={classes.BottomBuffer}
              label = 'Primary Phone (optional)'
              name='phone'
              type = 'tel'
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <Grid item align='center' justify='center' className={classes.ButtonContainer}>
            <DynamicButton type='glow' handleClick={this.registerUser} 
                text='Create Account!'/>
              <DynamicButton type='dark' handleClick={()=>this.props.dispatch({type:"SET_TO_LOGIN_MODE"})}
                text='Existing User?'/>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


