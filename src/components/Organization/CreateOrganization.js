import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

class CreateOrganization extends Component {

    render() {
        let centerText = {textAlign: 'center', color: 'white', fontFamily: 'Crimson Text, Open Sans, sans-serif'}
        return (
            <Grid container justify='center' alignContent='center' alignItems='center' 
            style={{minHeight: '75vh', minWidth: '100vw', background: 'linear-gradient(360deg, #041E41, #004e92 70%)'}}>
                <Grid item xs={8} style={{ maxWidth: '1000px'}} justify='center' >
                        <h1 style={centerText}>Create an organization!</h1>
                </Grid>
            </Grid>
          
        );
      }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateOrganization);
