import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Paper, Button, withStyles, GridList, GridListTile, GridListTileBar, Divider} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import map from './7LLX9.jpg';
import breaker from './breaker2.jpg';
//import MinimalLogOutButton from '../LogOutButton/MinimalLogOutButton'
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '80vh', 
    background: 'white',
    textAlign: 'center',
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  gridListTile: {
    color: 'rgba(255, 255, 255, 0.54)',
    maxWidth: '300px',
    maxHeight: '300px',
    margin: '15px 15px 0px 0px'
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  greyscale: {
    filter: 'grayscale(100%)'
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

    render() {
      const {classes} = this.props;
      return (
          <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
          <div className = {classes.root} style={{maxWidth: '1000px'}}>
            <Paper className = {classes.paper}>
                <p>this.props.state.device</p>
                {JSON.stringify(this.props.state.device)}

                    <Grid item align='center'>
                    <h1>Let's make sure all this information is correct!</h1>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <Divider/>
                       <h2>Hosting Location</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.device.site.address}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
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
                        <br/>
                        <Divider/>
                        <h2>Breaker Information</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <div>
                            <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Breaker Name:{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem}>
                                {this.props.state.device.breaker}
                            </p>
                        </div>
                        <div>
                            <h3 className={classes.reviewItem}>Breaker Limit:{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem}>
                                {this.props.state.device.breaker}
                            </p>
                        </div>
                        <div>
                            <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Breaker Description:{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem}>
                                {this.props.state.device.breaker}
                            </p>
                        </div>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Device Type</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <div>
                            <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Device Type:{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem}>
                                {this.props.state.device.type}
                            </p>
                        </div>
                        <div>
                            <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Head Type (if pedestal):{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem} >
                                {this.props.state.device.head}
                            </p>
                        </div>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Device Information</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <div>
                            <h3 className={classes.reviewItem} style={{margin: '10px 0px'}}>Serial Number:{'\u00A0'}{'\u00A0'}</h3>
                            <p className={classes.reviewItem}>
                                {this.props.state.device.serial}
                            </p>
                        </div>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Additional Information</h2>
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
                            <Button variant ='contained'
                            component = {Link} to ="/deviceName">
                                <ChevronLeftIcon/> Previous
                            </Button>
                            <div className = {classes.grow}>{'\u00A0'}</div>
                            <Button variant = 'contained' color = 'primary'
                            onClick = {this.assignSite}
                            component = {Link} to ="/OrganizationHome">
                                <ChevronRightIcon/> Save Device
                            </Button>
                        
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