import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DynamicButton from "../Buttons/DynamicButton";
import MuiPhoneNumber from "material-ui-phone-number";

const styles = (theme) => ({
  input: {
    color: "white",
    border: `1px solid white`,
    backgroundColor: "#243353",
    outline: `1px solid transparent`, // we use a transparent outline here so the component doesn't move when focused
  },
  h1Reset: {
    textAlign: "center",
    color: "white",
    fontFamily: "inter, Open Sans, sans-serif",
    padding: "0px",
    margin: "0px",
  },
  h3Reset: {
    textAlign: "center",
    color: "white",
    fontFamily: "inter, Open Sans, sans-serif",
    padding: "0px",
    margin: "0px 0px 0px 0px",
  },
});

class EditOrganization extends Component {
  state = {
    organizationName: this.props.reduxState.organization.name,
    primaryNumber: this.props.reduxState.organization.phone,
    email: this.props.reduxState.organization.email,
    organizationAddress: this.props.reduxState.organization.address,
    invalidEmail: false,
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

  checkEmail = (e) => {
    console.log("YAY");
    const value = e.target.value;
    if (value.includes("@") && value.includes(".")) {
      this.setState({
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
      console.log("Yup");
    }
  };

  render() {
    const { classes } = this.props;

    let centerText = {
      textAlign: "center",
      color: "white",
      fontFamily: "inter, Open Sans, sans-serif",
      margin: "0px",
      padding: "0px",
    };

    return (
      <Grid item style={{ maxWidth: "1000px" }} align="center">
        <div>
          <h1 style={centerText}>Edit Organization Information</h1>
        </div>
        <form style={{ minWidth: "400px", background: "transparent" }}>
          <TextField
            label="Organization Name"
            required
            margin="normal"
            variant="outlined"
            value={this.state.organizationName || ""}
            onChange={this.handleInputChangeFor("organizationName")}
            style={{
              minWidth: "380px",
              fontFamily: "inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          ></TextField>
          <br />
          <TextField
            required
            style={{
              minWidth: "380px",
              fontFamily: "Crimson Text",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            label="Primary Email"
            margin="normal"
            variant="outlined"
            error={this.state.invalidEmail}
            onBlur={this.checkEmail}
            value={this.state.email || ""}
            onChange={this.handleInputChangeFor("email")}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          ></TextField>
          <br />
          <MuiPhoneNumber
            defaultCountry={"us"}
            variant="outlined"
            disableAreaCodes="true"
            label="Primary Phone (optional)"
            name="phone"
            type="tel"
            value={this.state.primaryNumber || ""}
            onChange={this.handlePhoneNumberChange}
            style={{
              minWidth: "380px",
              fontFamily: "inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <br />
          <TextField
            required
            label="Organization Address"
            margin="normal"
            variant="outlined"
            multiline
            value={this.state.organizationAddress || ""}
            onChange={this.handleInputChangeFor("organizationAddress")}
            style={{
              minWidth: "380px",
              fontFamily: "inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          ></TextField>
          <br />
          <br />
          <DynamicButton
            type="glow"
            text="Save Changes"
            linkURL="/viewOrganization"
            handleClick={this.handleEditOrg}
          />
        </form>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

EditOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(EditOrganization));
