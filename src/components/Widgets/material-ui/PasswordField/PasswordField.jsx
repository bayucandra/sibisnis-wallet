import React, {Component} from 'react';
import biqHelper from "lib/biqHelper";

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import {Button} from "components/Widgets/material-ui";

import "./PasswordField.scss";

class PasswordField extends Component {

  state = {
    is_show_password: false,
    password_test: {},
    value: '',
    is_focused: false
  };

  _showToggle = () => {
    this.setState( { is_show_password: !this.state.is_show_password } );
  };

  _onFocus = () => {
    this.setState({ is_focused: true });
  };

  _onBlur = () => {
    this.setState({ is_focused: false });
  };

  _onChange = ( e ) => {
    let input_value = e.target.value;

    let cb = () => {

      this.setState( { password_test: biqHelper.utils.passwordTest({val: input_value}) }, () => {

        if( typeof this.props.passwordTestGet === 'function' ) this.props.passwordTestGet( this.state.password_test );

      } );

    };

    if ( typeof this.props.onChange === 'function' ) {
      this.props.onChange(e, cb);
    } else {
      this.setState({ value: input_value }, cb);
    }


  };

  componentDidMount() {
    let input_value = !this.props.hasOwnProperty('value') ? this.state.value : this.props.value;
    this.setState( { password_test: biqHelper.utils.passwordTest({val: input_value}) } );
    this.forceUpdate();
  }
/*
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    if ( this.state.value !== nextState.value ) {
      this.setState( { password_test: biqHelper.utils.passwordTest({val: nextState.value}) } );
      return false;
    }

    return true;
  }*/

  render() {
    let customClass = biqHelper.utils.isNull( this.props.className ) ? '' : ' ' + this.props.className;
    let helperText = biqHelper.utils.isNull( this.props.helperText ) ? '' : this.props.helperText;
    let isError = biqHelper.utils.isNull( this.props.error ) ? false : this.props.error;

    let password_test_visible = this.props.passwordTestShow && this.state.is_focused;
    let input_value = !this.props.hasOwnProperty('value') ? this.state.value : this.props.value;

    return (
      <FormControl error={isError} className={`w-password-field${this.props.passwordTestShow ? ' w-password-field--password-test-show' : ''}${customClass}`}>
        {
          (
            !biqHelper.utils.isNull( this.props.label )
            || this.props.label === ""
          )

          &&

          <InputLabel>{this.props.label}</InputLabel>
        }
        <Input type={this.state.is_show_password ? 'text' : 'password'} value={input_value} onChange={ this._onChange }
           autoFocus={!biqHelper.utils.isNull(this.props.autoFocus) ? this.props.autoFocus : false}
           onFocus={this._onFocus} onBlur={this._onBlur}/>

        <FormHelperText className="w-password-field__helper-text">{helperText}</FormHelperText>
        <Button className={ `show-toggle-btn${this.state.is_show_password ? ' is-shown' : ''}` } onClick={this._showToggle}>&nbsp;</Button>

        <div className={`password-test${password_test_visible ? ' is-visible' : ''}`}>

          <div className="password-test__col">
            {Object.keys(this.state.password_test).map((el, idx) => {
              if ( idx < 3 ) {
                let label = this.state.password_test[el].label;
                let value = this.state.password_test[el].value;
                return (
                  <div className={`test-item${ idx===0 ? ' is-first' : '' }${value ? ' is-valid' : ''}`} key={el}>{ label }</div>
                );
              }

              return null;
            })}
          </div>

          <div className="password-test__col password-test__col--right">
            {Object.keys(this.state.password_test).map((el, idx) => {
              if ( idx >= 3 ) {
                let label = this.state.password_test[el].label;
                let value = this.state.password_test[el].value;
                return (
                  <div className={`test-item${ idx===3 ? ' is-first' : '' }${value ? ' is-valid' : ''}`} key={el}>{ label }</div>
                );
              }

              return null;
            })}
          </div>

        </div>

      </FormControl>
    );

  }

}

PasswordField.defaultProps = {
  passwordTestShow: false,//Show test error
  isConfirmField: false,
  passwordTestGet: null//Function to get password test result
};

export default PasswordField;