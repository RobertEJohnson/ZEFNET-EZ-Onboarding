import React, { Component } from 'react';
import {Grid, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

class WelcomeScreen extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let centerText = {textAlign: 'center', color: 'white', fontFamily: 'Crimson Text, Open Sans, sans-serif'}
    return (
        <Grid container justify='center' alignContent='center' alignItems='center' 
            style={{minHeight: '75vh', minWidth: '100vw', background: 'linear-gradient(360deg, #041E41, #004e92 70%)'}}>
            <Grid item xs={8} style={{ maxWidth: '1000px'}} justify='center' >
                    <h1 style={centerText}>Welcome to the ZEFNET EZ onboarding site!</h1>
                    <p style={centerText}>
                        We are going to collect some information about your ogranization,
                        device(s), and device adminstrators. <br/> We'll let you know what we
                        need every step of the way. :)
                        <br/>
                        <br/>
                        <Link to="/createOrganization">
                            <Button variant='contained' style={{color: '#006dcc', backgroundColor: 'white'}}>
                                Let's Get Started
                            </Button>
                        </Link>
                    </p>
            </Grid>
        </Grid>
      
    );
  }
}

// this allows us to use <App /> in index.js
export default (WelcomeScreen);