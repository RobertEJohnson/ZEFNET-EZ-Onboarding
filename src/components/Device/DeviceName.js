import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";
import user from "../Organization/zefUser.jpeg";

class DeviceSerial extends Component {
  state = {
    chargerName: "",
    installationDate: "",
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleNext = () => {
    if (this.state.chargerName === this.state.installationDate) {
      const actionObject = {
        chargerName: this.state.chargerName,
        user_id: this.props.reduxState.user.id,
      };
      this.props.dispatch({ type: "SET_NAME", payload: actionObject });
      this.props.history.push("/home"); //change this
    } else {
      alert("Serial numbers do not match");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceSerial"); //change this
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
            <div>
              <img
                src={user}
                style={{
                  maxHeight: "200px",
                  maxWidth: "200px",
                  paddingLeft: "0px",
                }}
              />
              {/* Image should be changed */}
            </div>
            <div>
              <h1 style={centerText}>Name your Device</h1>
            </div>
            <div>
              <h3 style={centerText}>Good names should be short and memorable and descriptive like lorem-ipsum</h3>
            </div>
          </div>
          <form style={{ minWidth: "400px", background: "transparent" }}>
            <TextField
              required
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Charger Name:"
              margin="normal"
              variant="outlined"
              value={this.state.chargerName}
              onChange={this.handleInputChangeFor("chargerName")}
            />
            <TextField
              color="secondary"
              required
              type="Date"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label=""
              margin="normal"
              variant="outlined"
              value={this.state.installationDate}
              onChange={this.handleInputChangeFor("installationDate")}
            />
            <div>
              <div>
                <Button
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  color="default"
                  onClick={this.handleNext}
                >
                  Next
                </Button>
              </div>
              <div style={{ align: "left" }}>
                <Button
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  color="default"
                  onClick={this.handlePrevious}
                >
                  Previous
                </Button>
              </div>
            </div>
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
export default connect(mapStateToProps)(DeviceSerial);
