import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@material-ui/core/';

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
    limit: 0,
  };
  handleChange = (event) => {
    this.setState({ 
        ...this.state,
        [event.target.name]: event.target.value });
  };

  addSite = () => {
      //post new site to site table
      if (this.props.state.device.site){
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
     const {classes} = this.props;
    return (
      <div>
        <Dialog open={this.props.open} 
          onClose={this.props.handleClose}>
          <DialogTitle>Add A New Breaker</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The Breaker name field is an opportonity to provide identification for the breaker 
              to make it easy to find for those who may be charged with supporting the equiptment.
              If additional information is beneficial, please use the description field.
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
              autoFocus
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
                startAdornment: <InputAdornment position="start">kW</InputAdornment>,
              }}
            />
            <TextField
              autoFocus
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