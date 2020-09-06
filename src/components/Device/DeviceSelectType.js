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
  card: {
    transition: 'all .2s ease-in-out',
    maxWidth: '300px',
    width: '300px',
    border: '1px solid black',
    marginBottom: '25px',
    boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028),0 12.5px 10px rgba(0, 0, 0, 0.035),0 22.3px 17.9px rgba(0, 0, 0, 0.042),0 41.8px 33.4px rgba(0, 0, 0, 0.05),0 100px 80px rgba(0, 0, 0, 0.07)',
    '&:hover': {transform: 'scale(1.07)',boxShadow: '0 0 15px #c8ffff,-5px 0 20px #66fbfb, 5px 0 25px #049494',}
  },
  media: {
    height: '300px',
    width: '300px'
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

      <Grid container justify='center' alignContent='center' alignItems='center'  xs={12}>
      <Grid item xs={12} align='center'>
        <h1 style={{color:'white',marginBottom: '30px'}}>Please Select Your Charging Device Type</h1>
      </Grid>
      
        <Grid item xs={8} md={4} lg={3} align='center'>
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

        <Grid item xs={8} md={4} lg={3} align='center'>
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

        <Grid item xs={8} md={4} lg={3} align='center'>
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
        
        <Grid item xs={8} md={4} lg={3} align='center'>
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
       <Grid item align='center' xs={12}>
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
       </Grid>
    </Grid>

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