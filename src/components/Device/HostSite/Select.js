import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Button, Select, Paper, Divider, InputLabel, FormControl, MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


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
    marginTop: theme.spacing(2),
  },
  grow:{
      flexGrow: 1
  }
})


class HostSelect extends Component {
  state = {
    selectedSite: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password && this.state.first_name && this.state.last_name) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleChange =  (event) => {
    this.setState({
      selectedSite: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
        <Grid container direction = 'column' justify = 'center' alignItems = 'center'>
          <Grid item xs = {12} md = {10} lg = {9} xl = {8}>
            <Paper className = {classes.paper} elevation = {3}>
                <h1>Select Your Host Site</h1>
                <div>
                <p>Please choose from below or input a new Host Site where your new charger will be located. 
                    This does not have to be the same as your organization's primary address.
                    If you have multiple Host Sites, you can complete this process multiple times for each device.</p>   
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Choose From Existing</InputLabel>
                    <Select
                    value={this.state.selectedSite}
                    onChange={this.handleChange}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Site 1</MenuItem>
                    <MenuItem value={20}>Site 2</MenuItem>
                    <MenuItem value={30}>Site 3</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <Divider/>
                <h1>Or</h1>
                {this.state.selectedSite ? 
                    <Button variant = 'contained' disabled>Add New Host Site</Button>
                :
                <Button variant = 'contained' color = 'primary'>Add New Host Site</Button>
                }     
                <br/>
                <br/>
                <Grid container direction = 'row'>
                    <Button variant ='contained'>
                        <ChevronLeftIcon/> Previous
                    </Button>
                    <div className = {classes.grow}></div>
                    {this.state.selectedSite ?
                        <Button variant = 'contained' color = 'primary'>
                            <ChevronRightIcon/> Next
                        </Button>
                    :
                        <Button variant = 'contained' disabled>
                            <ChevronRightIcon/> Next
                        </Button>
                    }
                </Grid>
            </Paper>
            </Grid>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  state,
});

HostSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(HostSelect));


