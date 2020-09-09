import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = {
    Button:{
        transition: 'all .2s ease-in-out',
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
    'Button__text':{
        fontFamily: 'Titillium Arial Helvetica'
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
        const conditionalClasses = classNames(
            classes.Button, 
            {[classes['Button--glow']]: (this.props.type === 'glow')},
            {[classes['Button--dark']]: (this.props.type === 'dark')}
            );
        return(
            <>
                {
                    this.props.linkURL ?
                        <Button variant='contained' className={conditionalClasses} component={Link} to={this.props.linkURL}>
                            <span className={classes.BasicButton__text}>{this.props.text}</span>
                        </Button>
                        :
                        <Button variant='contained' className={conditionalClasses} onClick={this.props.handleClick}>
                            <span className={classes.BasicButton__text}>{this.props.text}</span>
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