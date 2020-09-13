import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DynamicButton from "../Buttons/DynamicButton";

const styles = (theme) => ({
  input: {
    color: "white",
    border: `1px solid white`,
    backgroundColor: "#243353",
    outline: `1px solid transparent`, // we use a transparent outline here so the component doesn't move when focused
  },
  title: {
    textAlign: "center",
    color: "white",
    fontFamily: "inter, Open Sans, sans-serif",
    padding: "0px",
    margin: "0px",
  },
  subTitle: {
    textAlign: "center",
    color: "white",
    fontFamily: "inter, Open Sans, sans-serif",
    padding: "0px",
    margin: "0px 0px 0px 0px",
    fontSize: "17px",
  },
  form: {
    minWidth: "400px",
    minHeight: "400px",
    margin: "0px",
    padding: "0px",
    background: "transparent",
  },
});

class CreateOrganization extends Component {
  componentDidMount() {
    //push user to organizationHome instead if the've already added org info
    if (this.props.reduxState.organization.id) {
      this.props.history.push("/organizationHome");
    }
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.reduxState.organization.id !==
      this.props.reduxState.organization.id
    ) {
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
      editor: "true",
      primary: "true",
      invalidEmail: false,
    };
    this.props.dispatch({ type: "ADD_ORGANIZATION", payload: actionObject });
    this.props.history.push("/organizationHome");
  };

  handlePhoneNumberChange = (value) => {
    this.setState({
      phone: value,
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

    return (
      <Grid
        item
        xs={8}
        style={{ maxWidth: "1000px", paddingBottom: "50px" }}
        align="center"
      >
        <div>
          <h1 className={classes.title}>Organization Information</h1>
          <p className={classes.subTitle}>
            This will help us associate the chargers with your organization.
          </p>
        </div>
        <form className="form">
          <TextField
            required
            style={{
              minWidth: "380px",
              fontFamily: "Inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            label="Organization / Company Name"
            margin="normal"
            variant="outlined"
            value={this.state.organizationName}
            onChange={this.handleInputChangeFor("organizationName")}
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
            style={{
              minWidth: "380px",
              fontFamily: "Inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            label="Email"
            margin="normal"
            error={this.state.invalidEmail}
            onBlur={this.checkEmail}
            variant="outlined"
            value={this.state.email}
            onChange={this.handleInputChangeFor("email")}
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
            style={{
              minWidth: "380px",
              fontFamily: "Inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            label="Organization Address"
            variant="outlined"
            value={this.state.organizationAddress}
            onChange={this.handleInputChangeFor("organizationAddress")}
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
          <MuiPhoneNumber
            defaultCountry={"us"}
            variant="outlined"
            disableAreaCodes="true"
            label="Phone Number"
            style={{
              minWidth: "380px",
              fontFamily: "Inter",
              padding: "0px",
              margin: "15px 0px 0px 0px",
            }}
            margin="normal"
            type="tel"
            value={this.state.primaryNumber}
            onChange={this.handlePhoneNumberChange}
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
          <br />
          <DynamicButton
            type="glow"
            text="Create Organization"
            handleClick={this.handleAddOrg}
          />
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

CreateOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(CreateOrganization));
