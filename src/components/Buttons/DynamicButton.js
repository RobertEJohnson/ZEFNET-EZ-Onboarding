import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ChevronLeft, ChevronRight, Home as HomeIcon, Edit as EditIcon} from '@material-ui/icons';

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
    'Button--edit':{
        paddingLeft: '8px',
        background: 'transparent',
        border: '1px solid grey',
        '&:hover': {
            transform: 'scale(1.03)',
        }
    },
    'Button--home':{
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
        inputProps: {},
        startIcon: '',
        endIcon: ''
    }
    componentDidMount(){
        //this object will hold input attributes from this.props for DynamicButton
        const inputProps = {};

        //add properties to inputProps depending on this.props.type
        switch(this.props.type){
            case 'edit':
                inputProps.variant = 'outlined'
                inputProps.size='small'
                break;
            default:
                inputProps.variant='contained'
                inputProps.size='medium'
        }
    
        //add properties to inputProps depending on truthy/falsy this.props.linkURL
        if(this.props.linkURL){
            inputProps.component = Link
            inputProps.to= this.props.linkURL
        }
        else{
            inputProps.variant='contained'
            inputProps.size='medium' 
        }
        
        //set starting values of icons to React Fragment
        let startIcon = <></>;
        let endIcon = <></>;

        //update values of icon depending on this.props.type
        switch(this.props.type){
            case 'previous':
                startIcon = <ChevronLeft/>;
                break;
            case 'next':
                endIcon = <ChevronRight/>;
                break;
            case 'edit':
                startIcon = <EditIcon/>;
                break;
            case 'home':
                startIcon = <HomeIcon/>;
                break;
        }

        //set input attribute object and icon values as state values
        this.setState({
            ...this.state,
            startIcon,
            endIcon,
            inputProps
        })
    }
    render(){
        const {classes} = this.props;

        //conditionally add classes and bundle classes together, from type prop value
        //this uses the classnames dependency: https://www.npmjs.com/package/classnames
        const buttonClasses = classNames(
            classes.Button, 
            {[classes['Button--glow']]: (this.props.type === 'glow')},
            {[classes['Button--dark']]: (this.props.type === 'dark')},
            {[classes['Button--previous']]: (this.props.type === 'previous')},
            {[classes['Button--next']]: (this.props.type === 'next')},
            );
        return(
            <>
                {/*Spread conditional attributes from state*/}
                <Button className={buttonClasses} {...this.state.inputProps}>
                    <span className={classes.Button__textContainer}>
                        {/*Render held icon values, before/after props text*/}
                        {this.state.startIcon}
                        {this.props.text}
                        {this.state.endIcon}
                    </span>
                </Button>
            </>
        )
    }
}

DynamicButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DynamicButton);