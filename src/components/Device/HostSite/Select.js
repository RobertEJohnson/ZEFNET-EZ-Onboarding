import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button, Select, Paper, Divider, InputLabel, FormControl, MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import AddSite from './Add';


const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '100vh', 
    minWidth: '100vw', 
    background: 'white',
    textAlign: 'center',
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grow:{
      flexGrow: 1
  },
  previousButton: {
    paddingLeft: '8px',
    marginLeft: '10px'
  },
  nextButton: {
    paddingRight: '8px', 
    marginRight: '5px'
  }
})


class HostSelect extends Component {
  state = {
    selectedSite: '',
    open: false
  };

  componentDidMount = ()=> {
    if( this.props.state.device.site.id ){
      this.setState({
        ...this.state,
        selectedSite: this.props.state.device.site
      })
    } 
    console.log('stored site:', this.props.state.device.site)
  } 

  addSite = () => {
      this.setState ({
          ...this.state,
          open: true,
      })
  }

  handleClose = () => {
    this.setState ({
        ...this.state,
        open: false,
    })
}

  handleChange =  (event) => {
    this.setState({
      selectedSite: event.target.value,
    });
  }

  componentDidUpdate(previousProps){
   
   if(previousProps.state.site && (previousProps.state.site !== this.props.state.site)){
     if( this.props.state.device.site.id ){
      this.setState({
          ...this.state,
          selectedSite: this.props.state.device.site
      }) 
    // }else{
    //      this.setState({
    //        ...this.state, 
    //          selectedSite: this.props.state.site[this.props.state.site.length-1]
    //      })
      }
    } 
  }

  assignSite = () => {
    if (this.state.selectedSite !== this.props.state.device.site){
    this.props.dispatch({type: 'SET_DEVICE_SITE', payload: this.state.selectedSite})
    this.props.dispatch({type: 'FETCH_SITE_BREAKERS', payload: this.state.selectedSite.id})
    }
  }

  render() {
    const {classes} = this.props; //3
    return (
      
          <Grid item style={{maxWidth: '800px'}} align='center'>
            {JSON.stringify(this.props.state.device.site)}
          <AddSite handleClose = {this.handleClose} open = {this.state.open}/>
            <Paper className = {classes.paper} elevation = {3}>
                <h1>Select Your Host Site</h1>
                <div style={{marginBottom: '20px'}}> 
                <p style={{margin: 'auto 40px'}}>
                    Please choose from existing below or press the 'Add New Site' button.
                    </p>   
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Choose From Existing Sites</InputLabel>
                    <Select
                    id = 'siteSelect'
                    value={this.state.selectedSite}
                    onChange={this.handleChange}
                    >
                    <MenuItem value="">
                        <em>None of these</em>
                    </MenuItem>
                    {this.props.state.site.map((site, index)=>
                    (<MenuItem value={site} key = {index}>{site.address}</MenuItem>)
                    )}
                    </Select>
                </FormControl>

                <br/>
                <br/>
                <Divider/>
                <h1>Or</h1>
                
                {this.state.selectedSite ? 
                    <Button variant = 'contained' disabled>
                        Add New Site
                    </Button>
                :
                <Button variant = 'contained' color = 'primary' onClick = {this.addSite}>
                    Add New Site
                </Button>
                }     
                <br/>
                <br/>
                <Grid container direction = 'row'>
                    <Button variant ='contained'
                      className={classes.previousButton}
                      component = {Link} to ="/devicePrep">
                        <ChevronLeftIcon/> Previous
                    </Button>
                    <div className = {classes.grow}></div>
                    {this.state.selectedSite ?
                        <Button variant = 'contained' color = 'primary'
                          className={classes.nextButton}
                          onClick = {this.assignSite}
                          component = {Link} to ="/breakerSelect">
                            Next <ChevronRightIcon/>
                        </Button>
                    :
                        <Button variant = 'contained' disabled
                             className={classes.nextButton}>
                             Next <ChevronRightIcon/>
                        </Button>
                    }
                </Grid>
            </Paper>
            </Grid>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

HostSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(HostSelect));


