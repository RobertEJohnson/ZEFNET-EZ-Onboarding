import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";
import { withStyles, } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const styles = theme => ({ 
    input: {
      color: 'white',
      border: `1px solid white`,
      backgroundColor: '#243353',
      outline: `1px solid transparent`,// we use a transparent outline here so the component doesn't move when focused
      },
      h1Reset: {
        textAlign: "center",
        color: "white",
        fontFamily: "Crimson Text, Open Sans, sans-serif",
        padding: '0px',
        margin: '0px'
      },
      h3Reset: {
        textAlign: "center",
        color: "white",
        fontFamily: "Crimson Text, Open Sans, sans-serif",
        padding: '0px',
        margin: '0px 0px 0px 0px'
      },
})


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

    const {classes} = this.props;

    return (
        <Grid item xs={8} style={{ maxWidth: "1000px" }} align="center">
          <div>
            <h1 className={classes.h1Reset}>Organization Information</h1>
            <h2 className={classes.h3Reset}>
              This will help us associate the chargers with your organization.
            </h2>
          </div>
          <form style={{ minWidth: "400px", minHeight: "400px", margin: '0px', padding:'0px', background: "transparent" }}>
            <TextField
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text", padding: '0px', margin: '25px 0px 0px 0px'  }}
              label="Organization / Company Name"
              margin="normal"
              variant="outlined"
              value={this.state.organizationName}
              onChange={this.handleInputChangeFor("organizationName")}
              InputProps={{
                classes: {
                  root: classes.input,
                }
              }}
              InputLabelProps={{
                style: { color: '#fff' }
              }}
            />
            <TextField
              style={{ minWidth: "380px", fontFamily: "Crimson Text", padding: '0px', margin: '15px 0px 0px 0px' }}
              label="Phone Number"
              margin="normal"
              variant="outlined"
              type="number"
              value={this.state.primaryNumber}
              onChange={this.handleInputChangeFor("primaryNumber")}
              InputProps={{
                classes: {
                  root: classes.input,
                }
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <TextField
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text", padding: '0px', margin: '15px 0px 0px 0px'}}
              label="Email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
              InputProps={{
                classes: {
                  root: classes.input,
                }
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <TextField
              required
              style={{ minWidth: "380px", fontFamily: "Crimson Text", padding: '0px', margin: '15px 0px 0px 0px'}}
              label="Organization Address"
              variant="outlined"
              value={this.state.organizationAddress}
              onChange={this.handleInputChangeFor("organizationAddress")}
              InputProps={{
                classes: {
                  root: classes.input,
                }
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <Button
              variant="contained"
              style={{marginTop: "20px", margin: '15px 0px 0px 0px', color: '#006dcc', backgroundColor: 'white'}}
              color="default"
              onClick={this.handleAddOrg}
            >
              Create Organization
            </Button>
          </form>
        </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

CreateOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(CreateOrganization));
