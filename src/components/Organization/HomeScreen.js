import React, { Component } from 'react';
import {Grid, Button, withStyles, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import zefNetPro from './zefnetpro.png';
import user from './zefUser.jpeg'
import review from './packageReview.jpeg'




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
    margin: '20px 20px 0px 0px'
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  greyscale: {
    filter: 'grayscale(100%)'
  }
})


class HomeScreen extends Component {

  render() {
    const {classes} = this.props;
    return (
        <Grid container direction='row' justify='center' alignContent='center' alignItems='center' spacing={3}
            style={{minHeight: '75vh', minWidth: '100vw', background: 'linear-gradient(360deg, #041E41, #004e92 70%)'}}>
            <GridList cellHeight={450}>
            {JSON.stringify(this.props)}
            <GridListTile className={classes.gridListTile} component={Link} to='/test'>
                <img src={zefNetPro} alt="ZEFNET Pro Charger" className={classes.image} />
                <GridListTileBar
                    title="Add a Device"
                    subtitle="0 Devices"
                />
            </GridListTile>
            <GridListTile className={classes.gridListTile} component={Link} to='/test'>
                <img src={user} alt="ZEFNET Pro Charger" className={classes.image} />
                <GridListTileBar
                    title="Add a User"
                    subtitle="1 User"
                 />
            </GridListTile>
            <GridListTile className={classes.gridListTile} component={Link} to='/test'>
                <img src={review} alt="ZEFNET Pro Charger" className={classes.image, classes.greyscale}/>
                <GridListTileBar
                    title="Review and Submit Onboarding Package"
                    subtitle="(Please Add a Device)"
                />
            </GridListTile>
        </GridList>
        </Grid>
    );
  }
}

HomeScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);