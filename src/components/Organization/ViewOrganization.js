import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';


const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: 'white', 
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '75vh', 
    minWidth: '100vw', 
    background: 'linear-gradient(360deg, #041E41, #004e92 70%)',
  },
  topHead:{
      marginTop: '5px'
  },
  headerZone: {
      borderStyle: 'solid',
      textAlign: 'center',
      fontFamily: 'Crimson Text, Open Sans, sans-serif',
      padding: theme.spacing(1),
      paddingTop: '0px',
  },
  edit: {
      color: '#f5f5f5',
      borderColor: '#f5f5f5'
  },
  details: {
    marginLeft: '8vw',
    marginRight: '8vw',
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
          <br/>
          <Grid container direction = 'column' alignContent = 'center' justify = 'center'>
              <Grid item xs = {12} sm = {10} md = {8} lg = {6}>
                <div className = {classes.headerZone}>
                    <h1 className = {classes.topHead}>Organization Information</h1>
                    <i>This is the primary information for your company.
                        <br/>
                        It doesn't need to be the address that the chargers are located.
                    </i>
                    <br/>
                </div>
            </Grid>
            <Grid item xs = {12} sm = {10} md = {8} lg = {6} >
                <div className = {classes.details}>
                    <h2> {this.props.reduxState.organization.name}</h2>
                    <h3>{this.props.reduxState.organization.email}</h3>
                    <i>{this.props.reduxState.organization.phone}</i>
                    <br/>
                    <p>{this.props.reduxState.organization.address}</p>
                </div>
            </Grid>
            <br/>
            <center>
                <Button className = {classes.edit} 
                    variant = 'outlined'
                    component = {Link} to ="/editOrganization"
                     >
                    <EditIcon/>
                    Edit Organization
                </Button>
                <br/>
                <br/>
                <Button variant = 'contained' 
                    component = {Link} to ="/homeScreen"
                    >
                    <HomeIcon/>
                    Home
                </Button>
            </center>
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


