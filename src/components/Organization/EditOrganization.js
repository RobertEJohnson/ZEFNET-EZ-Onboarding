import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField} from "@material-ui/core";
import { withStyles, } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton'

const styles = theme => ({ 
  EditOrgPage:{
    color:'white',
    textAlign: "center",
    marginBottom: '100px'
  },
  EditOrgPage__title: {
    marginBottom: '1rem',
  },
  SmallBottomBuffer: {
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
        <Grid item align="center" className={classes.EditOrgPage}>
            <h1 className={classes.EditOrgPage__title}>Edit Organization Information</h1>
            <TextField
              autoFocus
              label='Organization Name'
              required
              variant="filled"
              className={classes.SmallBottomBuffer}
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
              className={classes.SmallBottomBuffer}
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
              className={classes.SmallBottomBuffer}
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
