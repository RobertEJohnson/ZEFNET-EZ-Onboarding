import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({
  ViewOrganizationPage:{
    color:'white',
    fontSize: '17px',
    marginBottom: '100px'
  },
  Title: {
    marginBottom: '0',
    textAlign: "center",
    fontFamily: "inter, Open Sans, sans-serif",
    margin: '0',
    padding: '0px'
  },
  DetailsOuterContainer: {
    display: 'flex',
    flexDirection: 'row', 
    textAlign: 'left',
    margin: '1rem 0'
  },
  RightBuffer: {
    marginRight: '1rem'
  }
})


class ViewOrganization extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_ORGANIZATION', payload: this.props.reduxState.user.id})
}
  

  render() {
    const {classes} = this.props;
    return (
          <Grid item align='center' className={classes.ViewOrganizationPage}>
            <h1 className={classes.Title}>{this.props.reduxState.organization.name}</h1>
            <em>Organization Information</em>
              <div className={classes.DetailsOuterContainer}>
                  <div className={classes.RightBuffer}>
                    <p>
                      Email:
                      <br/>Phone:
                      <br/>Address:
                    </p>
                  </div>
                  <div>
                    <p>
                      {this.props.reduxState.organization.email}
                      <br/>{this.props.reduxState.organization.phone}
                      <br/>{this.props.reduxState.organization.address}
                    </p>
                  </div>
              </div>
              <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', maxWidth: '180px'}}>
                <DynamicButton type='edit-glow' text='Edit' linkURL='/editOrganization'/>
                <DynamicButton type='home-glow' text='Home' linkURL='/organizationHome'/>
              </div>
            
        </Grid>
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


