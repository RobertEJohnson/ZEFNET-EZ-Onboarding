import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DynamicButton from "../Buttons/DynamicButton";

const styles = (theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "transparent",
    justify: "center",
    margin: "0px",
    borderRadius: "5px",
    border: "none",
    color: "white",
  },
  input: {
    color: "white",
    border: `1px solid white`,
    backgroundColor: "#1c2447",
    outline: `1px solid transparent`, // we use a transparent outline here so the component doesn't move when focused
  },
  longField: {
    width: "388px",
  },
});

class RegisterPage extends Component {
  state = {
    invalidEmail: false,
    open: false,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    confirm_password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (
      this.state.email &&
      this.state.password &&
      this.state.first_name &&
      this.state.last_name
    ) {
      if (this.state.password === this.state.confirm_password) {
        const lowerEmail = this.state.email.toLowerCase();
        this.props.dispatch({
          type: "REGISTER",
          payload: {
            email: lowerEmail,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
          },
        });
        this.props.history.push("/home");
      } else {
        //open error dialog for password mismatch
        this.setState({ ...this.state, open: true });
      }
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handlePhoneNumberChange = (value) => {
    this.setState({
      phone: value,
    });
  };

  checkEmail = (e) => {
    console.log("YAY");
    const value = e.target.value;
    if (value.includes("@") && value.includes(".")) {
      this.setState({
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
      console.log("Yup");
    }
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        item
        align="center"
        style={{ marginBottom: "100px", position: "relative" }}
      >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="password-missmatch"
          aria-describedby="make-sure-passwords-match"
        >
          <DialogContent>
            <DialogContentText id="make-sure-passwords-match">
              Oops! Passwords don't match!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Paper className={classes.paper} elevation={0}>
          <h1>Create User Account</h1>
          <div>
            <TextField
              required
              variant="outlined"
              style={{ maxWidth: "185px", marginRight: "15px" }}
              name="first_name"
              label="First Name"
              value={this.state.first_name}
              onChange={this.handleInputChangeFor("first_name")}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
            <TextField
              required
              variant="outlined"
              label="Last Name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChangeFor("last_name")}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </div>
          <br />
          <div>
            <TextField
              required
              variant="outlined"
              label="Email"
              name="email"
              error={this.state.invalidEmail}
              onBlur={this.checkEmail}
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
              style={{ minWidth: "398px" }}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </div>
          <br />
          <div>
            <TextField
              required
              variant="outlined"
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
              style={{ minWidth: "398px" }}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </div>
          <br />
          <div>
            <TextField
              required
              variant="outlined"
              type="password"
              name="confirm_password"
              label="Confirm Password"
              value={this.state.confirm_password}
              onChange={this.handleInputChangeFor("confirm_password")}
              style={{ minWidth: "398px" }}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </div>
          <br />
          <div>
            <MuiPhoneNumber
              defaultCountry={"us"}
              variant="outlined"
              disableAreaCodes="true"
              label="Primary Phone (optional)"
              name="phone"
              type="tel"
              value={this.state.phone}
              onChange={this.handlePhoneNumberChange}
              style={{ minWidth: "398px" }}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </div>
          <br />
          <div>
            <DynamicButton
              type="glow"
              handleClick={this.registerUser}
              text="Create Account!"
              style={{ marginLeft: "105px" }}
            />
            <DynamicButton
              type="dark"
              handleClick={() =>
                this.props.dispatch({ type: "SET_TO_LOGIN_MODE" })
              }
              text="Existing User?"
            />
            <br />
          </div>
        </Paper>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));
