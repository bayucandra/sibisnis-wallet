import React, {Component} from 'react';

import {TextField} from '@material-ui/core';
import {Button, PasswordField} from "components/Widgets/material-ui";

import FormWrapper from "../FormWrapper";

import "./PasswordSetForm.scss";
import biqHelper from "../../../../lib/biqHelper";

class PasswordSetForm extends Component {

  state = {

    old_password: {
      value: ''
    },

    new_password: {
      value: '',
      is_valid: false
    },

    new_password_confirmation: {
      value: '',
      is_valid: false
    },

    otp: {
      value: '',
      is_valid: false
    },

    is_submitted: false

  };

  _newPasswordTestGet = ( res ) => {
    let is_valid = true;
    for( let key in res ) {
      if ( res[key].value === false ) is_valid = false;
    }

    if( this.state.new_password.is_valid !== is_valid )
      this.setState( { new_password: Object.assign( {}, this.state.new_password, { is_valid } ) } );

  };

  render() {

    let confirmation_not_equal = this.state.new_password_confirmation.value.trim() !== '' && this.state.new_password_confirmation.value !== this.state.new_password.value;

    let is_ready_for_submit = !biqHelper.utils.isNull()

    return (

      <FormWrapper className="password-set-form" isVisible={this.props.isVisible}>

        <PasswordField
          label="Password lama"
          error={false}
          helperText={""}/>

        <PasswordField
          label="Password baru"
          passwordTestShow={true}
          passwordTestGet={this._newPasswordTestGet}
          error={!this.state.new_password.is_valid}
          value={this.state.new_password.value}
          onChange={ (e, cb) => this.setState(
            { new_password: Object.assign({}, this.state.new_password, { value: e.target.value } ) } ,
            () => typeof cb === 'function' ? cb() : null
            ) }
          helperText={ !this.state.new_password.is_valid && this.state.new_password.value.trim() !== '' ? 'Password Lemah' : '' }/>

        <PasswordField
          className="is-last"
          label="Konfirmasi password"
          error={confirmation_not_equal}
          value={this.state.new_password_confirmation.value}
          onChange={ (e, cb) => this.setState(
            { new_password_confirmation: Object.assign( {}, this.state.new_password_confirmation, { value: e.target.value} ) },
            () => typeof cb === 'function' ? cb() : null
          ) }
          helperText={
            confirmation_not_equal ?
              'Password konfirmasi tidak sama'
                :
              null
          }/>

        <Button className="otp-btn">Ambil OTP</Button>

        <TextField
          className="otp-input"
          label="Input OTP"
          value={this.state.otp.value}
          onChange={ e => this.setState({ otp : Object.assign( {}, this.state.otp, { value: e.target.value } ) }) }
          helperText="Setelah anda tekan “Ambil OTP” , silahkan masukkan kode yg dikirim melalui SMS"/>

        <div className="footer-action">
          <Button className="submit-btn">Proses</Button>
        </div>

      </FormWrapper>

    );
  }

}

export default PasswordSetForm;