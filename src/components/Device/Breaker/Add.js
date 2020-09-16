import React, { Component } from 'react';
import {connect} from 'react-redux';
import{ Button, TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, Grid }from '@material-ui/core/';

const styles = theme => ({ 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    error:{
      backgroundColor: '#ef9a9a',
    }
})
  

class AddBreaker extends Component {
  state = {
    name: '',
    description: '',
    limit: '',
    alert1: false,
    alert2: false,
  };

  //input change handler
  handleChange = (event) => {
    this.setState({ 
        ...this.state,
        [event.target.name]: event.target.value });
  };

  handleClose1 = () =>{
    this.setState({
      ...this.state,
      alert1:false
    })
  }

  handleClose2 = () =>{
    this.setState({
      ...this.state,
      alert2:false
    })
  }

  
  addBreaker = () => {
      //post new breaker if a site id is associated with this breaker
      if (this.props.state.device.site.id){
        const postObject = {
            name: this.state.name,
            description: this.state.description,
            limit: this.state.limit,
            site_id: this.props.state.device.site.id,
        }
        if (postObject.site_id && postObject.name && postObject.limit)
            {this.props.dispatch({ type: "POST_BREAKER", payload: postObject });
            //reset state
            this.setState({
              name: '',
              description: '',
              limit: '',
              alert1: false,
              alert2: false,
            })
            this.props.handleClose()
            } else {
              this.setState({...this.state, alert1: true});
            }
      } else {
         this.setState({...this.state, alert2: true});
      }
  }


  render() {
     const {classes} = this.props;
    return (
      <div>
        <Dialog style={{textAlign: 'center'}}
          title='Add a New Breaker'
          open={this.props.open} 
          onClose={this.props.handleClose}>
          {/* Alert 1 visible if not all fields filled when add is clicked */}
          {this.state.alert1&&
            <Grid container direction = 'row' justify='center' alignContent='center'>
              <h2 className = {classes.error}>
              Unable to add breaker. Please pick a name and limit for your breaker.
                <Button onClick = {this.handleClose1}>OK</Button>
              </h2>
            </Grid>}
            {/* alert 2 visible if no site id exists to associate with this breaker (usually happens when user refreshes on breaker page) */}
            {this.state.alert2&&
            <Grid container direction = 'row' justify='center' alignContent='center'>
              <h2 className = {classes.error}>
              Oops! no site is currently selected. Please exit this field and select a site from the previous page!
                <Button onClick = {this.handleClose2}>OK</Button>
              </h2>
            </Grid>}
          <h1 style={{padding: '15px 0px 0px 0px', margin: '0px'}}>Add a New Breaker</h1>
          <DialogContent style={{padding: '0px auto'}}>
            <DialogContentText>
              Please name the breaker in a way to provide quick and easy identification. 
              This should indicate where an engineer would go to isolate or reboot the device manually.
            </DialogContentText>
            <TextField
              autoFocus
              required
              fullWidth
              variant = 'filled'
              margin="dense"
              label="Breaker Name"
              name = 'name'
              value = {this.state.name}
              placeholder = "South East Utility Room: Panel 2B: Breaker 22/24"
              onChange = {this.handleChange}
              inputProps={{
                maxLength: 50
              }}
            />
            <TextField
              required
              variant = 'filled'
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
              If additional information is beneficial,
               <br/>please fill in the description field below.
            </h3>
            <TextField
              fullWidth
              variant = 'filled'
              margin="dense"
              label="Breaker Description"
              rows="4"
              name = "description"
              placeholder= "The South East Utility Room is located on the second floor across from the admin office.  The breaker panels are on the North wall."
              multiline
              value={this.state.description}
              onChange = {this.handleChange}
              inputProps={{maxLength: 300}}
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
                onClick = {this.addBreaker}>
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