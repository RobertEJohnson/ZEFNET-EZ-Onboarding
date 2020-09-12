import React, { Component } from "react";
import { connect } from "react-redux";
import { 
   Grid,
   Paper, 
   TextField, 
   withStyles, 
   Divider,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import user from "./Images/serial.png";
import DynamicButton from '../Buttons/DynamicButton';
import zefpro from "./Images/zefproArrow.png";
import {Link} from 'react-router-dom';

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
    paddingLeft: "10px",
    textAlign: "center",
    color: "black",
    fontFamily: "inter, Open Sans, sans-serif",
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
    fontFamily: "inter, Open Sans, sans-serif",
    width: "400px",
  },
});

class DeviceSerial extends Component {
  state = {
    serialNumber: "",
    confirmSerialNumber: "",
    serialNumber2: "",
    confirmSerialNumber2: "",
    open: false,
  };

  componentDidMount = () => {
    if (this.props.reduxState.device.serial !== {}) {
      this.setState({
        serialNumber: this.props.reduxState.device.serial.number,
        confirmSerialNumber: this.props.reduxState.device.serial.number,
        serialNumber2: this.props.reduxState.device.serial2,
        confirmSerialNumber2: this.props.reduxState.device.serial2,
        open: false,
      });
    }
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleNext = () => {
    // open dialog if the user is creating a new device and adding a serial that already exists
    const allDevice = this.props.reduxState.allDevice;
    let match = 0
    if (this.props.reduxState.device.id === "" ){
        for (let i = 0; i <allDevice.length; i++){
          if ((allDevice[i].serial_number === (this.state.serialNumber ||this.state.serialNumber2))
          ||(allDevice[i].serial_number2 === (this.state.serialNumber ||this.state.serialNumber2))){
            this.setState({
              ...this.state,
              open: true
            })
            match++;
          }
        }
      }
    //if user is editing an existing device and trying to set the serial number to one that 
    //isnt associated with this device throw the same error
    // if serial number(s) match their confirmation number(s), set the number to 
    //redux state.device.serial and advance to device name
  if(match === 0)
    { if (
        this.state.serialNumber === this.state.confirmSerialNumber &&
        this.state.serialNumber !== ""
      ) {
        const actionObject = {
          number: this.state.serialNumber,
          user_id: this.props.reduxState.user.id,
        };  
          if (
            this.state.serialNumber2 === this.state.confirmSerialNumber2 &&
            this.state.serialNumber2 !== ""
          ) {
            
            this.props.dispatch({ type: "SET_SERIAL2", payload: this.state.serialNumber2 });
          } 
        this.props.dispatch({ type: "SET_SERIAL", payload: actionObject });
        this.props.history.push("/deviceName");
      } else {
        alert("Serial input incorrect");
      }}
    
  };

  handleCopynPaste = (e) => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} style={{ maxWidth: "1000px" }} align="center">
        {/* Dialog runs if adding new device with existing serial number */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="existing-serial"
          aria-describedby="serial-number-already-created"
          >
              <DialogContent>
                  <DialogContentText id="serial-number-already-created">
                      Oops, a device with that serial has already been added to your list of devices!
                      Do you want to go back and change the serial number(s) on this device or discard
                      your current changes and review your existing devices?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                  Change Serial Number
              </Button>
              <Button component = {Link} to = '/submit'>
                  Discard changes and review devices.
              </Button>
              </DialogActions>
          </Dialog>
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.borderedBox}>
            {this.props.reduxState.device.type.id === 4?
            <>
              <img
                src={zefpro}
                alt={this.props.reduxState.device.type.name}
                className={classes.image}
              />
              <div>
                <h1 className={classes.centerFont}>ZEFNET Pro Serial</h1>
                <h3 className={classes.centerFont}>
                Serial number can be found on the name plate on the bottom left hand corner of the ZEFNET Pro.
                </h3>
              </div>
            </>
            :
            <>
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
          </>
          }
          </div>
          <form className={classes.form}>
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
            <br/>
            {/* conditionally render second serial number inputs if
            device is dual head pedestal model */}
            {this.props.reduxState.device.type.id === 3&&
            <>
              <Divider/>
              <h2>Input Second Serial Number</h2>
              <h4>Dual Head Pedestal models have a serial number in the same location on each head</h4>
              <TextField
                required
                style={{ margin: "25px auto 0px auto" }}
                className={classes.textField}
                label="Second Serial Number:"
                margin="normal"
                variant="outlined"
                value={this.state.serialNumber2 || ""}
                onChange={this.handleInputChangeFor("serialNumber2")}
                onCopy={this.handleCopynPaste}
                onPaste={this.handleCopynPaste}
              />
              <TextField
                required
                style={{ margin: "10px auto 0px auto" }}
                className={classes.textField}
                label="Confirm Second Serial Number:"
                margin="normal"
                variant="outlined"
                value={this.state.confirmSerialNumber2 || ""}
                onChange={this.handleInputChangeFor("confirmSerialNumber2")}
                onCopy={this.handleCopynPaste}
                onPaste={this.handleCopynPaste}
              />
              <br/>
            </>}
            <div className={classes.buttonDiv}>
                <DynamicButton type='previous' text='Previous' linkURL='/deviceType'/>
                {
                  this.state.serialNumber
                  &&this.state.serialNumber !== this.state.serialNumber2 
                  && this.state.serialNumber === this.state.confirmSerialNumber 
                  &&((this.state.serialNumber2 === this.state.confirmSerialNumber2 && this.state.serialNumber2)
                  || this.props.reduxState.device.type.id !==3
                  )? 
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
