import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@material-ui/core/';

const styles = theme => ({ 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
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
      //post new site to site table
      const postObject = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          organization_id: this.props.state.organization.id,
      }
      //console.log('posting new site:', postObject)
      if (postObject.organization_id && postObject.first_name && postObject.address && postObject.email)
        {this.props.dispatch({ type: "POST_SITE", payload: postObject });
        this.props.handleClose()
        } else {
            alert('Unable to add site. Have you filled all required fields?')
        }
  }

  render() {
     //const {classes} = this.props;
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
            <Button color="primary"
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