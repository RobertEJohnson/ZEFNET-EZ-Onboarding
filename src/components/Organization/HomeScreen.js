import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, withStyles, Card,CardActionArea,CardMedia, GridListTileBar,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import zefNetPro from './zefnetpro.png';
import user from './zefUser.jpeg';
import review from './packageReview.jpeg';
import greyScaleReview from './packageReviewGreyscale.jpeg';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
  organizationName: {
    color: 'white',
    fontSize: '26px', 
    fontFamily: 'Titillium Web, sans-serif',
    padding: '0px auto',
    margin: '0px',
    '&:hover': {backgroundColor:'rgb(35, 40, 48)'}
  },
  simpleCard:{
    width: '300px',
    border: '1px solid black',
    margin: '0px 30px 25px 0px',
    cursor: 'default'
  },
  card: {
    transition: 'transform .2s ease-in',
    width: '300px',
    border: '1px solid black',
    margin: '0px 30px 25px 0px',
    boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028),0 12.5px 10px rgba(0, 0, 0, 0.035),0 22.3px 17.9px rgba(0, 0, 0, 0.042),0 41.8px 33.4px rgba(0, 0, 0, 0.05),0 100px 80px rgba(0, 0, 0, 0.07)',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 0 15px #c8ffff,-5px 0 20px #66fbfb, 5px 0 25px #049494',
      }
  },
  media: {
    height: '300px',
    width: '300px'
  },
})


class HomeScreen extends Component {

  
  render() {
    const {classes} = this.props;
    return (
      <>
        <Grid container alignItems='center'
          style={{backgroundColor: 'rgba(35, 40, 48, 0.699)', minHeight: '57px', minWidth: '100%', position: 'absolute', top: '0px', left: '0px'}}>

          <Grid item xs={12} style={{position:'absolute', left: '25px', minWidth: '97%'}}>
            <DynamicButton type='organization' text={this.props.state.organization.name} linkURL='/viewOrganization'/>
            <span style={{float: 'right'}}>
              <DynamicButton type='logOut' text='Log Out' handleClick={() => this.props.dispatch({ type: 'LOGOUT' })}/>
            </span>
          </Grid>
        </Grid>
        
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
              {/*Add Device Card*/}
              <Card className={classes.card}>
                <CardActionArea component={Link} to="/devicePrep" >
                  <CardMedia
                  image={zefNetPro}
                  alt="ZEFNET Pro Charger"
                  title="Add a Device" 
                  className={classes.media} />
                  <GridListTileBar
                      title="Add a Device"
                      subtitle={this.props.state.allDevice.length + ' Device(s)'}
                  />
                  </CardActionArea>
                </Card>

                {/*Add Users Card*/}
              <Card className={classes.card}>
              <CardActionArea component={Link} to="/addUser">
                <CardMedia
                image={user}
                alt="A Woman Laughing"
                title="Add a User" 
                className={classes.media} />
                <GridListTileBar
                  title="Add a User"
                  subtitle={this.props.state.zefUser.length + ' User(s)'}
                />
                </CardActionArea>
              </Card>

              {/*Review Card*/}
              {
                this.props.state.allDevice.length>0 ?
                    <Card className={classes.card}>
                      <CardActionArea component={Link} to="/submit">
                        <CardMedia
                        image={review}
                        alt="ZEFNET Pro Charger"
                        title="Add a Device" 
                        className={classes.media} />
                        <GridListTileBar
                          title="Review and Submit Onboarding Package"
                          subtitle='Ensure all Users and Devices Added before Clicking'
                        />
                        </CardActionArea>
                      </Card>
                      :
                      <Card className={classes.simpleCard}>
                        <CardActionArea>
                          <CardMedia
                          image={greyScaleReview}
                          alt="ZEFNET Pro Charger"
                          title="Add a Device" 
                          className={classes.media} />
                          <GridListTileBar
                            title="Please add a device before submitting"
                            subtitle='click left tile to add a device'
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