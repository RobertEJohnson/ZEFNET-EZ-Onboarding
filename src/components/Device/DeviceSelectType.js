import React, { Component } from 'react';
import {Grid, Button, withStyles, GridListTileBar} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import zefNetPro from './zefpro.png';
import wallmount from './wallMount.jpg';
import single from './singleheadped.jpg';
import double from './dualheadped.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ChevronLeft from '@material-ui/icons/ChevronLeft';


const styles = theme => ({ 
  root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        //overflow: 'hidden',
        color: 'white',
        alignContent: 'center',
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
  },
  card: {
    maxWidth: 325,
  },
  media: {
    height: 340,
  },
})


class DeviceSelectType extends Component {

  state = {
   selected:''
  }

  handleChange1 = () => {
    this.setState({ 
      selected: 1 
    });
    const dispatchObject =  {
        id: 1,
        img: './wallMount.jpg',
        name: 'Wall Mount Charger'
      }
      this.props.dispatch({ type: "SET_TYPE", payload: dispatchObject })
  };
  handleChange2 = () => {
    this.setState({ 
      selected: 2 
    });
    const dispatchObject =  {
      id: 2,
      img: './singleheadped.jpg',
      name: 'Single Head Pedestal Charger'
    }
      this.props.dispatch({ type: "SET_TYPE", payload: dispatchObject })
  };
  handleChange3 = () => {
    this.setState({ 
      selected: 3 
    });
    const dispatchObject =  {
      id: 3,
      img: './dualheadped.jpg',
      name: 'Dual Head Pedestal Charger'
    }
    this.props.dispatch({ type: "SET_TYPE", payload: dispatchObject })

  };
  handleChange4 = () => {
    this.setState({ 
      selected: 4 
    });
    const dispatchObject =  {
      id: 4,
      img: './zefpro.png',
      name: 'ZEFNET Pro Charger'
    }
      this.props.dispatch({ type: "SET_TYPE", payload:dispatchObject })
  };

  render() {
    const {classes} = this.props;
    return (
        <div className = {classes.root}>
          <br/>
          <br/>
          <h1>Select your device model</h1>
          <br/>
            
            <Grid container direction='row' alignContent = 'center' spacing={3} >
                <Grid item xs = {6} md = {3}>
                      <Card className={classes.card}>
                        <CardActionArea onClick={this.handleChange1}
                          component = {Link} to ="/deviceSerial">
                          <CardMedia
                          image={wallmount}
                          title="Wall Mount Charger" 
                          className={classes.media} />
                          <GridListTileBar
                              title="Wall Mount Charger"
                          />
                          </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs = {6} md = {3}>
                      <Card className={classes.card}>
                        <CardActionArea onClick={this.handleChange2}
                          component = {Link} to ="/deviceSerial">
                          <CardMedia
                          image={single}
                          title="Single Head Pedestal Charger" 
                          className={classes.media} />
                          <GridListTileBar
                              title="Single Head Pedestal Charger"
                          />
                          </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item xs = {6} md = {3}>
                    <Card className={classes.card}>
                      <CardActionArea onClick={this.handleChange3} 
                        component = {Link} to ="/deviceSerial">
                        <CardMedia
                        image={double}
                        title="Double Head Pedestal Charger" 
                        className={classes.media} />
                        <GridListTileBar
                            title="Double Head Pedestal Charger"
                        />
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs = {6} md = {3}>
                    <Card className={classes.card}>
                      <CardActionArea onClick={this.handleChange4} 
                        component = {Link} to ="/deviceSerial">
                        <CardMedia
                        image={zefNetPro}
                        title="ZEFNET Pro Charger" 
                        className={classes.media} />
                        <GridListTileBar
                            title="ZEFNET Pro Charger"
                        />
                        </CardActionArea>
                    </Card>
                  
                </Grid>
               </Grid>
               <br/>
              <div style={{ align: 'center' }}>
                <Button
                  variant="contained"
                  style={{ margin: "20px" }}
                  color="default"
                  component = {Link} to ="/breakerSelect"
                >
                  <ChevronLeft/>
                  Previous
                </Button>
              </div>
          </div>
    
    );
  }
}

DeviceSelectType.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(DeviceSelectType));