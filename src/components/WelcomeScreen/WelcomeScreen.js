import React, { Component } from 'react';
import {Grid, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton';
import { connect } from "react-redux";

const styles = theme => ({ 
    container: {
      maxWidth: '550px', 
      marginBottom: '100px'
    },
    informationContainer: {
      backgroundColor: '#1c2447',
      border: '1px solid white'
    },
    title: {
      textAlign: 'center',
      color: 'white',
      fontFamily: 'inter Open Sans, sans-serif'
    },
    pStyle: {
      textAlign:'center',
      color: 'white',
      fontSize: '15px'
    },
    requirementsUL:{
      textAlign: 'left', 
      display: 'inline-block',
      color: 'white',
      fontSize: '15px',
    },
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
              <h1 className={classes.title}>Welcome to the ZEFNET EZ onboarding site!</h1>
              <div className={classes.informationContainer}>
               <p className={classes.pStyle}>
                        Congratulations on installing your new ZEF charging devices! 
                        <br/>To fully onboard you into our system we will be collecting the following:</p>
                        <div>
                          <ul className={classes.requirementsUL}>
                            <li>Organization information</li>
                            <li>Device information</li>
                            <li>Installation location(s)</li>
                            <li>Device adminstrator information</li>
                          </ul>
                        </div>
                      <p className={classes.pStyle}>
                        We'll let you know what we need every step of the way. :)
                    </p>
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