import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Paper, withStyles, Dialog, DialogActions, DialogContent, DialogContentText, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'inter, Open Sans, sans-serif',
    minHeight: '80vh', 
    background: 'white',
    textAlign: 'center',
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  left:{
    width: '75px'
  },
  grow:{
    flexGrow: 1,
    minWidth: '100px'
  },
  reviewItem: {
    display: 'inline-block',
    padding: '0px',
    margin: '0px'
  }
})

class DeviceReview extends Component {
    state =  {
        open: false
    }

    saveDevice = () => {
        const postObject = {
            name: this.props.state.device.name,
            installation_date: this.props.state.device.date,
            serial_number: this.props.state.device.serial.number,
            serial_number2: this.props.state.device.serial2,
            type_id: this.props.state.device.type.id,
            breaker_id:this.props.state.device.breaker.id,
            org_id:this.props.state.organization.id,
            id: this.props.state.device.id,     
        };
        console.log('saving device:', postObject)
        // call saga that posts the new device if required fields filled
        if(postObject.name && postObject.installation_date
            && postObject.serial_number && postObject.type_id 
            && postObject.breaker_id)
        {   
            //post the new device, or update if navigated here from submit page
            if ( postObject.id ) {
                this.props.dispatch({ type: "UPDATE_DEVICE", payload: postObject });
            } else{
                this.props.dispatch({ type: "ADD_DEVICE", payload: postObject });        
            }
            this.props.dispatch({ type: "CLEAR_DEVICE" });
            this.props.history.push("/OrganizationHome");
        } else { this.setState({open: true}) }
    }

    handleClose = () => {
        this.setState({open: false});
      };

    render() {
      const {classes} = this.props;
      return (
          <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
              {/* Dialog runs if adding/saving device without all required info */}
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="missing-information"
                aria-describedby="missing-information-required-for-device"
                >
                    <DialogContent>
                        <DialogContentText id="missing-required-information-use-edit-buttons-to-add">
                            Oops, you have not filled all required fields for this device. 
                            Please click "edit" next to the empty field to go back and add
                            required information before saving this device.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
          <div className = {classes.root} style={{maxWidth: '1000px'}}>
            <Paper className = {classes.paper}>
                <Grid item align='center'>
                    <h1>Let's make sure all this information is correct!</h1>
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                    <div className = {classes.left}/>                  
                        <h2>Hosting Location</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/hostSelect'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                    <p style={{display: 'inline-block'}}>
                        {this.props.state.device.site.address}
                    </p>
                </Grid>

                <Grid item align='center' xs={12}>
                    <h2>Local Contact for Location</h2>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>First Name:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.site.first_name}
                        </p>
                    </div>
                    <div>
                        <h3 className={classes.reviewItem}>Second Name:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.site.second_name}
                        </p>
                    </div>
                    <div>
                        <h3 className={classes.reviewItem}>Phone Number:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.site.phone}
                        </p>
                    </div> 
                    <div>
                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Email:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.site.email}
                        </p>
                    </div>
                </Grid>
                
                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.left}/> 
                        <h2>Breaker Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/breakerSelect'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Breaker Name:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.breaker.name}
                        </p>
                    </div>
                    <div>
                        <h3 className={classes.reviewItem}>Breaker Limit:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.breaker.limit}Amps
                        </p>
                    </div>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Breaker Description:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.breaker.description}
                        </p>
                    </div>
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.left}/> 
                        <h2>Device Type</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceType'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Device Type:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.type.name}
                        </p>
                    </div>
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.left}/> 
                        <h2>Device Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceSerial'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div>
                        <h3 className={classes.reviewItem} style={{margin: '10px 0px'}}>Serial Number:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.serial.number}
                        </p>
                    </div>
                   {this.props.state.device.serial2 && 
                    <div>
                        <h3 className={classes.reviewItem} style={{margin: '10px 0px'}}> Second Serial Number:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.serial2}
                        </p>
                    </div>
                     }
                </Grid>

                <Grid item align='center' xs={12}>
                <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.left}/> 
                        <h2>Additional Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceName'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Charger Name:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem}>
                            {this.props.state.device.name}
                        </p>
                    </div>
                    <div>
                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Installation Date:{'\u00A0'}{'\u00A0'}</h3>
                        <p className={classes.reviewItem} >
                            {this.props.state.device.date}
                        </p>
                    </div>
                </Grid>

                
                <Grid container direction = 'row' justify = 'center' alignContent = 'center' style={{marginTop: '35px'}}>
                    <DynamicButton type='previous' text='Previous' linkURL='/deviceName'/>
                    <div className = {classes.grow}>{'\u00A0'}</div>
                    <DynamicButton type='save' text='Save Device' handleClick={this.saveDevice}/>
                </Grid> 
            </Paper>
          </div>  
          </Grid>
      );
    }
  }
  
  DeviceReview.propTypes = {
      classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
      state
  })
  
  export default withStyles(styles)(connect(mapStateToProps)(DeviceReview));