import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, withStyles, TextField, Button } from "@material-ui/core";
import {ChevronLeft, EvStation} from '@material-ui/icons';
import PropTypes from "prop-types";
import user from "../Organization/zefUser.jpeg";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
});

class DeviceName extends Component {
  state = {
    chargerName: "",
    installationDate: "",
  };

  componentDidMount = ()=> {
    if( this.props.reduxState.device.name !== '' ){
        this.setState({
            chargerName: this.props.reduxState.device.name,
            installationDate: this.props.reduxState.device.date,
        })
    }
  } 

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleNext = () => {
    if (this.state.chargerName && this.state.installationDate !== "") {
      this.props.dispatch({
        type: "SET_NAME",
        payload: this.state.chargerName,
      });
      this.props.dispatch({
        type: "SET_DATE",
        payload: this.state.installationDate,
      });

      this.props.history.push("/deviceReview"); //change this
    } else {
      alert("Oops! Please enter both a name and installation date for your device");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceSerial");
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
                  alt = {this.props.reduxState.device.type.name}
                />
                {/* Image should be changed */}
              </div>

              <div>
                <div>
                  <h1 style={centerText}>Name your Device</h1>
                </div>
                <div>
                  <h3 style={centerText}>
                    Good names should be short and memorable and descriptive..
                  </h3>
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
                  label="Charger Name:"
                  margin="normal"
                  variant="outlined"
                  value={this.state.chargerName || "" }
                  onChange={this.handleInputChangeFor("chargerName")}
                />
              </div>
              <div>
                <TextField
                  color="secondary"
                  required
                  type="Date"
                  style={{ fontFamily: "Crimson Text", minWidth: "400px" }}
                  label=""
                  margin="normal"
                  variant="outlined"
                  value={this.state.installationDate || ""}
                  onChange={this.handleInputChangeFor("installationDate")}
                />
              </div>
              <div style={buttons}>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    component={Link}
                    to="/deviceSerial"
                  >
                    <ChevronLeft /> Previous
                  </Button>
                </div>
                <div>
                {this.state.chargerName && this.state.installationDate ?
                    <Button
                      variant="contained"
                      color = 'primary'
                      onClick={this.handleNext}
                      style={{ width: "131px" }}
                    >
                      Review Device<EvStation/>
                    </Button>
                  :
                    <Button
                      variant="contained"
                      disabled
                      onClick={this.handleNext}
                      style={{ width: "131px" }}
                    >
                      Review Device <EvStation/>
                    </Button>
                  }
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

DeviceName.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(DeviceName));
