import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import UserTableRow from "./UserTableRow";
import DynamicButton from "../Buttons/DynamicButton";
import MuiPhoneNumber from "material-ui-phone-number";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
    height: "fit-content",
    width: "fit-content",
    maxWidth: "1000px",
    textAlign: "center",
  },

  ReviewTable: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    border: "1px solid #C0c0c0",
  },
  textFields: {
    maxWidth: "175px",
    margin: "5px",
  },
  MiniTextFields: {
    maxWidth: "175px",
    margin: "5px",
  },
  ButtonContainer: {
    display: "flex",
    width: "540px",
    justifyContent: "space-between",
    align: "center",
    marginTop: "20px",
    marginLeft: "5px",
  },
  SubTitle: {
    fontSize: "18px",
    marginBottom: "1rem",
  },
  ReviewTable__head:{
    backgroundColor: '#C0C0C0'
  },
  ReviewTable__head__cell:{
    border: '1px solid black',
    padding: '8px',
  },
  tip:{
    fontSize: 'smaller',
    color:'#757575'
  }
});

class AddUser extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    editor: "",
    tableRows: this.props.reduxState.zefUser,
    open: false,
    edit: 0,
    invalidEmail:false
  };

  componentDidUpdate(previousProps) {
    if (previousProps.reduxState.zefUser !== this.props.reduxState.zefUser) {
      this.setState({
        ...this.state,
        tableRows: this.props.reduxState.zefUser,
      });
    }
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  checkEmail = (e) => {
    const value = e.target.value;
    if (value.includes("@") && value.includes(".")) {
      this.setState({
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
    }
  };

  handleAddUser = () => {
    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.email &&
      this.state.phone &&
      this.state.editor !== ""&&
      !this.state.invalidEmail
    ) {
      const actionObject = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        editor: this.state.editor,
        organization_id: this.props.reduxState.organization.id,
      };
      console.log(actionObject);
      this.props.dispatch({ type: "ADD_USER", payload: actionObject });
      this.setState({
        ...this.state,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        editor: "",
      });
    } else {
      //open alert dialog
      this.handleOpen();
    }
  };

  handlePhoneNumberChange = (value) => {
    this.setState({
      phone: value,
    });
  };

  handleEditMode = () =>{
    let x = this.state.edit;
    x++
    this.setState({...this.state, edit:x})
  }
  
  handleViewMode = () =>{
    let x = this.state.edit;
    x--
    this.setState({...this.state, edit:x})
  }


  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        style={{
          minHeight: "75vh",
          minWidth: "100vw",
        }}
      >
        {/* This dialog will run if add user is clicked without required fields filled */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="missing-fields"
          aria-describedby="enter-all-user-info-before-add"
        >
          <DialogContent>
            <DialogContentText id="enter-all-user-info-before-add">
              Oops! Please ensure all required information is entered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={8} style={{ minWidth: "1000px" }} align="center">
          <Paper className={classes.paper} elevation={3}>
            <h1>Administrative Users</h1>
            <p className={classes.SubTitle}>
              These employees will have access to information on the ZEFNET
              Portal
            </p>
            <Table
              className={classes.ReviewTable}
              inputProps={{ className: classes.TableRow }}
            >
              <TableHead className={classes.ReviewTable__head}>
                <TableRow>
                  <TableCell className={classes.ReviewTable__head__cell} />
                  <TableCell className={classes.ReviewTable__head__cell}>
                    First Name
                  </TableCell>
                  <TableCell className={classes.ReviewTable__head__cell}>
                    Last Name
                  </TableCell>
                  <TableCell className={classes.ReviewTable__head__cell}>
                    Email
                  </TableCell>
                  <TableCell className={classes.ReviewTable__head__cell}>
                    Phone
                  </TableCell>
                  <TableCell className={classes.ReviewTable__head__cell}>
                    Privileges
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.reduxState.zefUser.map((user, index) => (
                  <UserTableRow
                    key={user.id}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    phone={user.phone}
                    editor={user.editor}
                    user_id={user.id}
                    editMode = {this.handleEditMode} 
                    viewMode = {this.handleViewMode}
                  />
                ))}
              </TableBody>
            </Table>
            <br />
            <h2>Add a New User</h2>

            <form
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "inherit",
                padding: "0px",
                height: "fit-content",
              }}
            >
              <Grid
                container
                dircetion="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  required
                  color="primary"
                  className={classes.MiniTextFields}
                  label="First Name:"
                  variant="filled"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
                <TextField
                  required
                  color="primary"
                  className={classes.MiniTextFields}
                  label="Last Name:"
                  variant="filled"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                />
                <TextField
                  required
                  color="primary"
                  error={this.state.invalidEmail}
                  onBlur={this.checkEmail}
                  className={classes.MiniTextFields}
                  label="Email:"
                  variant="filled"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
                <MuiPhoneNumber
                  color="primary"
                  defaultCountry={"us"}
                  disableAreaCodes="true"
                  className={classes.MiniTextFields}
                  label="Phone:"
                  variant="filled"
                  value={this.state.phone || ""}
                  onChange={this.handlePhoneNumberChange}
                />
                <FormControl variant="filled" style={{ width: "140px" }}>
                  <InputLabel>Privileges:</InputLabel>
                  <Select
                    required
                    onChange={this.handleInputChangeFor("editor")}
                    className={classes.MiniTextFields}
                    value={this.state.editor || ""}
                  >
                    <MenuItem value="False">View</MenuItem>
                    <MenuItem value="True">Edit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <br />
              <div className={classes.ButtonContainer}>
                {this.state.edit?
                <>
                  <DynamicButton
                    type="home"
                    text="Home"
                    isDisabled = {true}
                    />
                   <i className = {classes.tip}>please save or discard user changes</i>
                </>
                :
                <DynamicButton
                  type="home"
                  text="Home"
                  linkURL="/organizationHome"
                />
                }
                <DynamicButton
                  type="add"
                  text="Add User"
                  handleClick={this.handleAddUser}
                />
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

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(AddUser));
