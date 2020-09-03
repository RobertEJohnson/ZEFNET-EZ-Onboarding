import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@material-ui/core/';

const styles = theme => ({ 
    root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      color: theme.palette.text.secondary,
      fontFamily: 'Crimson Text, Open Sans, sans-serif',
      minHeight: '100vh', 
      minWidth: '100vw', 
      background: 'white',
      textAlign: 'center',
    },
    paper:{
      padding: theme.spacing(2),
      borderRadius: '5px',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    grow:{
        flexGrow: 1
    }
  })
  

class AddSite extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
  };
  handleChange = (event) => {
    this.setState({ 
        ...this.state,
        [event.target.name]: event.target.value });
  };

  addSite = () => {
      console.log(this.state)
      //post new site to site table

      this.props.handleClose()
  }

  render() {
     const {classes} = this.props;
    return (
      <div>
        <Dialog open={this.props.open}
          onClose={this.props.handleClose}>
          <DialogTitle>Add A New Host Site</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Information and Local contact details fof the site where the charger is installed.
              This doesn't have to be the same as your company's primary address.
            </DialogContentText>
            <TextField
              autoFocus
              required
              fullWidth
              variant = 'outlined'
              margin="dense"
              label="Name/ First Name"
              name = 'first_name'
              value = {this.state.first_name}
              onChange = {this.handleChange}
            />
            <TextField
              autoFocus
              fullWidth
              variant = 'outlined'
              margin="dense"
              label="Last Name"
              name = "last_name"
              value={this.state.last_name}
              onChange = {this.handleChange}
            />
            <TextField
              autoFocus
              required
              variant = 'outlined'
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              name = 'email'
              value = {this.state.email}
              onChange = {this.handleChange}
            />
            <TextField
              autoFocus
              variant = 'outlined'
              margin="dense"
              label="Phone Number"
              type="tel"
              fullWidth
              name = 'phone'
              value = {this.state.phone}
              onChange = {this.handleChange}
            />
            <TextField
              autoFocus
              required
              variant = 'outlined'
              margin="dense"
              label='Address'
              type="address"
              fullWidth
              name = 'address'
              value = {this.state.address}
              onChange = {this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose}>
                Close
            </Button>
            <Button onClick={this.props.handleClose} color="primary"
                onClick = {this.addSite}>
             Add Site
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state,
  });
  
  AddSite.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(connect(mapStateToProps)(AddSite));