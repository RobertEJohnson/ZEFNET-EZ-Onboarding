import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, TextField, Button, withStyles } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import PropTypes from "prop-types";
import user from "../Organization/zefUser.jpeg";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
});

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
        number: this.state.serialNumber,
        user_id: this.props.reduxState.user.id,
      };
      this.props.dispatch({ type: "SET_SERIAL", payload: actionObject });
      this.props.history.push("/deviceName");
    } else {
      alert("Serial input incorrect");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceType");
  };

  handleOnFocusOut = () => {
    if (
      this.state.serialNumber === this.state.confirmSerialNumber &&
      this.state.serialNumber !== ""
    ) {
      // Remove.attribute("disabled")
    }
  };

  render() {
    const { classes } = this.props;

    let centerText = {
      paddingLeft: "15px",
      textAlign: "center",
      color: "black",
      fontFamily: "Crimson Text, Open Sans, sans-serif",
      maxWidth: "inherit",
    };

    let header = {
      border: "solid #e3e3e3 2px",
      maxWidth: "515px",
      height: "150px",
      display: "flex",
      borderRadius: "5px",
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
          // background: "linear-gradient(360deg, #041E41, #004e92 70%)",
        }}
      >
        <Grid item xs={8} style={{ maxWidth: "1000px" }} align="center">
          <Paper className={classes.paper} elevation={3}>
            <div style={header}>
              <div>
                <img
                  src={user}
                  style={{
                    maxHeight: "146px",
                    maxWidth: "150px",
                  }}
                  alt="zef charger"
                />
                {/* Image should be changed */}
              </div>
              <div>
                <div>
                  <h1 style={centerText}>Input your Serial Number</h1>
                </div>
                <div>
                  <h3 style={centerText}>It can be found in image.</h3>
                </div>
              </div>
            </div>
            <form
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0px",
              }}
            >
              <div>
                <TextField
                  required
                  color="secondary"
                  style={{
                    fontFamily: "Crimson Text",
                    maxWidth: "inherit",
                    minWidth: "400px",
                  }}
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
                  style={{ fontFamily: "Crimson Text", minWidth: "400px" }}
                  label="Confirm Serial Number:"
                  margin="normal"
                  variant="outlined"
                  value={this.state.confirmSerialNumber}
                  onChange={this.handleInputChangeFor("confirmSerialNumber")}
                  // onfocusout={this.handleOnFocusOut}
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
                    <ChevronLeft /> Previous
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={this.handleNext}
                    style={{ width: "131px" }}
                  >
                    Next <ChevronRight />
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

DeviceSerial.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(DeviceSerial));
