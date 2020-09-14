import React, { Component } from 'react';
import {Grid, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton';
import {HomeWorkTwoTone, EvStationTwoTone, RoomTwoTone, AccountCircleTwoTone} from '@material-ui/icons'
import { connect } from "react-redux";

const styles = theme => ({
    container: {
      maxWidth: '600px', 
      marginBottom: '100px',
      color: 'white',
    },
    informationContainer: {
      padding: '.5rem 0',
      maxWidth: '530px',
      backgroundColor: '#1c2447',
      border: '1px solid white',
      textAlign: 'center',
      fontSize: '15px',
    },
    title: {
      textAlign: 'center',
      fontFamily: 'inter Open Sans, sans-serif',
      marginBottom: '1rem'
    },
    requirementsUL:{
      padding: '.5rem 0',
      textAlign: 'left', 
      display: 'inline-block',
      listStyle: 'none'
    },
    SvgIcon:{
      transform: 'translate(0px, 5px)',
    }
  })

class WelcomeScreen extends Component {

  componentDidMount(){
    //push user to organizationHome instead if the've already added org info
    if (this.props.reduxState.organization.id) {
      this.props.history.push("/organizationHome");
    } 
  }

  componentDidUpdate(previousProps){
    if (previousProps.reduxState.organization.id !== this.props.reduxState.organization.id){
      if (this.props.reduxState.organization.id) {
        this.props.history.push("/organizationHome");
       } 
    }
  }

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    const {classes} = this.props;
    return (
            <Grid item className={classes.container} align='center' >
              <h1 className={classes.title} classes='BottomBuffer'>Welcome to the ZEFNET EZ onboarding site!</h1>
              <div className={classes.informationContainer}>
                  Congratulations on installing your new ZEF charging devices! 
                  <br/>
                  To be fully entered into our system we will be collecting the following:
                  <div style={{marginLeft: '30px'}}>
                    <ul className={classes.requirementsUL}>
                      <li>
                        <HomeWorkTwoTone className={classes.SvgIcon}/> Organization information
                      </li>
                      <li>
                        <EvStationTwoTone className={classes.SvgIcon}/> Device information
                      </li>
                      <li>
                        <RoomTwoTone className={classes.SvgIcon}/> Installation location(s)
                      </li>
                      <li>
                        <AccountCircleTwoTone className={classes.SvgIcon}/> Device adminstrator information
                      </li>
                    </ul>
                  </div> 
                  We'll let you know what we need every step of the way. :)
              </div>
              <br/>
              <DynamicButton type='glow' linkURL="/createOrganization" text="Let's Get Started"/>
            </Grid>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
});

WelcomeScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(WelcomeScreen));