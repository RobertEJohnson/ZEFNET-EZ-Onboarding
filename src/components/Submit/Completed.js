import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';

class Completed extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let centerText = {textAlign: 'center', color: 'white', fontFamily: 'inter, Open Sans, sans-serif', marginBottom: '.5rem'}
    return (
            <Grid item style={{marginBottom: '100px',  maxWidth: '600px'}} align='center' >
                    <h1 style={centerText}>Your Onboarding Package has been Submitted for Processing!</h1>
              <div style={{backgroundColor: '#1c2447', border: '1px solid white'}}>
               <p style={{textAlign:'center', color: 'white', fontSize: '15px', margin: '1rem 0'}}>
                        Thank you for submitting your onboarding package for review! 
                        <br/>We will email you at {this.props.reduxState.user.email}
                        <br/>our average response is 1-2 business days.
                        <br/>
                        <br/>
                        Thank you for choosing ZEF Energy! :)
                    </p>
              </div>
              <br/>
            </Grid>
    );
  }
}

// this allows us to use <App /> in index.js

const mapStateToProps = (reduxState) => ({
    reduxState,
  });
  

export default connect(mapStateToProps)(Completed);