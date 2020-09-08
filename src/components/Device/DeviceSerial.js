import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Paper, TextField, Button, withStyles } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import PropTypes from "prop-types";
import user from "./serial.png";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  previousButton: {
    paddingLeft: '8px',
  },
  nextButton: {
    paddingRight: '8px', 
  },
  borderedBox: {
    border: "solid #e3e3e3 3px",
    maxWidth: "515px",
    height: "150px",
    display: "flex",
    borderRadius: '5px'
  },
  image: {
    maxHeight: "145px",
    maxWidth: "145px",
  },
  centerFont: {
    paddingLeft: "15px",
    textAlign: "center",
    color: "black",
    fontFamily: "Crimson Text, Open Sans, sans-serif",
    maxWidth: "inherit",
  },
  form:{
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0px",
  },
  buttonDiv: {
      display: "flex",
      width: "515px",
      justifyContent: "space-between",
      align: "center",
      marginTop: "20px",
  },
  textField: {
    fontFamily: "Crimson Text, Open Sans, sans-serif",
    width: "400px",
  }
  
});

class DeviceSerial extends Component {
  state = {
    serialNumber: "",
    confirmSerialNumber: "",
  };

  componentDidMount = ()=> {
    if( this.props.reduxState.device.serial !== {} ){
        this.setState({
            serialNumber: this.props.reduxState.device.serial.number,
            confirmSerialNumber: this.props.reduxState.device.serial.number,
        })
    }
  } 

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

    return (
        <Grid item xs={12} style={{ maxWidth: "1000px" }} align="center">
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.borderedBox}>
                <img
                  src={user}

                  alt={this.props.reduxState.device.type.name}
                  className={classes.image}

                />
              <div>
                <h1 className={classes.centerFont}>Input your Serial Number</h1>
                <h3 className={classes.centerFont}>Serial Number can be found on the sticker on the left-hand side of the unit.
                It begins with 'HC1C'</h3>
              </div>
            </div>
            <form
              className={classes.form}
            >
                <TextField
                  required
                  style={{margin:'25px auto 0px auto'}}
                  className={classes.textField}
                  label="Serial Number:"
                  margin="normal"
                  placeholder = 'HC1C190987067'
                  variant="outlined"
                  value={this.state.serialNumber || "" }
                  onChange={this.handleInputChangeFor("serialNumber")}
                />

                <TextField
                  required
                  style={{margin:'10px auto 0px auto' }}
                  className={classes.textField}
                  label="Confirm Serial Number:"
                  margin="normal"
                  variant="outlined"
                  value={this.state.confirmSerialNumber || "" }
                  onChange={this.handleInputChangeFor("confirmSerialNumber")}
                  // onfocusout={this.handleOnFocusOut}
                />

              <div className={classes.buttonDiv}>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    component={Link}
                    to="/deviceType"
                    className={classes.previousButton}
                  >
                    <ChevronLeft /> Previous
                  </Button>
                </div>
                <div>
                  {this.state.serialNumber && this.state.serialNumber === this.state.confirmSerialNumber?
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.nextButton}
                  >
                    Next <ChevronRight />
                  </Button>
                  :
                  <Button
                  disabled
                  variant='contained'
                  className={classes.nextButton}
                >
                  Next <ChevronRight/>
                </Button>
                  }
                </div>
              </div>
            </form>
          </Paper>
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
