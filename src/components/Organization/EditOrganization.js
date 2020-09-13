import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField} from "@material-ui/core";
import { withStyles, } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton'

const styles = theme => ({ 
  BottomBuffer: {
    marginBottom: '.5rem'
  },
  LargeBottomBuffer: {
    marginBottom: '1.5rem'
  },
  TopBuffer: {
    marginTop: '1rem'
  },
  TextField: {
    width: '400px',
    '--text-color':'#fff',
    '--dark-background':'#1c2447',
    '--focus-background':'#244d6e',
    color: 'var(--text-color)',
    border: '1px solid var(--text-color)',
    backgroundColor: 'var(--dark-background)',
    caretColor:'var(--text-color)',
    '&:focus':{
      backgroundColor: 'var(--focus-background)'
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 40px var(--dark-background) inset',
      '-webkit-text-fill-color': 'var(--text-color)',
      '&:focus':{
        WebkitBoxShadow: '0 0 0 30px var(--focus-background) inset',
      }
    },
  },
  Title: {
    marginBottom: '1rem',
    textAlign: "center",
    color: "white",
    fontFamily: "inter, Open Sans, sans-serif",
    margin: '0px',
    padding: '0px'
  },
})

class EditOrganization extends Component {
  state = {
    organizationName: this.props.reduxState.organization.name,
    primaryNumber: this.props.reduxState.organization.phone,
    email: this.props.reduxState.organization.email,
    organizationAddress: this.props.reduxState.organization.address,
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleEditOrg = () => {
    const actionObject = {
      organizationName: this.state.organizationName,
      primaryNumber: this.state.primaryNumber,
      email: this.state.email,
      organizationAddress: this.state.organizationAddress,
      id: this.props.reduxState.organization.id,
    };
    this.props.dispatch({ type: "EDIT_ORGANIZATION", payload: actionObject });
    //alert("Change has been made");
    this.setState({
      organizationName: this.props.reduxState.organization.organizationName,
      primaryNumber: this.props.reduxState.organization.primaryNumber,
      email: this.props.reduxState.organization.email,
      organizationAddress: this.props.reduxState.organization
        .organizationAddress,
    });
  };

  
  render() {
    const {classes} = this.props;

    return (
        <Grid item align="center">
            <h1 className={classes.Title}>Edit Organization Information</h1>
            <TextField
              autoFocus
              label='Organization Name'
              required
              variant="filled"
              className={classes.BottomBuffer}
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              required
              label = 'Primary Email'
              variant="filled"
              value={this.state.email}
              className={classes.BottomBuffer}
              onChange={this.handleInputChangeFor("email")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              label = 'Primary Phone Number'
              variant="filled"
              value={this.state.primaryNumber}
              className={classes.BottomBuffer}
              onChange={this.handleInputChangeFor("primaryNumber")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              required
              label = 'Organization Address'
              variant="filled"
              value={this.state.organizationAddress}
              className={classes.LargeBottomBuffer}
              onChange={this.handleInputChangeFor("organizationAddress")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <DynamicButton type='glow' text='Save Changes' linkURL='/viewOrganization' handleClick={this.handleEditOrg}/>
        </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

EditOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(EditOrganization));
