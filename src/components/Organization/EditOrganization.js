import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";

class EditOrganization extends Component {
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

  handleEditOrg = () => {
    console.log("In handleAddOrg");
    const actionObject = {
        organizationName: this.state.organizationName,
        primaryNumber: this.state.primaryNumber,
        email: this.state.email,
        organizationAddress: this.state.organizationAddress,
        user_id: this.props.reduxState.user.id
    }
    this.props.dispatch({ type: "ADD_ORGANIZATION", payload: actionObject });
    alert("Order has been placed");
    this.setState({
      organizationName: "",
      primaryNumber: "",
      email: "",
      organizationAddress: "",
    });
  };

  render() {
    let centerText = {
      textAlign: "center",
      color: "white",
      fontFamily: "Crimson Text, Open Sans, sans-serif",
    };
    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        style={{
          minHeight: "75vh",
          minWidth: "100vw",
          background: "linear-gradient(360deg, #041E41, #004e92 70%)",
        }}
      >
        <Grid item xs={8} style={{ maxWidth: "1000px" }} justify="center">
          <h1 style={centerText}>Edit your organization!</h1>
          <form>
            <TextField
              required
              label="Organization / Company Name"
              variant="outlined"
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
            ></TextField>
            <TextField
              label="Primary Number"
              variant="outlined"
              value={this.state.primaryNumber}
              onChange={this.handleInputChangeFor("primaryNumber")}
            ></TextField>
            <TextField
              required
              label="email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            ></TextField>
            <TextField
              required
              label="Organization Address"
              variant="outlined"
              value={this.state.organizationAddress}
              onChange={this.handleInputChangeFor("organizationAddress")}
            ></TextField>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleEditOrg}
            >
              Edit ORGANIZATION
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EditOrganization);
