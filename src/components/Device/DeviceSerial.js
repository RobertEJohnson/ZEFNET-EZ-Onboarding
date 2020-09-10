import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import user from "./Images/serial.png";
import DynamicButton from '../Buttons/DynamicButton';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  borderedBox: {
    border: "solid #e3e3e3 3px",
    maxWidth: "515px",
    height: "150px",
    display: "flex",
    borderRadius: "5px",
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
  form: {
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
  },
});

class DeviceSerial extends Component {
  state = {
    serialNumber: "",
    confirmSerialNumber: "",
  };

  componentDidMount = () => {
    if (this.props.reduxState.device.serial !== {}) {
      this.setState({
        serialNumber: this.props.reduxState.device.serial.number,
        confirmSerialNumber: this.props.reduxState.device.serial.number,
      });
    }
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

  handleCopynPaste = (e) => {
    e.preventDefault();
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
              <h3 className={classes.centerFont}>
                Serial Number can be found on the sticker on the left-hand side
                of the unit. It begins with 'HC1C'
              </h3>
            </div>
          </div>
          <form className={classes.form}>
            {JSON.stringify(this.props.reduxState.user)}
            <TextField
              required
              style={{ margin: "25px auto 0px auto" }}
              className={classes.textField}
              label="Serial Number:"
              margin="normal"
              placeholder="HC1C190987067"
              variant="outlined"
              value={this.state.serialNumber || ""}
              onChange={this.handleInputChangeFor("serialNumber")}
              onCopy={this.handleCopynPaste}
              onPaste={this.handleCopynPaste}
            />

            <TextField
              required
              style={{ margin: "10px auto 0px auto" }}
              className={classes.textField}
              label="Confirm Serial Number:"
              margin="normal"
              variant="outlined"
              value={this.state.confirmSerialNumber || ""}
              onChange={this.handleInputChangeFor("confirmSerialNumber")}
              onCopy={this.handleCopynPaste}
              onPaste={this.handleCopynPaste}
            />

            <div className={classes.buttonDiv}>
                <DynamicButton type='previous' text='Previous' linkURL='/deviceType'/>
                {
                  this.state.serialNumber && this.state.serialNumber === this.state.confirmSerialNumber ? 
                  <DynamicButton key='serial-enabled-next' type='next' text='Next' handleClick={this.handleNext}/>
                  : 
                  <DynamicButton key='serial-disabled-next' type='next' text='Next' isDisabled={true}/>
                }
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
