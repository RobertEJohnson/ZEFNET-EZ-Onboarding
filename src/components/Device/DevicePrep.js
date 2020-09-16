import React, { Component } from 'react';
import {Grid, Paper, withStyles, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import PropTypes from 'prop-types';
import map from './Images/7LLX9.jpg';
import breaker from './Images/breaker2.jpg';
import serial from './Images/serial.png';
import device from './Images/dualHeadStylized.jpg';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  gridListTile: {
    color: 'rgba(255, 255, 255, 0.54)',
    maxWidth: '300px',
    maxHeight: '300px',
    margin: '15px 15px 0px 0px'
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  grow:{
    flexGrow: 1,
    minWidth: '100px'
  },
})


class DevicePrep extends Component {

  render() {
    const {classes} = this.props;
    return (
                <Grid item style={{maxWidth: '1375px', marginBottom: '35px'}} align='center'>
                    <Paper className = {classes.paper}>
                        <h1>Before you start make sure you have the following information on hand</h1>
                        <Grid container justify='center' alignContent='center' alignItems='center'>
                        <GridList cellHeight={300}>
                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                            <GridListTile className={classes.gridListTile}>
                                <img src={map} alt="address" className={classes.image} />
                                <GridListTileBar
                                    title="Device Host Site Address"
                                />
                            </GridListTile>
                            <GridListTile className={classes.gridListTile}>
                                <img src={breaker} alt="breaker" className={classes.image} />
                                <GridListTileBar
                                    title="Breaker Location and Limit(Amps)" 
                                />
                            </GridListTile>
                            <GridListTile className={classes.gridListTile}>
                                <img src={device} alt="ZEFNET Pro Charger" className={classes.image}/>
                                <GridListTileBar
                                    title="Device Type"
                                />
                            </GridListTile>
                            <GridListTile className={classes.gridListTile} style={{marginRight: '0px'}}>
                                <img src={serial} alt="Serial Number" className={classes.image} />
                                <GridListTileBar
                                    title="Serial Number"
                                />
                            </GridListTile>
                        </GridList>
                        </Grid>
                        <br/>
                        <Grid container direction = 'row' justify = 'center' alignContent = 'center'>
                            <DynamicButton type='home' text='Home' linkURL='/OrganizationHome'/>
                            <div className = {classes.grow}>{'\u00A0'}</div>
                            <DynamicButton type='next' text='Next' linkURL='/hostSelect'/>
                        </Grid>
                    </Paper>
                </Grid>
    );
  }
}

DevicePrep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DevicePrep);