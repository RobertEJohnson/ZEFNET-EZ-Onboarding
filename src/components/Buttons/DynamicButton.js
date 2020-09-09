import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ChevronLeft, ChevronRight, Home as HomeIcon, Edit as EditIcon, EvStation, Save} from '@material-ui/icons';

/*
    DynamicButton API
        |NAME|          |TYPE|            |DEFAULT|    |DESCRIPTION|
        text            string                          will be the text inside of the button
        type            'glow'                          Sets styling type and icon of button
                        | 'home'
                        | 'previous'
                        | 'next'
                        | 'edit'
                        | 'save'
                        | 'review'
                        | 'organization'
        isDisabled      boolean             false       toggles the disabled attribute
        handleClick     function()                      passed in as onClick function
        linkURL         '/string'                       will add component={Link} and set $string as to='/$string'
*/

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
        padding: '0px 6px',
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
    'Button--review':{
        paddingRight: "8px",
        backgroundColor: "#3f51b5",
        color: "white",
        '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#757de8',
        }
    },
    'Button--save':{
        paddingRight: "8px",
        backgroundColor: "#3f51b5",
        color: "white",
        '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#757de8',
        }
    },
    'Button--logOut':{
        color:'white',
        border: '1px solid white',
        backgroundColor: 'transparent',
        '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: 'white',
            color: 'black'
        }
    },
    'Button--organization':{
        color:'white',
        border: '1px solid white',
        backgroundColor: 'transparent',
        height: '40px',
        fontSize: '26px',
        paddingBottom: '6px',
        '&:hover': {
            transform: 'scale(1.02)',
            backgroundColor: 'white',
            color: 'black',
        }
    },
    'Button__textContainer':{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },

}

class DynamicButton extends Component{
    state = {
        inputProps: {},
        startIcon: '',
        endIcon: ''
    }
    componentDidMount(){
        //this object will hold input attributes from this.props for DynamicButton
        const inputProps = {onClick: this.props.handleClick, disabled: this.props.isDisabled};

        //add properties to inputProps depending on this.props.type
        switch(this.props.type){
            case 'edit':
                inputProps.variant = 'outlined'
                inputProps.size='small'
                break;
            case 'logOut':
                inputProps.variant = 'outlined'
                inputProps.size='medium'
                break;
            case 'organization':
                inputProps.variant = 'outlined'
                inputProps.size='medium'
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
            case 'review':
                endIcon = <EvStation/>;
                break;
            case 'save':
                endIcon = <Save/>
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
            {[classes['Button--review']]: (this.props.type === 'review')},
            {[classes['Button--save']]: (this.props.type === 'save')},
            {[classes['Button--logOut']]: (this.props.type === 'logOut')},
            {[classes['Button--home']]: (this.props.type === 'home')},
            {[classes['Button--edit']]: (this.props.type === 'edit')},
            {[classes['Button--organization']]: (this.props.type === 'organization')},
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