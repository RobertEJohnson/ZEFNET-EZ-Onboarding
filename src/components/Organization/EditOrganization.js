import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DynamicButton from "../Buttons/DynamicButton";
import MuiPhoneNumber from "material-ui-phone-number";

const styles = (theme) => ({
  EditOrgPage: {
    color: "white",
    textAlign: "center",
    marginBottom: "100px",
  },
  EditOrgPage__title: {
    marginBottom: "1rem",
  },
  SmallBottomBuffer: {
    marginBottom: ".5rem",
  },
  LargeBottomBuffer: {
    marginBottom: "1.5rem",
  },
  TextField: {
    width: "400px",
    "--text-color": "#fff",
    "--dark-background": "#1c2447",
    "--focus-background": "#244d6e",
    color: "var(--text-color)",
    border: "1px solid var(--text-color)",
    backgroundColor: "var(--dark-background)",
    caretColor: "var(--text-color)",
    "&:focus": {
      backgroundColor: "var(--focus-background)",
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 40px var(--dark-background) inset",
      "-webkit-text-fill-color": "var(--text-color)",
      "&:focus": {
        WebkitBoxShadow: "0 0 0 30px var(--focus-background) inset",
      },
    },
  },
});

//this component is routed at /editOrganization
class EditOrganization extends Component {
  state = {
    organizationName: this.props.reduxState.organization.name,
    primaryNumber: this.props.reduxState.organization.phone,
    email: this.props.reduxState.organization.email,
    organizationAddress: this.props.reduxState.organization.address,
    invalidEmail: false,
  };

  //input change handler for all input fields
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //run the edit organization saga when save changes is clicked and reset state
  handleEditOrg = () => {
    const actionObject = {
      organizationName: this.state.organizationName,
      primaryNumber: this.state.primaryNumber,
      email: this.state.email,
      organizationAddress: this.state.organizationAddress,
      id: this.props.reduxState.organization.id,
    };
    this.props.dispatch({ type: "EDIT_ORGANIZATION", payload: actionObject });
    this.setState({
      organizationName: this.props.reduxState.organization.organizationName,
      primaryNumber: this.props.reduxState.organization.primaryNumber,
      email: this.props.reduxState.organization.email,
      organizationAddress: this.props.reduxState.organization
        .organizationAddress,
    });
  };

  handlePhoneNumberChange = (value) => {
    this.setState({
      primaryNumber: value,
    });
  };

//check that email is valid
  checkEmail = (e) => {
    const value = e.target.value;
    if (value.includes("@") && value.includes(".")) {
      this.setState({
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item align="center" className={classes.EditOrgPage}>
        <h1 className={classes.EditOrgPage__title}>
          Edit Organization Information
        </h1>
        <TextField
          autoFocus
          label="Organization Name"
          required
          variant="filled"
          className={classes.SmallBottomBuffer}
          value={this.state.organizationName}
          onChange={this.handleInputChangeFor("organizationName")}
          InputProps={{ classes: { root: classes.TextField } }}
          inputProps={{ maxLength: 100, className: classes.TextField }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <br />
        <TextField
          required
          label="Primary Email"
          variant="filled"
          error={this.state.invalidEmail}
          onBlur={this.checkEmail}
          value={this.state.email || ""}
          className={classes.SmallBottomBuffer}
          onChange={this.handleInputChangeFor("email")}
          InputProps={{ classes: { root: classes.TextField } }}
          inputProps={{ maxLength: 100, className: classes.TextField }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <br />
        <MuiPhoneNumber
          defaultCountry={"us"}
          variant="filled"
          disableAreaCodes="true"
          label="Primary Phone (optional)"
          name="phone"
          type="tel"
          value={this.state.primaryNumber || ""}
          className={classes.SmallBottomBuffer}
          onChange={this.handlePhoneNumberChange}
          InputProps={{ classes: { root: classes.TextField } }}
          inputProps={{ maxLength: 30, className: classes.TextField }}
          InputLabelProps={{ style: { color: "white", marginLeft: '50px'} }}
        />
        <br />
        <TextField
          required
          label="Organization Address"
          variant="filled"
          value={this.state.organizationAddress}
          className={classes.LargeBottomBuffer}
          onChange={this.handleInputChangeFor("organizationAddress")}
          InputProps={{ classes: { root: classes.TextField } }}
          inputProps={{ maxLength: 500, className: classes.TextField }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <br />
        {/* conditional render enabled button if all required fields filled, and valid email */}
        {this.state.email &&this.state.organizationAddress && this.state.organizationName && !this.state.invalidEmail?
              
        <DynamicButton
          key = 'activeSave'
          type="glow"
          text="Save Changes"
          linkURL="/viewOrganization"
          handleClick={this.handleEditOrg}
        />
        :
        <DynamicButton key = 'inactiveSave' type='glow' text='Save Changes' isDisabled = {true}/>
        }
      </Grid>
    );
  }
}

// map full reduxState to props
const mapStateToProps = (reduxState) => ({
  reduxState,
});

//include classes on props
EditOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

// connect this component to the app 
export default withStyles(styles)(connect(mapStateToProps)(EditOrganization));
