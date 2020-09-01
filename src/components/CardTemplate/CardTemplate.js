import React, { Component } from 'react';
import {Grid, Button, Card, CardHeader, CardMedia, CardContent,
     Typography, CardActions, withStyles} from '@material-ui/core';

import { Link } from 'react-router-dom';
import zefNetPro from './ZEFNETPro.png';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const styles = theme => ({ 
  root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
  },
  gridListTile: {
    width: 500,
    height: 450,
  },
})


class CardTemplate extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let centerText = {textAlign: 'center', color: 'white', fontFamily: 'Crimson Text, Open Sans, sans-serif'}
    return (
        <Grid container direction='row' justify='center' alignContent='center' alignItems='center' spacing={3}
            style={{minHeight: '75vh', minWidth: '100vw', background: 'linear-gradient(360deg, #041E41, #004e92 70%)'}}>
            <GridList cellHeight={450}>
            <GridListTile style={{maxWidth: '350px', maxHeight: '350px', margin: '20px 20px 0px 0px'}}>
                <img src={zefNetPro} alt="ZEFNET Pro Charger" style={{maxHeight: '350px', maxWidth: '350px'}} />
                <GridListTileBar
                    style={{maxWidth: '350px'}}
                    title="Add a Device"
                    subtitle="0 Devices"
                    actionIcon={
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    }
                 />
            </GridListTile>
            <GridListTile style={{maxWidth: '350px', maxHeight: '350px', margin: '20px 20px 0px 0px'}}>
                <img src={zefNetPro} alt="ZEFNET Pro Charger" style={{maxHeight: '350px', maxWidth: '350px'}} />
                <GridListTileBar
                    style={{maxWidth: '350px'}}
                    title="Add a Device"
                    subtitle="1 User"
                    actionIcon={
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    }
                 />
            </GridListTile>
            <GridListTile style={{maxWidth: '350px', maxHeight: '350px', margin: '20px 20px 0px 0px'}}>
                <img src={zefNetPro} alt="ZEFNET Pro Charger" style={{maxHeight: '350px', maxWidth: '350px'}} />
                <GridListTileBar
                    style={{maxWidth: '350px'}}
                    title="Add a Device"
                    subtitle=""
                    actionIcon={
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    }
                />
            </GridListTile>
        </GridList>
        </Grid>
    );
  }
}









//Made Temp structure that could work, but would rather try a GridList for built in image overlay

// <Grid container direction='row' justify='center' alignContent='center' alignItems='center' spacing={3}
// style={{minHeight: '75vh', minWidth: '100vw', background: 'linear-gradient(360deg, #041E41, #004e92 70%)'}}>
// <Grid item xs={3} style={{ maxWidth: '350px', backgroundColor: 'red'}} align='center' spacing={3}>
//     <Card>
//         <CardHeader title="Add a Device"/>
//     </Card>
// </Grid>
// <Grid item xs={3} style={{ maxWidth: '500px', backgroundColor: 'red'}} align='center' spacing={3}>
//     <Card>
//         <CardHeader title="Add a User (1)"/>
//     </Card>
// </Grid>
// <Grid item xs={3} style={{ maxWidth: '500px', backgroundColor: 'red'}} align='center' spacing={3}>
//     <Card>
//         <CardHeader title="Submit Onboarding Package" subheader="Please Add a Device"/>
//         <CardContent style={{padding: '0px'}}>
//             <img src={zefNetPro} style={{maxWidth: '100%'}} />
//         </CardContent>
//     </Card>
// </Grid>
// </Grid>


// this allows us to use <App /> in index.js
export default withStyles(styles)(CardTemplate);