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

  

class EditSite extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    error: false,
  };

  componentDidUpdate(previousProps) {
    // this will run every time the props change - 
    //and possibly in addition to this, so we need to check for prop changes
    if (this.props.site !== previousProps.site) {
        for (let i = 0; i <this.props.state.site.length; i++)
        {    
            this.setState({
            first_name: this.props.site.first_name,
            last_name: this.props.site.second_name,
            email:this.props.site.email,
            phone: this.props.site.phone,
            address:this.props.site.address,
            error:false,
            })   
        }
    }
}


  handleChange = (event) => {
    this.setState({ 
        ...this.state,
        [event.target.name]: event.target.value });
  };

  editSite = () => {
      //update existing site in site table
      const editObject = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          id:this.props.site.id,
          organization_id: this.props.state.organization.id,
      }
      // run the edit saga if required fields filled
      if (editObject.id && editObject.first_name && editObject.address && editObject.email)
        {this.props.dispatch({ type: "EDIT_SITE", payload: editObject });
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
          title='Edit Existing Host Site'>
          {this.state.error&&
            <Grid container direction = 'row' justify='center' alignContent='center'>
              <h2 className = {classes.error}>
              Unable to update site. Please fill all required fields.
                <Button onClick = {this.handleClose}>OK</Button>
              </h2>
            </Grid>}
         <h1 style={{padding: '15px 0px 10px 0px', margin: '0px'}}>Edit Host Site</h1>
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
              Updated site information will appear with all associated devices
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{textAlign: 'left'}}>
            <Button onClick={this.props.handleClose} style={{float: 'left'}}>
                Close Without Saving 
            </Button>
            <Button color="primary"
                onClick = {this.editSite}>
             Save Site
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
  
  EditSite.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(connect(mapStateToProps)(EditSite));