import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText }from '@material-ui/core/';

const styles = theme => ({ 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    }
  })
  

class AddBreaker extends Component {
  state = {
    name: '',
    description: '',
    limit: '',
  };
  handleChange = (event) => {
    this.setState({ 
        ...this.state,
        [event.target.name]: event.target.value });
  };

  addSite = () => {
      //post new site to site table
      if (this.props.state.device.site.id){
        const postObject = {
            name: this.state.name,
            description: this.state.description,
            limit: this.state.limit,
            site_id: this.props.state.device.site.id,
        }
        console.log('posting new breaker:', postObject)
        if (postObject.site_id && postObject.name && postObject.limit)
            {this.props.dispatch({ type: "POST_BREAKER", payload: postObject });
            this.props.handleClose()
            } else {
                alert('Unable to add breaker. Have you filled all required fields?')
            }
      } else {
          alert('Oops! no site is currently selected. Please exit this field and select a site from the previous page!')
      }
  }

  render() {
     //const {classes} = this.props;
    return (
      <div>
        <Dialog style={{textAlign: 'center'}}
          title='Add a New Breakerf'
          open={this.props.open} 
          onClose={this.props.handleClose}>
          <h1 style={{padding: '15px 0px 0px 0px', margin: '0px'}}>Add a New Breaker</h1>
          <DialogContent style={{padding: '0px auto'}}>
            <DialogContentText>
              Please name the breaker in a way to provide quick and easy identification. 
              This should be indicating where an engineer would go to isolate or reboot the charger device manually.
            </DialogContentText>
            <TextField
              autoFocus
              required
              fullWidth
              variant = 'outlined'
              margin="dense"
              label="Breaker Name"
              name = 'name'
              value = {this.state.name}
              placeholder = "South East Utility Room: Panel 2B: Breaker 22/24"
              onChange = {this.handleChange}
            />
            <TextField
              required
              variant = 'outlined'
              margin="dense"
              label="Breaker Limit"
              type="number"
              fullWidth
              name = 'limit'
              value = {this.state.limit}
              onChange = {this.handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">Amps</InputAdornment>,
              }}
            />
            <h3 style={{margin:'10px 0px 5px 0px', padding: '0px'}}>
              If additional information is beneficial, please fill in the description field.
            </h3>
            <TextField
              fullWidth
              variant = 'outlined'
              margin="dense"
              label="Breaker Description"
              rows="4"
              name = "description"
              placeholder= "The South East Utility Room is located on the second floor across from the admin office.  The breaker panels are on the North wall."
              multiline
              value={this.state.description}
              onChange = {this.handleChange}
            />   
            <DialogContentText style={{marginTop: '5px'}}>
              You can complete this process multiple times for your selected site.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose}>
                Close
            </Button>
            <Button color="primary"
                onClick = {this.addSite}>
             Add Breaker
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
  
  AddBreaker.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(connect(mapStateToProps)(AddBreaker));