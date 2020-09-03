import React, { Component } from 'react';
import {Grid, Paper, Button, withStyles, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import map from './7LLX9.jpg';
import breaker from './Tandems.jpg';
//import MinimalLogOutButton from '../LogOutButton/MinimalLogOutButton'
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '80vh', 
    minWidth: '100vw', 
    background: 'white',
    textAlign: 'center',
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  gridListTile: {
    color: 'rgba(255, 255, 255, 0.54)',
    maxWidth: '270px',
    maxHeight: '270px',
    margin: '15px 15px 0px 0px'
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  greyscale: {
    filter: 'grayscale(100%)'
  },
  grow:{
    flexGrow: 1,
    minWidth: '100px'
  }
})


class DevicePrep extends Component {

  render() {
    const {classes} = this.props;
    return (
        <div className = {classes.root}>
            <Grid container direction='row' justify='center' alignContent='center' alignItems='center'>
                <Grid item xs = {12} md = {11}>
                    <Paper className = {classes.paper}>
                        <h1>Before you start make sure you have the following information on hand</h1>
                        <GridList cellHeight={300}>
                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                            <GridListTile className={classes.gridListTile} >
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
                                <img src='https://images.squarespace-cdn.com/content/v1/5a452989f6576e04a03298a3/1546871975572-KHM4BAX6QQBZ1538E86J/ke17ZwdGBToddI8pDm48kCt9awVbelElqJMHRaaRJp97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UU4G2p1hy_eRrLVSvZqYrujvXWdLAlapTAj4CtD__Nuogw70n2sEakuJ3CMJig9qhg/ZEFEnergy-ZEFNET-DualPedestal_15-4kW-555.jpg?format=1000w' alt="ZEFNET Pro Charger" className={classes.image}/>
                                <GridListTileBar
                                    title="Device Type"
                                />
                            </GridListTile>
                            <GridListTile className={classes.gridListTile} >
                                <img src={map} alt="Serial Number" className={classes.image} />
                                <GridListTileBar
                                    title="Serial Number"
                                />
                            </GridListTile>
                        </GridList>
                        <br/>
                        <Grid container direction = 'row' justify = 'center' alignContent = 'center'>
                           
                                <Button variant ='contained'
                                component = {Link} to ="/OrganizationHome">
                                    <HomeIcon/> Home
                                </Button>
                                <div className = {classes.grow}>{'\u00A0'}</div>
                                <Button variant = 'contained' color = 'primary'
                                onClick = {this.assignSite}
                                component = {Link} to ="/hostSelect">
                                    <ChevronRightIcon/> Next
                                </Button>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
  }
}

DevicePrep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DevicePrep);