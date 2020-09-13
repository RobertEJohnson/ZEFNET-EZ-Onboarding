import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Paper, withStyles, Dialog, DialogActions, DialogContent, DialogContentText, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
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
  },
  ReviewPage__buttonContainer:{
    marginTop: '1rem',
    position: 'relative',
    minWidth: '95%'
  },
  ReviewPage__flexContainer__titles: {
    fontWeight: 800,
  },
  ReviewPage__flexContainer__information: {
    fontWeight: 300,
  },
  ReviewPage__flexContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    width: '350px'
  },
  ReviewBuffer: {
    margin: '1rem 1.5rem 1rem 0',

  },
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

                <Grid item xs={12} align='center' style={{backgroundColor: 'lightgrey'}}>
                        <div className={classes.ReviewPage__flexContainer}>
                            <div className={classes.ReviewBuffer}>
                                <p className={classes.ReviewPage__flexContainer__titles}>
                                    Address:
                                </p>
                            </div>
                            <div>
                                <p className={classes.ReviewPage__flexContainer__information}>
                                    {this.props.state.device.site.address}
                                </p>
                            </div>
                        </div>                    
                </Grid>
                    
                <Grid item align='center' xs={12}>
                    <h2>Local Contact for Location</h2>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.ReviewPage__flexContainer}>
                        <div className={classes.ReviewBuffer}>
                            <p className={classes.ReviewPage__flexContainer__titles}>
                                First Name:
                                <br/>Second Name:
                                <br/>Phone Number:
                                <br/>Email Address:
                            </p>
                        </div>
                        <div>
                            <p className={classes.ReviewPage__flexContainer__information}>
                                {this.props.state.device.site.first_name}
                                <br/>{this.props.state.device.site.second_name}
                                <br/>{this.props.state.device.site.phone}
                                <br/>{this.props.state.device.site.email}
                            </p>
                        </div>
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
                    <div className={classes.ReviewPage__flexContainer}>
                        <div className={classes.ReviewBuffer}>
                            <p className={classes.ReviewPage__flexContainer__titles}>
                                Breaker Name:
                                <br/>Breaker Limit:
                                <br/>Breaker Description:
                            </p>
                        </div>
                        <div>
                            <p className={classes.ReviewPage__flexContainer__information}>
                                {this.props.state.device.breaker.name}
                                <br/>{this.props.state.device.breaker.limit}
                                <br/>{this.props.state.device.breaker.description}
                            </p>
                        </div>
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
                    <div className={classes.ReviewPage__flexContainer}>
                        <div className={classes.ReviewBuffer}>
                            <p className={classes.ReviewPage__flexContainer__titles}>
                                Device Type:
                            </p>
                        </div>
                        <div>
                            <p className={classes.ReviewPage__flexContainer__information}>
                                {this.props.state.device.type.name}
                            </p>
                        </div>
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
                    
                    <div className={classes.ReviewPage__flexContainer}>
                        <div className={classes.ReviewBuffer}>
                            <p className={classes.ReviewPage__flexContainer__titles}>
                                {this.props.state.device.serial2 ?
                                    <>Serial Number One:<br/>Serial Number Two:</>
                                    :
                                    <>Serial Number:</>
                                }
                            </p>
                        </div>
                        <div>
                            <p className={classes.ReviewPage__flexContainer__information}>
                                {this.props.state.device.serial.number}
                                {this.props.state.device.serial2 ?
                                    <><br/>{this.props.state.device.serial2}</>
                                    :
                                    <></>
                                }
                            </p>
                        </div>
                    </div> 
                </Grid>

                <Grid item align='center' xs={12}>
                <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.left}/> 
                        <h2>Additional Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceName'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.ReviewPage__flexContainer}>
                        <div className={classes.ReviewBuffer}>
                            <p className={classes.ReviewPage__flexContainer__titles}>
                                Charger Name:
                                <br/>Installation Date:
                            </p>
                        </div>
                        <div>
                            <p className={classes.ReviewPage__flexContainer__information}>
                                {this.props.state.device.name}
                                <br/>{this.props.state.device.date}
                            </p>
                        </div>
                    </div> 
                </Grid>

                <Grid item align='center' justify='center' className={classes.ReviewPage__buttonContainer}>
                    <div style={{position: 'absolute', float: 'left'}}>
                        <DynamicButton type='previous' text='Previous' linkURL='/deviceName'/>
                    </div>
                    <DynamicButton type='confirm' text='Add This Device' handleClick={this.saveDevice}/>  
                </Grid>
            </Paper> 
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