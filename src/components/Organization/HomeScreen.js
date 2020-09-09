import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, withStyles, GridList, GridListTile, GridListTileBar,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import zefNetPro from './zefnetpro.png';
import user from './zefUser.jpeg';
import review from './packageReview.jpeg';
import DynamicButton from '../Buttons/DynamicButton';


const styles = theme => ({ 
  root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
  },
  gridListTile: {
    color: 'rgba(255, 255, 255, 0.54)',
    maxWidth: '350px',
    maxHeight: '350px',
    margin: '20px 20px 0px 0px',
    border: '1px solid black',
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  greyscale: {
    filter: 'grayscale(100%)'
  },
  organizationName: {
    color: 'white',
    fontSize: '26px', 
    fontFamily: 'Titillium Web, sans-serif',
    padding: '0px auto',
    margin: '0px',
    '&:hover': {backgroundColor:'rgb(35, 40, 48)'}
  },
})


class HomeScreen extends Component {

  render() {
    const {classes} = this.props;
    return (
      <>
        <Grid container xs={12} alignItems='center'
          style={{backgroundColor: 'rgba(35, 40, 48, 0.699)', minHeight: '57px', minWidth: '100%', position: 'absolute', top: '0px', left: '0px'}}>

          <Grid item xs={12} style={{position:'absolute', left: '25px', minWidth: '97%'}}>
            <DynamicButton type='organization' text={this.props.state.organization.name} linkURL='/viewOrganization'/>
            <span style={{float: 'right'}}>
              <DynamicButton type='logOut' text='Log Out' handleClick={() => this.props.dispatch({ type: 'LOGOUT' })}/>
            </span>
          </Grid>

        </Grid>
        <div style={{maxWidth: '1200px'}}>             
            <GridList cellHeight={450}>
                <GridListTile className={classes.gridListTile} component={Link} to='/devicePrep'>
                    <img src={zefNetPro} alt="ZEFNET Pro Charger" className={classes.image} />
                    <GridListTileBar
                        title="Add a Device"
                        subtitle={this.props.state.allDevice.length + ' Devices'}
                    />
                </GridListTile>
                <GridListTile className={classes.gridListTile} component={Link} to='/addUser'>
                    <img src={user} alt="ZEFNET Pro Charger" className={classes.image} />
                    <GridListTileBar
                        title="Add a User"
                        subtitle="1 User"
                    />
                </GridListTile>
                <GridListTile className={classes.gridListTile} component={Link} to='/submit'>
                    <img src={review} alt="ZEFNET Pro Charger" className={classes.image, classes.greyscale}/>
                    <GridListTileBar
                        title="Review and Submit Onboarding Package"
                        subtitle="(Please Add a Device)"
                    />
                </GridListTile>
            </GridList>
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