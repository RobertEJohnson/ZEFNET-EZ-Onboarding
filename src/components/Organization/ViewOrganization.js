import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    minHeight:'600px',
    color: 'white', 
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '75vh', 
    minWidth: '100vw', 
    background: 'linear-gradient(360deg, #041E41, #004e92 70%)',
  },

  headerZone: {
      border: '1px',
  }
})


class ViewOrganization extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_ORGANIZATION', payload: this.props.reduxState.user.id})
}
  

  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
          <Grid container direction = 'column' alignContent = 'center' justify = 'center'>
              <div className = {classes.headerZone}>
                <h1>Organization Information</h1>
              </div>
            <p>
            {JSON.stringify(this.props.reduxState.organization)}
            </p>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = reduxState => ({
  reduxState
});

ViewOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(ViewOrganization));


