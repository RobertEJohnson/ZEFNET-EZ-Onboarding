import React, { Component } from 'react';
import {Grid, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

class WelcomeScreen extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let centerText = {textAlign: 'center', color: 'white', fontFamily: 'Crimson Text, Open Sans, sans-serif'}
    return (
            <Grid item xs={8} style={{ maxWidth: '1000px', marginBottom: '100px'}} align='center' >
                    <h1 style={centerText}>Welcome to the ZEFNET EZ onboarding site!</h1>
              <div style={{backgroundColor: '#1c2447', border: '1px solid white'}}>
               <p style={{textAlign:'center', color: 'white', fontSize: '15px'}}>
                        Congratulations on installing your new ZEF charging devices! 
                        <br/>To be fully entered into our system we will be collecting the following:
                        <div style={{textAlign: 'center'}}>
                          <ul style={{ textAlign: 'left', display: 'inline-block'}}>
                            <li>Organization information</li>
                            <li>Device information</li>
                            <li>Installation location(s)</li>
                            <li>Device adminstrator information</li>
                          </ul>
                        </div>
                        
                        We'll let you know what we need every step of the way. :)
                    </p>
              </div>
              <br/>
              <Button variant='contained' style={{color: '#006dcc', backgroundColor: 'white'}}
                  component = {Link} to ="/createOrganization">
                  Let's Get Started
              </Button>
            </Grid>
    );
  }
}

// this allows us to use <App /> in index.js
export default (WelcomeScreen);