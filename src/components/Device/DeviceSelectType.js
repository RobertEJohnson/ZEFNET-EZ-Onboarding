import React, { Component } from 'react';
import {Grid, Button, withStyles, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import zefNetPro from './zefpro.png';
import wallmount from './wallMount.jpg';
import single from './singleheadped.jpg';
import double from './dualheadped.jpg';


const styles = theme => ({ 
  root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        color: 'white',
        textAlign: 'center',
        minHeight: '100vh', 
        minWidth: '100vw',
        background: 'linear-gradient(360deg, #041E41, #004e92 70%)',
        fontFamily: 'Crimson Text, Open Sans, sans-serif',
  },
  gridListTile: {
    color: 'rgba(255, 255, 255, 0.54)',
    maxWidth: '320px',
    maxHeight: '350px',
    margin: '20px 20px 0px 0px'
  },
  image: {
    maxHeight: '350px',
    minWidth: '350px'
  },
  grow: {
    flexGrow:1
  }
})


class DeviceSelectType extends Component {

  state = {
   selected:''
  }

  handleSelct = (number) =>{
    this.setState({
      selected: number
    })
  }

  render() {
    const {classes} = this.props;
    return (
        <div className = {classes.root}>
          <br/>
          <br/>
          <h1>Select your device model</h1>
            <Grid container direction='row' justify='center' alignContent='center' alignItems='center' spacing={3}
                >
                <div style={{maxWidth: '1500px'}}>
                    <GridList cellHeight={400}>
                        <GridListTile className={classes.gridListTile}>
                            <img src={wallmount} alt="Wall Mount Charger" className={classes.image} />
                            <GridListTileBar
                                title="Wall Mount Charger"
                            />
                        </GridListTile>
                        <GridListTile className={classes.gridListTile}>
                            <img src={single} alt="Single Head Pedestal Charger" className={classes.image}/>
                            <GridListTileBar
                                title="Single Head Pedestal Charger"
                            />
                        </GridListTile>
                        <GridListTile className={classes.gridListTile} >
                            <img src={double} alt="ZEFNET Pro Charger" className={classes.image}/>
                            <GridListTileBar
                                title="Dual Head Pedestal Charger"
                            />
                        </GridListTile>
                        <GridListTile className={classes.gridListTile}>
                            <img src={zefNetPro} alt="ZEFNET Pro Charger" className={classes.image} />
                            <GridListTileBar
                                title="ZEFNET Pro Charger"
                            />
                        </GridListTile>
                    </GridList>
                </div>
               </Grid>
               <br/>
               <Grid container direction = 'row'>
              <div style={{ align: "left" }}>
                <Button
                  variant="contained"
                  style={{ margin: "20px" }}
                  color="default"
                  component = {Link} to ="/breakerSelect"
                >
                  Previous
                </Button>
              </div>
              <div className = {classes.grow}></div>
              <div>
                <Button
                  variant="contained"
                  style={{ margin: "20px" }}
                  color="default"
                  onClick={this.handleNext}
                  component = {Link} to ="/deviceSerial"
                >
                  Next
                </Button>
              </div>
            </Grid>
          </div>
    
    );
  }
}

DeviceSelectType.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceSelectType);