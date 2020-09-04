import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Button, Select, Paper, Divider, InputLabel, FormControl, MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import {Link} from 'react-router-dom';


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
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
        minWidth: 220,
    },
    grow: {
        flexGrow: 1
    }
})

class BreakerSelect extends Component {

    state = {
        breakers: this.props.state.breaker.siteBreakerReducer,
        selectedBreaker: '',
        open: false
      };

      componentDidUpdate(previousProps){
          console.log('previous siteBreakers', previousProps.state.breaker.siteBreakerReducer);
          console.log('current siteBreakers', this.props.state.breaker.siteBreakerReducer);
          if(previousProps.state.breaker.siteBreakerReducer !== this.props.state.breaker.siteBreakerReducer){
              this.setState({
                  ...this.state,
                  breakers: this.props.state.breaker.siteBreakerReducer
              })
          }
      }
    
      addBreaker = () => {
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
          selectedBreaker: event.target.value,
        });
      }
    
      assignBreaker = () => {
        this.props.dispatch({type: 'SET_BREAKER', payload: this.state.selectedBreaker})
      }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                {
                    this.state.open ? 
                        <div>
                            <p>you clicked add!</p>  
                            <Button onClick = {this.handleClose}>
                                ok
                            </Button>
                        </div>
                    : <></>
                }
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item xs={12} md={10} lg={9} xl={8}>
                        <Paper className={classes.paper} elevation={3}>
                            <h1>Select Your Breaker for the Device</h1>
                            <div>
                                <p>
                                    Click 'Add a New Breaker' to add a breaker for this site.<br/>
                                    You can complete this process multiple times for your selected site.<br/>
                                    Change the selected breaker from the 'Choose from Existing' dropdown.
                                </p>   
                            </div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Choose From Existing</InputLabel>
                                <Select
                                    value={this.state.selectedBreaker}
                                    onChange={this.handleChange}
                                    label="Breaker"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/*Map out all breakers stored in reducer*/}
                    
                                {
                                    this.state.breakers.map((breaker, index)=>
                                    <MenuItem value={breaker} key={breaker.id}>
                                        <span style={{backgroundColor: 'green'}}>Amps:{breaker.limit} </span> {breaker.description}</MenuItem>
                                )}
                                </Select>
                            </FormControl>
                           
                            <br/>
                            <br/>
                            {/* Divider is a material-ui hr*/}
                            <Divider/>
                            <h1>Or</h1>
                            {/*Conditionally render the Add Breaker button as clickable/disabled based on if a breaker is selected*/}
                            {
                                this.state.selectedBreaker ? 
                                <Button variant='contained' disabled>
                                    Add New Breaker
                                </Button>
                            :
                            <Button variant='contained' color='primary' onClick={this.addBreaker}>
                                Add New Breaker
                            </Button>
                            }     
                            <br/>
                            <br/>
                            <Grid container direction='row'>
                                <Button variant='contained'
                                component={Link} to="/hostSelect">
                                    <ChevronLeft/> Previous
                                </Button>
                                <div className={classes.grow}></div>
                                {/*Conditionally render the Next button as clickable/disabled based on if a breaker is selected*/}
                                {
                                    this.state.selectedBreaker ?
                                        <Button variant='contained' color='primary'
                                            onClick={this.assignBreaker}
                                            component={Link} to="/deviceType">
                                            <ChevronRight/> Next
                                        </Button>
                                :
                                    <Button variant='contained' disabled>
                                        <ChevronRight/> Next
                                    </Button>
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
});

BreakerSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles) (connect(mapStateToProps)(BreakerSelect));