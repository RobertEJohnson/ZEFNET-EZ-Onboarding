import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    withStyles, 
    TextField,
    IconButton,
    TableRow,
    TableCell,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Delete, Edit, SaveAlt} from "@material-ui/icons";

const styles = (theme) => ({
    TableRow:{
        overflowX: 'scroll',
        whiteSpace:'nowrap',
        maxWidth: '1000px'
    },
    ViewCell:{
        maxWidth: '200px',
        overflow: 'scroll'
    },
    EditCell:{
        maxWidth: '200px',
        overflow: 'scroll'
    }
});

class UserTableRow extends Component{
    state = {
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        phone: this.props.phone,
        edit_mode: false,
        editor: this.props.editor,
        organization_id: this.props.state.organization.id
      };
      
      handleChange = (event) => {
        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value });
      };

      handleDelete = () => {
        this.props.dispatch({ type: "DELETE_ZEFUSER", payload: {id:this.props.user_id, organization_id: this.state.organization_id}});
      };

      handleEdit = () => {
        const changesMade= 
            this.state.first_name !== this.props.first_name ||
            this.state.last_name !== this.props.last_name ||
            this.state.email !== this.props.email || 
            this.state.phone !== this.props.phone || 
            this.state.editor !== this.props.editor;

        this.setState({ edit_mode: !this.state.edit_mode }, ()=>{
            if(changesMade){
                console.log('sending edit for id:', this.props.user_id)
                const actionObject = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    editor: this.state.editor,
                    id: this.props.user_id
                    };
               this.props.dispatch({ type: "UPDATE_ZEFUSER", payload: actionObject});  
            }
        })
      };

    render(){
        const {classes} = this.props;
        return(
                    <TableRow hover className={classes.TableRow}>
                        <TableCell>
                            <IconButton onClick={this.handleEdit}>
                                {!this.state.edit_mode?
                                   <Edit /> 
                                   :
                                   <SaveAlt/>
                                }
                            </IconButton>
                            <IconButton onClick={this.handleDelete}>
                                <Delete />
                            </IconButton>
                        </TableCell>
                        {!this.state.edit_mode ?
                            <>
                                <TableCell className={classes.ViewCell}>{this.state.first_name}</TableCell>
                                <TableCell className={classes.ViewCell}>{this.state.last_name}</TableCell>
                                <TableCell className={classes.ViewCell}>{this.state.email}</TableCell>
                                <TableCell className={classes.ViewCell}>{this.state.phone}</TableCell>
                                <TableCell className={classes.ViewCell}>{this.state.editor ? "Edit" : "View"}</TableCell>
                            </>
                            :
                            <>
                                <TableCell className={classes.ViewCell}>
                                    <TextField className={classes.EditCell}
                                        value={this.state.first_name}
                                        name='first_name'
                                        onChange={this.handleChange}
                                        required/>
                                </TableCell>
                                <TableCell className={classes.ViewCell}>
                                    <TextField 
                                        value={this.state.last_name}
                                        name='last_name'
                                        onChange={this.handleChange}
                                        required/>
                                </TableCell>
                                <TableCell className={classes.ViewCell}>
                                    <TextField 
                                        value={this.state.email}
                                        name='email'
                                        onChange={this.handleChange}
                                        required/>
                                </TableCell>
                                <TableCell className={classes.ViewCell}>
                                    <TextField 
                                        value={this.state.phone}
                                        name='phone'
                                        onChange={this.handleChange}
                                        required/>
                                </TableCell>
                                <TableCell className={classes.ViewCell}>
                                    <TextField 
                                        value={this.state.editor}
                                        name='editor'
                                        onChange={this.handleChange}
                                        required/>
                                </TableCell>
                            </>
                        }
                    </TableRow>
        )
    }
}

const mapStateToProps = state =>({
    state
});

UserTableRow.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(UserTableRow));