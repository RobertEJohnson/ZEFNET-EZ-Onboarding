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
  }
})

class DeviceReview extends Component {

    render() {
      const {classes} = this.props;
      return (
          <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
          <div className = {classes.root} style={{maxWidth: '1000px'}}>
            <Paper className = {classes.paper}>
                {JSON.stringify(this.props.state)}

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
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Local Contact for Location</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Breaker Information</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Device Type</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Device Information</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    <Grid item align='center' xs={12}>
                        <br/>
                        <Divider/>
                       <h2>Additional Information</h2>
                    </Grid>

                    <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                        <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                        <p style={{display: 'inline-block'}}>
                            {this.props.state.site.address ? this.props.state.site.address : '6120 Westwood Parkway, St. Cloud, MN, 56303'}
                        </p>
                    </Grid>

                    
                    <Grid container direction = 'row' justify = 'center' alignContent = 'center'>
                            <Button variant ='contained'
                            component = {Link} to ="/OrganizationHome">
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