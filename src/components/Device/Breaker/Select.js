import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, IconButton, Select, Paper, InputLabel, FormControl, MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AddBreaker from './Add';
import DynamicButton from '../../Buttons/DynamicButton';
import EditIcon from '@material-ui/icons/Edit';
import EditBreaker from './Edit';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify: 'center',
        color: theme.palette.text.secondary,
        fontFamily: 'inter, Open Sans, sans-serif',
        minHeight: '100vh', 
        minWidth: '100vw', 
        background: 'white',
        textAlign: 'center', 
    },
    paper:{
        padding: theme.spacing(2),
        borderRadius: '5px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
        minWidth: 220,
    },
    grow: {
        flexGrow: 1
    },
    hrWordDivder: {
        width: '90%',
        textAlign: 'center',
        borderBottom: '1px solid #000',
        lineHeight: '0.1em',
        margin: '0px 0px 35px 0px' 
     },
      hrWord: { 
         background: '#fff',
         padding:'0px 10px',
     },
     BottomBuffer: {
         marginBottom: '1rem'
     }
})

class BreakerSelect extends Component {

    state = {
        breakers: this.props.state.breaker.siteBreakerReducer,
        selectedBreaker: '',
        open: false,
        edit: false,
        fullBreakerInfo:{},
      };
      
      componentDidMount = ()=> {
        for (let i = 0; i <this.props.state.breaker.siteBreakerReducer.length; i++)
        {  
            if  (this.props.state.breaker.siteBreakerReducer[i].id === this.props.state.device.breaker.id ){
                this.setState({
                    ...this.state,
                    selectedBreaker: this.props.state.device.breaker.id,
                    breakers: this.props.state.breaker.siteBreakerReducer
                })
            }
        }
      } 

      componentDidUpdate(previousProps){
          if(previousProps.state.breaker.siteBreakerReducer !== this.props.state.breaker.siteBreakerReducer){
             for (let i = 0; i <this.props.state.breaker.siteBreakerReducer.length; i++)
                {  
                    if  (this.props.state.breaker.siteBreakerReducer[i].id === this.props.state.device.breaker.id ){
                        this.setState({
                            ...this.state,
                            selectedBreaker: this.props.state.device.breaker.id,
                        })
                    }
                }
          }
      }

      editBreaker = () => {
        let allBreaker = this.props.state.breaker.siteBreakerReducer
          //console.log('in Edit Breaker with breakers:', allBreaker)
          for (let i = 0; i < allBreaker.length; i++ ){
            if (allBreaker[i].id === this.state.selectedBreaker){
              //console.log('match found!', allBreaker[i])
              this.setState({
                ...this.state,
                edit: true,
                fullBreakerInfo: allBreaker[i],
              })
            }
          }
      
      }
    
      addBreaker = () => {
          this.setState ({
              ...this.state,
              open: true,
          })
      }
    
      handleClose = () => {
        this.setState ({
            ...this.state,
            open: false,
            edit: false,
        })
    }
    
      handleChange =  (event) => {
        this.setState({
          selectedBreaker: event.target.value,
        });
      }
    
      assignBreaker = () => {
        let allBreaker = this.props.state.breaker.siteBreakerReducer;
        let myBreaker = []
        if(this.state.selectedBreaker){
            for (let i = 0; i < allBreaker.length; i++ ){
                if (allBreaker[i].id === this.state.selectedBreaker){
                myBreaker.push(allBreaker[i]);
                }
            }
                this.props.dispatch({type: 'SET_BREAKER', payload: myBreaker[0]})
        }
      }

    render(){
        const {classes} = this.props;
        return(
            <Grid item style={{maxWidth: '800px'}} align='center'>
            <AddBreaker handleClose = {this.handleClose} open = {this.state.open}/>
            <EditBreaker handleClose = {this.handleClose} open = {this.state.edit} breaker={this.state.fullBreakerInfo}/>
                <Paper className={classes.paper} elevation={3}>
                    <h1>Select Your Breaker for the Device</h1>
                    <div className={classes.BottomBuffer}>
                        <p style={{margin: 'auto 40px'}}>
                            Please choose from existing below or press the 'Add Breaker' button.
                        </p>   
                    </div>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel>Choose From Existing</InputLabel>
                        <Select
                            value={this.state.selectedBreaker}
                            onChange={this.handleChange}
                            label="Breaker"
                        >
                        <MenuItem value="">
                            <em>None of these</em>
                        </MenuItem>
                        {/*Map out all breakers stored in reducer*/}
            
                        {
                            this.props.state.breaker.siteBreakerReducer.map((breaker, index)=>
                            <MenuItem value={breaker.id} key={breaker.id}>
                                <span style={{backgroundColor: '#b2ff59'}}>limit:{'\u00A0'}{breaker.limit}Amps </span> 
                                {'\u00A0'}{'\u00A0'}{breaker.name}
                            </MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    {
                        this.state.selectedBreaker?
                            <div>
                                <DynamicButton type='edit' text='Edit Site' handleClick={this.editBreaker}/>
                            </div>
                        :<></>
                    }
                    <br/>
                    <br/>
                    <h2 className={classes.hrWordDivder}><span className={classes.hrWord}>Or</span></h2>
                    <DynamicButton key='addBreaker-button-enabled' type='add' text='Add Breaker' handleClick={this.addBreaker}/>   
                    <br/>
                    <br/>
                    <Grid container direction='row'>
                        <DynamicButton type='previous' text='Previous' linkURL='/hostSelect'/>
                        <div className={classes.grow}></div>
                        {/*Conditionally render the Next button as clickable/disabled based on if a breaker is selected*/}
                        {
                            this.state.selectedBreaker ?
                                <DynamicButton key='breaker-enabled-next'
                                    type='next' text='Next' linkURL='/deviceType' handleClick={this.assignBreaker}/>

                        :
                                <DynamicButton key='breaker-disabled-next'
                                    type='next' text='Next' isDisabled={true}/>
                        }
                    </Grid>
                </Paper>
            </Grid>
)
    }
}

const mapStateToProps = state => ({
    state
});

BreakerSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles) (connect(mapStateToProps)(BreakerSelect));
