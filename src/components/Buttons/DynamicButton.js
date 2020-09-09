import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';


const styles = {
    Button:{
        transition: 'all .2s ease-in-out',
        height: '36px'
    },
    'Button--glow':{
        color: '#006dcc',
        backgroundColor: '#f1f1f1',
        '&:hover':{
          transform: 'scale(1.03)',
          color: '#006dcc',
          backgroundColor: 'white', 
          boxShadow: '0 0 5px #c8ffff,-5px 0 10px #66fbfb, 5px 0 15px #049494'
        }
    },
    'Button--dark':{
        color: 'white',
        backgroundColor: '#1c2447',
        fontSize: '12px',
        borderRadius: '5px',
        position: 'absolute',
        right: '0px',
        '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#243953',
        }
      },
    'Button--previous':{
        paddingLeft: '8px',
        '&:hover': {
            transform: 'scale(1.03)',
        }
    },
    'Button--next':{
        paddingRight: "8px",
        backgroundColor: "#3f51b5",
        color: "white",
        '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#757de8',
        }
    },
    'Button__textContainer':{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}

class DynamicButton extends Component{
    state = {
        type: ''
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            type: `Button__${this.props.type}`
        })
    }
    render(){
        const {classes} = this.props;
        const buttonClasses = classNames(
            classes.Button, 
            {[classes['Button--glow']]: (this.props.type === 'glow')},
            {[classes['Button--dark']]: (this.props.type === 'dark')},
            {[classes['Button--previous']]: (this.props.type === 'previous')},
            {[classes['Button--next']]: (this.props.type === 'next')},
            );
        return(
            <>
                {
                    this.props.linkURL ?
                        <Button variant='contained' className={buttonClasses} disabled={this.props.isDisabled} 
                            component={Link} to={this.props.linkURL}>
                            <span className={classes.Button__textContainer}>
                                {this.props.type === 'previous' ? <ChevronLeft/> : <></>}
                                {this.props.text}
                                {this.props.type === 'next' ? <ChevronRight/> : <></>}
                            </span>
                        </Button>
                        :
                        <Button variant='contained' className={buttonClasses} disabled={this.props.isDisabled}
                            onClick={this.props.handleClick}>
                            <span className={classes.Button__textContainer}>
                                {this.props.type === 'previous' ? <ChevronLeft/> : <></>}
                                {this.props.text}
                                {this.props.type === 'next' ? <ChevronRight/> : <></>}
                            </span>
                        </Button>
                }
            </>
        )
    }
}

DynamicButton.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(DynamicButton);