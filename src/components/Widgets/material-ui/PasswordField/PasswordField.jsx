import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import biqHelper from "lib/biqHelper";

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import {Button} from "components/Widgets/material-ui";

import "./PasswordField.scss";

class PasswordField extends Component {

  state = {
    is_show_password: false
  };

  _showToggle = () => {
    this.setState( { is_show_password: !this.state.is_show_password } );
  };

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    let label = biqHelper.utils.isNull( this.props.label ) ? 'Password' : this.props.label;
    let helperText = biqHelper.utils.isNull( this.props.helperText ) ? '' : this.props.helperText;
    let isError = biqHelper.utils.isNull( this.props.error ) ? false : this.props.error;

    return (
      <FormControl error={isError} className="w-password-field">
        <InputLabel htmlFor="component-helper">{ label }</InputLabel>
        <Input type={this.state.is_show_password ? 'text' : 'password'}/>
        <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
        <Button className={ `show-toggle-btn${this.state.is_show_password ? ' is-shown' : ''}` } onClick={this._showToggle}>&nbsp;</Button>
      </FormControl>
    );

  }

}

export default PasswordField;