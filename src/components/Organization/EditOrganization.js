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
    const actionObject = {
      organizationName: this.state.organizationName,
      primaryNumber: this.state.primaryNumber,
      email: this.state.email,
      organizationAddress: this.state.organizationAddress,
      id: this.props.reduxState.organization.id,
    };
    this.props.dispatch({ type: "EDIT_ORGANIZATION", payload: actionObject });
    alert("Change has been made");
    this.setState({
      organizationName: this.props.reduxState.organization.organizationName,
      primaryNumber: this.props.reduxState.organization.primaryNumber,
      email: this.props.reduxState.organization.email,
      organizationAddress: this.props.reduxState.organization
        .organizationAddress,
    });
  };

  render() {
    let centerText = {
      textAlign: "center",
      color: "white",
      fontFamily: "Crimson Text, Open Sans, sans-serif",
    };

    let header = {
      border: "solid #e3e3e3 2px",
      maxWidth: "515px",
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
        <Grid item xs={8} style={{ maxWidth: "1000px" }} align="center">
          <div style={header}>
            <h1 style={centerText}>Edit Organization Information</h1>
            <h3 style={centerText}>
              This will help us associate the chargers with your organization.
            </h3>
          </div>
          <form style={{ minWidth: "400px", background: "transparent" }}>
            <label>Organization Name</label>
            <TextField
              required
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              placeholder={this.props.reduxState.organization.name}
              margin="normal"
              variant="outlined"
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
            ></TextField>
            <TextField
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              placeholder={this.props.reduxState.organization.phone}
              margin="normal"
              variant="outlined"
              value={this.state.primaryNumber}
              onChange={this.handleInputChangeFor("primaryNumber")}
            ></TextField>
            <TextField
              color="secondary"
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              placeholder={this.props.reduxState.organization.email}
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            ></TextField>
            <TextField
              color="secondary"
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              placeholder={this.props.reduxState.organization.address}
              margin="normal"
              variant="outlined"
              value={this.state.organizationAddress}
              onChange={this.handleInputChangeFor("organizationAddress")}
            ></TextField>
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              color="default"
              onClick={this.handleEditOrg}
            >
              Save Changes
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
