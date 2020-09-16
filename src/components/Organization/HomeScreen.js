import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, withStyles, Card,CardActionArea,CardMedia, GridListTileBar,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import user from './Images/zefUser.jpeg';
import review from './Images/packageReview.jpeg';
import greyScaleReview from './Images/packageReviewGreyscale.jpeg';
import zefNetPro from '../Device/Images/zefpro.png'
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
  CardContainer__inactiveCard:{
    width: '300px',
    border: '1px solid black',
    margin: '0px 30px 25px 0px',
    cursor: 'default'
  },
  CardContainer__activeCard: {
    transition: 'transform .2s ease-in',
    width: '300px',
    border: '1px solid black',
    margin: '0px 30px 25px 0px',
    boxShadow: '0 22.3px 17.9px rgba(0, 0, 0, 0.042),0 41.8px 33.4px rgba(0, 0, 0, 0.05),0 100px 80px rgba(0, 0, 0, 0.07)',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 0 15px #c8ffff,-5px 0 20px #66fbfb, 5px 0 25px #049494',
      }
  },
  CardContainer__activeCard__image: {
    height: '300px',
    width: '300px'
  },
  CardContainer__inactiveCard__image: {
    height: '300px',
    width: '300px'
  },
  HomeTitle: {
    paddingTop: '40px',
    color: 'white',
    textAlign: 'center',
  },
  HomeSubTitle:{
    color: 'white',
    textAlign:'center',
    fontSize: '18px'
  },
  FlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  HomeNavBar: {
    backgroundColor: 'rgba(35, 40, 48, 0.699)',
    minHeight: '57px',
    minWidth: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px'
  },
  HomeNavBar__container:{
    position:'absolute',
    left: '25px',
    minWidth: '97%'
  },
  CardContainer:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem'
  }
})

//this component can be viewed at /organizationHome
class HomeScreen extends Component {
  //send user to /submit/completed component view if they have already submitted their onboarding app
  componentDidMount(){
    if(this.props.state.organization.status === 'submitted'){
      this.props.history.push('/completed')
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <>
      {/* Organization and Logout buttons */}

        <Grid container alignItems='center' className={classes.HomeNavBar}>
          <Grid item xs={12} className={classes.HomeNavBar__container}>
            <DynamicButton type='organization' text={this.props.state.organization.name} linkURL='/viewOrganization'/>
            <span style={{float: 'right'}}>
              <DynamicButton type='logOut' text='Log Out' handleClick={() => this.props.dispatch({ type: 'LOGOUT' })}/>
            </span>
          </Grid>
        </Grid>
        
        {/*Conditionally render Title message based upon number of added devices */}
        {
          this.props.state.allDevice.length < 1 ?
              <h1 className={classes.HomeTitle}>Please add your device(s) and adminstrative users</h1>
            :
            <>
              <h1 className={classes.HomeTitle}>Add any additional devices or adminstrative users</h1>
              <p className={classes.HomeSubTitle}>Once finished click Review and Submit Information</p>
            </>
        }
        
        {/*Flexbox Card Container */}
        <div className={classes.CardContainer}>
              {/*Add Device Card*/}
              <Card className={classes.CardContainer__activeCard}>
                <CardActionArea component={Link} to="/devicePrep" >
                  <CardMedia
                  image={zefNetPro}
                  alt="ZEFNET Pro Charger"
                  title="Add a Device" 
                  className={classes.CardContainer__activeCard__image} />
                  <GridListTileBar
                      title="Add a Device"
                      subtitle={
                        this.props.state.allDevice.length < 1 ?
                         '0 Devices currently added'
                        :
                        this.props.state.allDevice.length === 1 ?
                         '1 Device currently added'
                        :
                        this.props.state.allDevice.length + ' Devices currently added'
                      }
                  />
                  </CardActionArea>
                </Card>

              {/*Add Users Card*/}
              <Card className={classes.CardContainer__activeCard}>
              <CardActionArea component={Link} to="/addUser">
                <CardMedia
                image={user}
                alt="A Woman Laughing"
                title="Add a User" 
                className={classes.CardContainer__activeCard__image} />
                <GridListTileBar
                  title="Add a User"
                  subtitle={
                    this.props.state.zefUser.length < 1 ?
                     '0 Users currently added'
                    :
                    this.props.state.zefUser.length === 1 ?
                     '1 User currently added'
                    :
                    this.props.state.zefUser.length + ' Users currently added'
                  }
                />
                </CardActionArea>
              </Card>

              {/*Render Active/Inactive Review Card based on added devices*/}
              {
                this.props.state.allDevice.length>0 ?
                    <Card className={classes.CardContainer__activeCard}>
                      <CardActionArea component={Link} to="/submit">
                        <CardMedia
                        image={review}
                        alt="A colored file binder"
                        title="Review and Submit Information" 
                        className={classes['CardContainer__activeCard__image']} />
                        <GridListTileBar
                          title="Review and Submit Information"
                        />
                        </CardActionArea>
                      </Card>
                      :
                      <Card className={classes.CardContainer__inactiveCard}>
                        <CardActionArea>
                          <CardMedia
                          image={greyScaleReview}
                          alt="A colored file binder"
                          title="Review and Submit Information" 
                          className={classes.CardContainer__inactiveCard__image} />
                          <GridListTileBar
                            title="Review and Submit Information"
                            subtitle='No devices are currently added'
                          />
                          </CardActionArea>
                      </Card>
                }
          </div>
        </>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

HomeScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(HomeScreen));