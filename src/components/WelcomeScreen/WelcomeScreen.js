import React, { Component } from 'react';
import {Grid, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

class WelcomeScreen extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let centerText = {textAlign: 'center', color: 'white', fontFamily: 'Crimson Text, Open Sans, sans-serif'}
    return (
            <Grid item xs={8} style={{ maxWidth: '1000px'}}  >
                    <h1 style={centerText}>Welcome to the ZEFNET EZ onboarding site!</h1>
                    <p style={centerText}>
                        We are going to collect some information about your ogranization,
                        device(s), and device adminstrators. <br/> We'll let you know what we
                        need every step of the way. :)
                        <br/>
                        <br/>
                        <Button variant='contained' style={{color: '#006dcc', backgroundColor: 'white'}}
                            component = {Link} to ="/createOrganization">
                            Let's Get Started
                        </Button>
                    </p>
            </Grid>
    );
  }
}

// this allows us to use <App /> in index.js
export default (WelcomeScreen);