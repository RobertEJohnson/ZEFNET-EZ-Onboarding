import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({
  ViewOrgPage:{
    color:'white',
    fontSize: '17px',
    marginBottom: '100px'
  },
  ViewOrgPage__title: {
    marginBottom: '0',
    textAlign: "center",
    fontFamily: "inter, Open Sans, sans-serif",
    margin: '0',
    padding: '0px'
  },
  ViewOrgPage__subTitle: {
    fontWeight: 600,
  },
  ViewOrgPage__flexContainer__titles: {
    fontWeight: 600,
  },
  ViewOrgPage__flexContainer__information: {
    fontWeight: 300,
  },
  ViewOrgPage__flexContainer: {
    display: 'flex',
    flexDirection: 'row', 
    textAlign: 'left',
    margin: '1rem 0'
  },
  LargeRightBuffer: {
    marginRight: '1.5rem'
  },
  ViewOrgPage__buttonContainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    maxWidth: '180px',
    marginTop: '1.5rem'
  }
})


class ViewOrganization extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_ORGANIZATION', payload: this.props.reduxState.user.id})
}
  

  render() {
    const {classes} = this.props;
    return (
          <Grid item align='center' className={classes.ViewOrgPage}>
            <h1 className={classes.ViewOrgPage__title}>{this.props.reduxState.organization.name}</h1>
            <p className={classes.ViewOrgPage__subTitle}>Organization Information</p>
              <div className={classes.ViewOrgPage__flexContainer}>
                  <div className={classes.LargeRightBuffer}>
                    <p className={classes.ViewOrgPage__flexContainer__titles}>
                      Email:
                      <br/>Phone:
                      <br/>Address:
                    </p>
                  </div>
                  <div>
                    <p className={classes.ViewOrgPage__flexContainer__information}>
                      {this.props.reduxState.organization.email}
                      <br/>{this.props.reduxState.organization.phone}
                      <br/>{this.props.reduxState.organization.address}
                    </p>
                  </div>
              </div>
              <div className={classes.ViewOrgPage__buttonContainer}>
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


