import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText}from '@material-ui/core/';

const styles = theme => ({ 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    minorPadding: {
      padding: '0px 10px'
    },
    error:{
      backgroundColor: '#ef9a9a',
    }
  })

  

class AddSite extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    error: false,
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
      if (postObject.organization_id && postObject.first_name && postObject.address && postObject.email)
        {this.props.dispatch({ type: "POST_SITE", payload: postObject });
        this.props.handleClose()
        } else {
            //reveal error message
            this.setState({
              ...this.state,
              error:true,
            })
        }
  }
  
  handleClose = () =>{
    this.setState({
      ...this.state,
      error:false
    })
  }

  render() {
     const {classes} = this.props;
    return (
      <div>
        <Dialog style={{textAlign: 'center'}}
          open={this.props.open} 
          onClose={this.props.handleClose}
          title='Add A New Host Site'>
          {this.state.error&&
            <Grid container direction = 'row' justify='center' alignContent='center'>
              <h2 className = {classes.error}>
              Unable to add site. Please fill all required fields.
                <Button onClick = {this.handleClose}>OK</Button>
              </h2>
            </Grid>}
         <h1 style={{padding: '15px 0px 10px 0px', margin: '0px'}}>New Host Site</h1>
         <p style={{padding: '0px', margin: '0px', fontWeight: '500', fontSize: '16px'}}>Enter the location of the organization's charging device.</p>
          <DialogContent style={{marginTop: '0px', paddingTop: '0px'}}>
            <TextField
              autoFocus
              className={classes.minorPadding}
              required
              variant = 'filled'
              margin="dense"
              label='Host Site Address'
              type="address"
              fullWidth
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
            />
            <p style={{textAlign: 'left', margin: '0px 0px 15px 10px'}}>
              *Address does <strong>NOT</strong>  have to be your organization's primary address.
            </p>
              
              
   
            <h3 style={{margin:'5px', padding: '0px'}}>
              Primary Contact Information for Host Site
            </h3>
            <TextField
              className={classes.minorPadding}
              required
              fullWidth
              variant='filled'
              margin="dense"
              label="First Name"
              name='first_name'
              value={this.state.first_name}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.minorPadding}
              fullWidth
              variant='filled'
              margin="dense"
              label="Last Name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
            <TextField
            className={classes.minorPadding}
            variant='filled'
            margin="dense"
            label="Phone Number"
            type='tel'
            fullWidth
            name='phone'
            value={this.state.phone}
            onChange={this.handleChange}
          />
            <TextField  
              className={classes.minorPadding}
              required
              variant='filled'
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <DialogContentText style={{marginTop: '5px'}}>
              You may repeat this process if you have multiple sites.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{textAlign: 'left'}}>
            <Button onClick={this.props.handleClose} style={{float: 'left'}}>
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