import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";
import user from "../Organization/zefUser.jpeg";
import { Link } from "react-router-dom";

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
    if (
      this.state.serialNumber === this.state.confirmSerialNumber &&
      this.state.serialNumber !== ""
    ) {
      const actionObject = {
        serialNumber: this.state.serialNumber,
        user_id: this.props.reduxState.user.id,
      };
      this.props.dispatch({ type: "SET_SERIAL", payload: actionObject });
      this.props.history.push("/deviceName");
    } else {
      // alert("Serial numbers do not match 33");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceType");
  };

  render() {
    let centerText = {
      textAlign: "center",
      color: "white",
      fontFamily: "Crimson Text, Open Sans, sans-serif",
      maxWidth: "inherit",
    };

    let header = {
      border: "solid #e3e3e3 2px",
      maxWidth: "515px",
      display: "flex",
    };

    let buttons = {
      display: "flex",
      width: "515px",
      justifyContent: "space-between",
      align: "center",
      marginTop: "20px",
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
                  maxHeight: "inherit",
                  maxWidth: "200px",
                }}
              />
              {/* Image should be changed */}
            </div>

            <div>
              <div>
                <h1 style={centerText}>Input your Serial Number</h1>
              </div>
              <div>
                <h3 style={centerText}>It can be found lorem ipsum.</h3>
              </div>
            </div>
          </div>
          <form
            style={{
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div>
              <TextField
                required
                color="secondary"
                style={{ fontFamily: "Crimson Text", maxWidth: "inherit" }}
                label="Serial Number:"
                margin="normal"
                variant="outlined"
                value={this.state.serialNumber}
                onChange={this.handleInputChangeFor("serialNumber")}
              />
            </div>
            <div>
              <TextField
                color="secondary"
                required
                style={{ fontFamily: "Crimson Text" }}
                label="Confirm Serial Number:"
                margin="normal"
                variant="outlined"
                value={this.state.confirmSerialNumber}
                onChange={this.handleInputChangeFor("confirmSerialNumber")}
              />
            </div>
            <div style={buttons}>
              <div>
                <Button
                  variant="contained"
                  color="default"
                  component={Link}
                  to="/breakerSelect"
                >
                  Previous
                </Button>
              </div>

              <div>
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.handleNext}
                >
                  Next
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
