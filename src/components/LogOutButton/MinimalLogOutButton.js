import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';

class MinimalLogOutButton extends Component{
  render(){

    return(
      <Button
      variant='outlined'
      style={{color:'grey', borderColor: 'grey'}}
      onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
      >
        Log Out
      </Button>
    )
  }}



export default connect()(MinimalLogOutButton);
