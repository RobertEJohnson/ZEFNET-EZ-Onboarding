import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';


const styles = theme => ({ 
  resetMargin:{
      margin: '0'
  },
  headerZone: {
      fontFamily: 'Crimson Text, Open Sans, sans-serif',
      minWidth: '100%',
      position: 'relative'
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
})


class ViewOrganization extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_ORGANIZATION', payload: this.props.reduxState.user.id})
}
  

  render() {
    const {classes} = this.props;
    return (
        
        <Paper className = {classes.paper} elevation = {3} style={{minWidth: '425px'}}>
          <Grid container direction = 'column' alignContent = 'center' justify = 'center' style={{minWidth: '100%'}}>
          
            <Grid item align='center' style={{minWidth: '100%'}}>
                <div className = {classes.headerZone}>
                    <span style={{position: 'absolute', right: '10px', top: '8px'}}>
                      <Button variant='outlined' component={Link} to ="/editOrganization" size='small'>
                          <EditIcon/> Edit
                      </Button>
                    </span>
                    <h1 className={classes.resetMargin}>
                      {this.props.reduxState.organization.name}
                    </h1>
                    <h4 className={classes.resetMargin}>Organization Information</h4>
                </div>
                
            </Grid>
            <Grid item style={{minWidth: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', paddingTop:'12px'}}>
                  <div style={{minWidth: '30%',  padding: '0px 0px 0px 50px'}}>
                    <p>
                      Email:
                      <br/>Phone:
                      <br/>Address:
                    </p>
                  </div>
                  <div style={{minWidth: '70%'}}>
                    <p>
                      {this.props.reduxState.organization.email}
                      <br/>{this.props.reduxState.organization.phone}
                      <br/>{this.props.reduxState.organization.address}
                    </p>
                  </div>
                </div>
            </Grid>
            <center style={{marginTop: '20px'}}>
                <Button variant = 'contained'
                    component = {Link} to ="/organizationHome"
                    >
                    <HomeIcon/>
                    Home
                </Button>
            </center>
            </Grid>
        </Paper>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

ViewOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(ViewOrganization));


