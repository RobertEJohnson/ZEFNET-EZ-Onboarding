import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";
import user from "../Organization/zefnetpro.png";
import { Link } from 'react-router-dom';

class DeviceSerial extends Component {
  state = {
    serialNumber: "",
    confirmSerialNumber: "",
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleNext = () => {
    if (this.state.serialNumber === this.state.confirmSerialNumber) {
      const actionObject = {
        number: this.state.serialNumber,
        user_id: this.props.reduxState.user.id,
      };
      this.props.dispatch({ type: "SET_SERIAL", payload: actionObject });
      this.props.history.push("/deviceName"); //change this
    } else {
      alert("Serial numbers do not match");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceType"); //change this
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
                alt = 'zefnet pro device'
              />
              {/* Image should be changed */}
            </div>
            <div>
              <h1 style={centerText}>Input your Serial Number</h1>
            </div>
            <div>
              <h3 style={centerText}>It can be found [INFO NEEDE FROM ZEF].</h3>
            </div>
          </div>
          <form style={{ minWidth: "400px", background: "transparent" }}>
            <TextField
              required
              color="secondary"
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Serial Number:"
              margin="normal"
              variant="outlined"
              value={this.state.serialNumber}
              onChange={this.handleInputChangeFor("serialNumber")}
            />
            <TextField
              color="secondary"
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text" }}
              label="Confirm Serial Number:"
              margin="normal"
              variant="outlined"
              value={this.state.confirmSerialNumber}
              onChange={this.handleInputChangeFor("confirmSerialNumber")}
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
                  component = {Link} to ="/deviceType"
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
