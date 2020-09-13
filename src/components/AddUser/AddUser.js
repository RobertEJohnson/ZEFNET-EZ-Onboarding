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
import UserTableRow from './UserTableRow'
import DynamicButton from '../Buttons/DynamicButton'

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
    height: "fit-content",
    width: "fit-content",
    maxWidth: '1000px',
    textAlign: 'center'
  },
  reviewTable:{
      overflowX: 'auto',
      whiteSpace:'nowrap',
  },
  MiniTextFields:{
    maxWidth: '175px',
    margin: '5px'
  },
  Title: {
    border: "solid #e3e3e3 2px",
    maxWidth: "515px",
    height: "125px",
    display: "flex",
    borderRadius: "5px",
  },
  TableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5',
    },
  },
  ButtonContainer: {
    display: "flex",
    width: "515px",
    justifyContent: "space-between",
    align: "center",
    marginTop: "20px",
    marginLeft: "30px",
  }
});

class AddUser extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    editor: "",
    toggle: false,
    tableRows: this.props.reduxState.zefUser,
    open:false,
  };

  componentDidUpdate(previousProps){
    if(previousProps.reduxState.zefUser !== this.props.reduxState.zefUser){
      this.setState({
        ...this.state,
        tableRows: this.props.reduxState.zefUser
      })
    }
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAddUser = () => {
    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.email &&
      this.state.phone &&
      this.state.editor !== ""
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
                    Oops!  Please ensure all required information is entered.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick = {this.handleClose}>
                  OK
              </Button>
            </DialogActions>
          </Dialog>
        <Grid item xs={8} align="center">
          <Paper className={classes.paper} elevation={3}>
            <h1>Administrative Users</h1>
            <h3>
              {/* {JSON.stringify(this.props.reduxState.zefUser)} */}
              These are who have access to information on the ZEFNET Portal
            </h3>
              <Table className={classes.reviewTable} inputProps={{className: classes.TableRow}}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Privileges</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{border: '1px solid #e0e0e0'}}>
                  {this.props.reduxState.zefUser.map( user => 
                      <UserTableRow key={user.id} first_name={user.first_name} last_name={user.last_name} email={user.email}
                        phone={user.phone} editor={user.editor} user_id={user.id}/>
                  )}
                </TableBody>
              </Table>
              <br/>
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
                  <Grid container dircetion = 'row' justify =  'center' alignItems = 'center' spacing ={1}>
                    <TextField
                      required
                      color="primary"
                      className = {classes.MiniTextFields}
                      label="First Name:"
                      variant="filled"
                      value={this.state.first_name}
                      onChange={this.handleInputChangeFor("first_name")}
                    />
                    <TextField
                      required
                      color="primary"
                      className = {classes.MiniTextFields}
                      label="Last Name:"
                      variant="filled"
                      value={this.state.last_name}
                      onChange={this.handleInputChangeFor("last_name")}
                    />
                    <TextField
                      required
                      color="primary"
                      className = {classes.MiniTextFields}
                      label="Email:"
                      variant="filled"
                      value={this.state.email}
                      onChange={this.handleInputChangeFor("email")}
                    />
                    <TextField
                      color="primary"
                      className = {classes.MiniTextFields}
                      label="Phone:"
                      variant="filled"
                      value={this.state.phone || ""}
                      onChange={this.handleInputChangeFor("phone")}
                    />
                    <FormControl variant="filled" style={{width:'140px'}}>
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
                <br/>
              <div className={classes.ButtonContainer}>
                  <DynamicButton  type='home' text='Home' linkURL='/organizationHome'/>

                  <DynamicButton type='add' text='Add User' handleClick={this.handleAddUser}/>

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
