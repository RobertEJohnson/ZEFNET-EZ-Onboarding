import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Paper, Button, withStyles, Divider, Accordion, TableHead, TableRow} from '@material-ui/core';
import {AccordionSummary, AccordionDetails, Table, TableCell, TableBody, Switch, FormControlLabel} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justify: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Crimson Text, Open Sans, sans-serif',
    minHeight: '80vh', 
    background: 'white',
    textAlign: 'center',
  },
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  left:{
    width: '75px'
  },
  grow:{
    flexGrow: 1,
    minWidth: '100px'
  },
  reviewItem: {
    display: 'inline-block',
    padding: '0px',
    margin: '0px'
  },
  table: {
    maxWidth: '1000px',
  },
  reviewTable:{
      overflowX: 'auto',
      whiteSpace:'nowrap',
  }
})

class Submit extends Component {
    state = {
        tableMode: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        //console.log(this.state);
      };

    handleEditFor = (index) => {
        //console.log('in handleEditFor', index)
        //console.log('selected device:', this.props.state.allDevice[index.index]);
        //supply newdevice reducer with info for this device
        const device = this.props.state.allDevice[index.index];
        this.props.dispatch({ type: "SET_NAME", payload: device.name });
        this.props.dispatch({ type: "SET_ID", payload: device.id });
        const date = device.install_date.substring(0,10)
        this.props.dispatch({ type: "SET_DATE", payload: date});
        const site = {
            id: device.site_id,
            address: device.address,
            first_name:device.first_name,
            second_name: device.second_name,
            phone: device.phone,
            email: device.email,
            organization_id:this.props.state.organization.id
        }
        console.log('device site:', site)
        this.props.dispatch({ type: "SET_DEVICE_SITE", payload: site });
        this.props.dispatch({ type: "FETCH_SITE_BREAKERS", payload: site.id });
        const breaker = {
            description: device.description,
            id: device.breaker_id,
            limit: device.limit,
            name: device.breaker_name,
            site_id: device.site_id
        }
        console.log('device breaker:', breaker)
        this.props.dispatch({ type: "SET_BREAKER", payload: breaker });
        this.props.dispatch({ type: "SET_SERIAL", payload: {number: device.serial_number} });
        const type = {
            name: device.type_name,
            id: device.type_id,
        }
        this.props.dispatch({ type: "SET_TYPE", payload: type });
    }//end handleReviewFor
    
    handleSubmit = () =>{
        console.log('submit clicked');
        this.props.dispatch({ type: "SUBMIT_ORGANIZATION", payload:this.props.state.organization.id });
    }


    render() {
      const {classes} = this.props;
      return (
          <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
          <div className = {classes.root} style={{maxWidth: '1000px'}}>
            <Paper className = {classes.paper}>
                <Grid item align='center'>
                    <h1>All Devices and ZefNet Users Added?</h1>
                    <h3>Let's review all your data before you submit.</h3>
                    <Divider/>
                    <h2>Here are your chosen users and corresponding information</h2>
                    <h4>Please double-check all information and each user's privileges</h4>
                    <Grid container direction = 'row-reverse'>
                        <Button component = {Link} to ="/addUser">
                            Edit <EditIcon/>
                        </Button>
                    </Grid>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email Address</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Privileges</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody> 
                            <TableRow >
                            <TableCell component="th" scope="row">
                                Ace
                            </TableCell>
                            <TableCell align="right">Fox</TableCell>
                            <TableCell align="right">afox09@gmail.com</TableCell>
                            <TableCell align="right">(203)731-1310</TableCell>
                            <TableCell align="right">View</TableCell>
                            </TableRow>
                            <TableRow >
                            <TableCell component="th" scope="row">
                                Amir
                            </TableCell>
                            <TableCell align="right">Mussa</TableCell>
                            <TableCell align="right">exampleEmail@email.com</TableCell>
                            <TableCell align="right">(612) 701-3316</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            </TableRow>
                            <TableRow >
                            <TableCell component="th" scope="row">
                                Rob
                            </TableCell>
                            <TableCell align="right">Wolfe</TableCell>
                            <TableCell align="right">exampleEmail@email.com</TableCell>
                            <TableCell align="right">(612) 701-3316</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
           <Divider/>
            <Grid item align = 'center' xs = {12}>
                <h2>Here are your devices, with breaker and location information</h2>
                <h2>Please open each device to ensure information accuracy</h2>

                <br/>
                <h3>Use Switch to View Device Table or Expandable Pages</h3>
                <Grid component="label" container alignItems="center" spacing={1} direction = 'row' justify = 'center'>
                    <Grid item>Expandable Form View</Grid>
                    <Grid item>
                        <Switch
                        checked={this.state.tableMode}
                        onChange={this.handleChange('tableMode')}
                        value="tableMode"
                        color = 'primary'
                        />
                    </Grid>
                    <Grid item>Table View</Grid>
                </Grid>
            </Grid>
            {/* Map out each device as an accordion, or a table */}
            {this.state.tableMode
            ?
                <div className={classes.reviewTable}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Device Name</TableCell>
                                <TableCell align="right">Device Type</TableCell>
                                <TableCell align="right">Serial Number</TableCell>
                                <TableCell align="right">Installation Date</TableCell>
                                <TableCell align="right">Hosting Site Address</TableCell>
                                <TableCell align="right">Contact First Name</TableCell>
                                <TableCell align="right">Contact Last Name</TableCell>
                                <TableCell align="right">Contact Phone</TableCell>
                                <TableCell align="right">Contact Email</TableCell>
                                <TableCell align="right">Breaker Name</TableCell>
                                <TableCell align="right">Breaker Limit</TableCell>
                                <TableCell align="right">Breaker Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody> 
                        {this.props.state.allDevice.map((device, index) => 
                            (
                            <TableRow key = {index} >
                                 <TableCell component="th" scope="row">
                                    {device.name}
                                </TableCell>
                                <TableCell align="right">{device.type_name}</TableCell>
                                <TableCell align="right">{device.serial_number}</TableCell>
                                <TableCell align="right"> {device.install_date.substring(0,10)}</TableCell>
                                <TableCell align="right">{device.address}</TableCell>
                                <TableCell align="right">{device.first_name}</TableCell>
                                <TableCell align="right">{device.second_name}</TableCell>
                                <TableCell align="right">{device.phone}</TableCell>
                                <TableCell align="right">{device.email}</TableCell>
                                <TableCell align="right">{device.breaker_name}</TableCell>
                                <TableCell align="right">{device.limit}{'\u00A0'} Amps</TableCell>
                                <TableCell align="right">{device.description}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            :
            < Grid item xs = {12}>
                {this.props.state.allDevice.map((device, index) => 
                (
                    <Accordion key = {index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>{device.name}</h2>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                        <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
                                <Grid item align='center' xs={12}>
                                    
                                    <Divider/>
                                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                                        <div className = {classes.left}/>
                                        <h2>Hosting Location</h2> 
                                        <Button onClick={()=>{this.handleEditFor({index})}}
                                         component = {Link} to ="/hostSelect"
                                        >
                                            Edit <EditIcon/>
                                        </Button>
                                </Grid>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <h3 style={{display: 'inline-block'}}>Address:{'\u00A0'}{'\u00A0'}</h3>
                                    <p style={{display: 'inline-block'}}>
                                        {device.address}
                                    </p>
                                </Grid>

                                <Grid item align='center' xs={12}>
                                    <br/>
                                    <Divider/>
                                <h2>Local Contact for Location</h2>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>First Name:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.first_name}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={classes.reviewItem}>Second Name:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.second_name}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={classes.reviewItem}>Phone Number:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.phone}
                                        </p>
                                    </div> 
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Email:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.email}
                                        </p>
                                    </div>
                                </Grid>
                            
                                <Grid item align='center' xs={12}>
                                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                                     <div className = {classes.left}/>
                                        <h2>Breaker Information</h2> 
                                        <Button onClick={()=>{this.handleEditFor({index})}}
                                            component = {Link} to ="/breakerSelect">
                                            Edit <EditIcon/>
                                        </Button>
                                </Grid>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Breaker Name:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.breaker_name}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={classes.reviewItem}>Breaker Limit:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.limit}{'\u00A0'}Amps
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Breaker Description:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.description}
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item align='center' xs={12}>
                                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                                        <div className = {classes.left}/>
                                        <h2>Device Type</h2> 
                                        <Button onClick={()=>{this.handleEditFor({index})}}
                                        component = {Link} to ="/deviceType">
                                            Edit <EditIcon/>
                                        </Button>
                                </Grid>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Device Type:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                            {device.type_name}
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item align='center' xs={12}>
                                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                                        <div className = {classes.left}/>
                                        <h2>Device Information</h2> 
                                        <Button onClick={()=>{this.handleEditFor({index})}}
                                            component = {Link} to ="/deviceSerial">
                                            Edit <EditIcon/>
                                        </Button>
                                </Grid>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{margin: '10px 0px'}}>Serial Number:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                        {device.serial_number}
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item align='center' xs={12}>
                                <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                                        <div className = {classes.left}/>
                                        <h2>Additional Information</h2> 
                                        <Button onClick={()=>{this.handleEditFor({index})}}
                                         component = {Link} to ="/deviceName">
                                            Edit <EditIcon/>
                                        </Button>
                                </Grid>
                                </Grid>

                                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginTop: '10px'}}>Charger Name:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem}>
                                        {device.name}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={classes.reviewItem} style={{marginBottom: '10px'}}>Installation Date:{'\u00A0'}{'\u00A0'}</h3>
                                        <p className={classes.reviewItem} >
                                            {device.install_date.substring(0,10)}
                                        </p>
                                    </div>
                                </Grid>
        
                            </Grid>
                         </AccordionDetails>
                        </Accordion>
                    ))}
                    </Grid>
                    }
                    <Grid container direction = 'row' justify = 'center' alignContent = 'center' style={{marginTop: '35px'}}>
                            <Button variant ='contained'
                            component = {Link} to ="/organizationHome">
                                <ChevronLeftIcon/> Home
                            </Button>
                            <div className = {classes.grow}>{'\u00A0'}</div>
                            <Button variant = 'contained' color = 'primary'
                            size = 'large'
                            component = {Link} to ="/completed"
                            onClick = {this.handleSubmit}
                            >
                                <SaveIcon/> Submit Onboarding Package for Review
                            </Button>
                        
                        </Grid> 
                    
            </Paper>
          </div>  
          </Grid>
      );
    }
  }
  
 Submit.propTypes = {
      classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
      state
  })
  
  export default withStyles(styles)(connect(mapStateToProps)(Submit));