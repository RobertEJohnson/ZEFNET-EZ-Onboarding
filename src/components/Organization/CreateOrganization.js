import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";

class CreateOrganization extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ORGANIZATION', payload: this.props.reduxState.user.id})
    if (this.props.reduxState.organization.id) {
      this.props.history.push("/organizationHome");
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
      email: this.state.email,
      organizationAddress: this.state.organizationAddress,
      user_id: this.props.reduxState.user.id,
    };
    this.props.dispatch({ type: "ADD_ORGANIZATION", payload: actionObject });
    this.props.history.push("/organizationHome");
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
            <h1 style={centerText}>Organization Information</h1>
            <h3 style={centerText}>
              This will help us associate the chargers with your organization.
            </h3>
          </div>
          <form style={{ minWidth: "400px", background: "transparent" }}>
            <TextField
              required
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Organization / Company Name"
              margin="normal"
              variant="outlined"
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
            />
            <TextField
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Phone Number"
              margin="normal"
              variant="outlined"
              type="number"
              value={this.state.primaryNumber}
              onChange={this.handleInputChangeFor("primaryNumber")}
            />
            <TextField
              color="secondary"
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            />
            <TextField
              color="secondary"
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Organization Address"
              margin="normal"
              variant="outlined"
              value={this.state.organizationAddress}
              onChange={this.handleInputChangeFor("organizationAddress")}
            />
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              color="default"
              onClick={this.handleAddOrg}
            >
              Create Organization
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
export default connect(mapStateToProps)(CreateOrganization);
