import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField} from "@material-ui/core";
import { withStyles, } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
    CreateOrganizationPage:{
       paddingBottom: '75px',
       color: 'white'
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
      textAlign: "center",
      color: "white",
      fontFamily: "inter, Open Sans, sans-serif",
      padding: '0px',
      margin: '0px'
    },
    SubTitle: {
      textAlign: "center",
      color: "white",
      fontFamily: "inter, Open Sans, sans-serif",
      padding: '0px',
      margin: '0px 0px .5rem 0px',
      fontSize: '17px'
    },
    BottomBuffer: {
      marginBottom: '.5rem'
    },
    LargeBottomBuffer: {
      marginBottom: '1rem'
    },
    TopBottomBuffer: {
      margin: '.5rem 0'
    },
})


class CreateOrganization extends Component {

  componentDidMount() {
     //push user to organizationHome instead if the've already added org info
    if (this.props.reduxState.organization.id) {
      this.props.history.push("/organizationHome");
  } 
}

componentDidUpdate(previousProps){
  if (previousProps.reduxState.organization.id !== this.props.reduxState.organization.id){
    if (this.props.reduxState.organization.id) {
      this.props.history.push("/organizationHome");
  } 
  }
}

  state = {
    organizationName: "",
    primaryNumber: "",
    email: "",
    organizationAddress: "",
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAddOrg = () => {
    const actionObject = {
      organizationName: this.state.organizationName,
      primaryNumber: this.state.primaryNumber,
      organizationEmail: this.state.email,
      organizationAddress: this.state.organizationAddress,
      user_id: this.props.reduxState.user.id,
      first_name: this.props.reduxState.user.first_name,
      last_name: this.props.reduxState.user.last_name,
      userEmail: this.props.reduxState.user.email,
      phone: this.props.reduxState.user.phone,
      editor: 'true',
      primary: 'true',
    };
    this.props.dispatch({ type: "ADD_ORGANIZATION", payload: actionObject });
    this.props.history.push("/organizationHome");
  };

  render() {

    const {classes} = this.props;

    return (
        <Grid item className={classes.CreateOrganizationPage} align="center">
          <h1 className={classes.Title}>Organization Information</h1>
          <p className={classes.SubTitle}>
            This will help us associate the chargers with your organization.
          </p>
            <TextField
              className={classes.TopBottomBuffer}
              required
              label="Organization / Company Name"
              variant="filled"
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              className={classes.BottomBuffer}
              label="Phone Number"
              variant="filled"
              type="tel"
              value={this.state.primaryNumber}
              onChange={this.handleInputChangeFor("primaryNumber")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              className={classes.BottomBuffer}
              required
              label="Email"
              variant="filled"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            <TextField
              className={classes.LargeBottomBuffer}
              required
              label="Organization Address"
              variant="filled"
              value={this.state.organizationAddress}
              onChange={this.handleInputChangeFor("organizationAddress")}
              InputProps={{classes: {root: classes.TextField}}}
              inputProps={{className: classes.TextField}}
              InputLabelProps={{style:{color: 'white'}}}
            />
            <br/>
            {this.state.email &&this.state.organizationAddress && this.state.organizationName?
              <DynamicButton key = 'activeCreate' type='glow' text='Create Organization' handleClick={this.handleAddOrg}/>
              :
              <DynamicButton key = 'inactiveCreate' type='glow' text='Create Organization' isDisabled = {true}/>
              }
        </Grid>
    );
  }
}


const mapStateToProps = (reduxState) => ({
  reduxState,
});

CreateOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(CreateOrganization));
