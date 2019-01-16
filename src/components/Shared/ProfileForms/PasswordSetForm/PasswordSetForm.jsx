import React, {Component} from 'react';
import { connect } from 'react-redux';

import appActions from "redux/actions/global/appActions";
import userActions from "redux/actions/global/userActions";

import {TextField} from '@material-ui/core';
import {Button, PasswordField} from "components/Widgets/material-ui";

import FormWrapper from "../FormWrapper";

import "./PasswordSetForm.scss";
import biqHelper from "lib/biqHelper";
import LoadingIndicatorBar from "components/Widgets/LoadingIndicatorBar";

class PasswordSetForm extends Component {

  stateDefault = {

    old_password: {
      value: ''
    },

    new_password: {
      value: '',
      is_valid: false
    },

    confirmation_password: {
      value: '',
      is_valid: false
    },

    otp: {
      value: '',
      is_valid: false
    },

    is_submitted: false

  };

  state = {

    old_password: {
      value: ''
    },

    new_password: {
      value: '',
      is_valid: false
    },

    confirmation_password: {
      value: '',
      is_valid: false
    },

    otp: {
      value: '',
      is_valid: false
    },

    is_submitted: false

  };

  _inputReset = () => {
    for ( let key in this.stateDefault) {
      let state = {};
      state[key] = this.stateDefault[key];
      this.setState( state )
    }
  };

  _newPasswordTestGet = ( res ) => {
    let is_valid = true;
    for( let key in res ) {
      if ( res[key].value === false ) is_valid = false;
    }

    if( this.state.new_password.is_valid !== is_valid )
      this.setState( { new_password: Object.assign( {}, this.state.new_password, { is_valid } ) } );

  };

  _onOtpRequest = () => {

    if( this.props.user_password_update_otp.is_submitting ) return;

    let {dispatch} = this.props;
    biqHelper.utils.clickTimeout( () => {
      dispatch( userActions.userUpdatePasswordOtpSubmit() );
    } );
  };

  _onSubmit = () => {
    biqHelper.utils.clickTimeout( () => {
      this._onSubmitActual();
    } );
  };

  _onSubmitActual = () => {

    let {dispatch} = this.props;

    let op_empty = biqHelper.utils.isNull( this.state.old_password.value );

    let np_empty = biqHelper.utils.isNull( this.state.new_password.value );
    let np_valid = this.state.new_password.is_valid;

    let cp_empty = biqHelper.utils.isNull( this.state.confirmation_password.value );
    let cp_not_equal = this.state.confirmation_password.value.trim() !== '' && this.state.confirmation_password.value !== this.state.new_password.value;

    let otp_empty = biqHelper.utils.isNull( this.state.otp.value );
    let otp_valid = this.state.otp.is_valid;

    let is_ready_for_submit = !op_empty && np_valid && !cp_empty && !cp_not_equal && !otp_empty && otp_valid;

    if ( is_ready_for_submit ) {

      dispatch( userActions.userUpdatePasswordSubmit({
        memberid: this.props.user_profile.memberid,
        password: this.state.new_password.value,
        current_password: this.state.old_password.value,
        otp: this.state.otp.value
      }) );

    } else {

      let alert_content = { title: 'Harap periksa input', notice: '' };

      if ( op_empty ) {
        alert_content.notice = 'Harap masukkan password lama anda';
      }
      else if ( np_empty ) {
        alert_content.notice = 'Harap mengisi password baru anda';
      }
      else if ( !np_valid ) {
        alert_content.notice = 'Password anda lemah, harap mengikuti petunjuk pengisian password';
      }
      else if (cp_empty) {
        alert_content.notice = 'Harap memasukkan konfirmasi password baru';
      }
      else if ( cp_not_equal ){
        alert_content.notice = 'Konfirmasi password tidak sama dengan password baru';
      }
      else if ( otp_empty ) {
        alert_content.notice = 'Harap mengisi OTP yang bisa didapat dengan click tombol "Ambil OTP"';
      }
      else if ( !otp_valid ) {
        alert_content.notice = 'Kode OTP tidak valid';
      }

      dispatch( appActions.appDialogNoticeOpen( alert_content ) );

    }

  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;


    let is_otp_request_submitted = !this.props.user_password_update_otp.is_submitted && nextProps.user_password_update_otp.is_submitted;
    if ( is_otp_request_submitted && biqHelper.utils.httpResponseIsError( nextProps.user_password_update_otp.server_response.status ) ) {
      let error_message = `Error: ${nextProps.user_password_update_otp.status}`;
      let server_message = biqHelper.JSON.pathValueGet( nextProps.user_password_update_otp.server_response, 'response.response_code.message' );
      error_message = !biqHelper.utils.isNull( server_message ) ? server_message : error_message;

      dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal Request OTP', notice: error_message } ) );

      return true;
    } else if ( is_otp_request_submitted && biqHelper.utils.httpResponseIsSuccess( nextProps.user_password_update_otp.server_response.status ) ) {

      let success_message = 'OTP Berhasil dikirim';
      let server_message = biqHelper.JSON.pathValueGet( nextProps.user_password_update_otp.server_response, 'response.data.messages' );
      success_message = !biqHelper.utils.isNull( server_message ) ? server_message : success_message;

      let phone_number = biqHelper.JSON.pathValueGet( nextProps.user_password_update_otp.server_response, 'response.data.no_hp' );
      success_message = !biqHelper.utils.isNull( phone_number ) ? `${success_message} ke nomor: ${ phone_number }` : success_message;

      dispatch( appActions.appDialogNoticeOpen( { title: 'Berhasil', notice: success_message, isSuccess: true } ) );

      return true;
    }



    let is_password_update_submitted =  !this.props.user_password_update.is_submitted && nextProps.user_password_update.is_submitted;

    if (
        is_password_update_submitted
        && biqHelper.utils.httpResponseIsError( nextProps.user_password_update.server_response.status )
    ) {

      let error_message = `Error: ${nextProps.user_password_update.status}`;
      let server_message = biqHelper.JSON.pathValueGet( nextProps.user_password_update.server_response, 'response.response_code.message' );
      error_message = !biqHelper.utils.isNull( server_message ) ? server_message : error_message;

      dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal', notice: error_message } ) );

      return true;

    } else if (
      is_password_update_submitted
      && biqHelper.utils.httpResponseIsSuccess( nextProps.user_password_update.server_response.status )
    ) {
      let success_message = 'Update Password Berhasil';
      let server_message = biqHelper.JSON.pathValueGet( nextProps.user_password_update.server_response, 'response.response_code.message' );
      success_message = !biqHelper.utils.isNull( server_message ) ? server_message : success_message;

      dispatch( appActions.appDialogNoticeOpen( { title: 'Berhasil', notice: success_message, isSuccess: true } ) );
      this.props.passwordSetDesktopClose();

      setTimeout(() => {
        this._inputReset();
      }, 300 );

      return false;
    }



    return true;
  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch( userActions.userUpdatePasswordCanceled() );
  }

  render() {

    let op_empty = biqHelper.utils.isNull( this.state.old_password.value );
    let op_valid = !op_empty || !this.state.is_submitted;
    let op_helper_text = this.state.is_submitted && op_empty ? 'Harap masukkan password lama anda' : '';

    let np_empty = biqHelper.utils.isNull( this.state.new_password.value );
    let np_valid = this.state.new_password.is_valid;
    let np_helper_text = this.state.is_submitted && np_empty ?
                'Harap masukkan password baru'
                  :
                !this.state.new_password.is_valid && this.state.new_password.value.trim() !== '' ? 'Password Lemah' : '';

    let cp_empty = biqHelper.utils.isNull( this.state.confirmation_password.value );
    let cp_not_equal = this.state.confirmation_password.value.trim() !== '' && this.state.confirmation_password.value !== this.state.new_password.value;
    let cp_valid = (this.state.is_submitted && !cp_not_equal && !cp_empty ) || (!cp_not_equal && !this.state.is_submitted );
    let cp_helper_text = this.state.is_submitted && cp_empty
                ? 'Harap mengulang password baru disini'
                  :
                cp_not_equal ? 'Password konfirmasi tidak sama' : null;

    let otp_empty = biqHelper.utils.isNull( this.state.otp.value );
    let otp_valid = this.state.otp.is_valid;

    let is_ready_for_submit = !op_empty && np_valid && !cp_empty && !cp_not_equal && !otp_empty && otp_valid;

    return (

      <FormWrapper className="password-set-form" isVisible={this.props.isVisible}>

        <PasswordField
          label="Password lama"
          className="old-password"
          error={ !op_valid }
          value={this.state.old_password.value}
          onChange={
            e => this.setState(
              { old_password: Object.assign( {}, this.state.old_password, { value: e.target.value } ) }
              )
          }
          helperText={op_helper_text}/>

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
          helperText={ np_helper_text }/>

        <PasswordField
          className="is-last"
          label="Konfirmasi password"
          error={!cp_valid}
          value={this.state.confirmation_password.value}
          onChange={ (e, cb) => this.setState(
            { confirmation_password: Object.assign( {}, this.state.confirmation_password, { value: e.target.value} ) },
            () => typeof cb === 'function' ? cb() : null
          ) }
          helperText={ cp_helper_text }/>

        <Button className={`otp-btn${ this.props.user_password_update_otp.is_submitting ? ' is-disabled' : '' }`} onClick={this._onOtpRequest}>Ambil OTP</Button>

        <TextField
          className="mui-number-field mui-number-field--no-spinner otp-input"
          label="Input OTP"
          type="number"
          error={this.state.is_submitted && !otp_valid}
          value={this.state.otp.value}
          onChange={ e => this.setState({ otp : Object.assign( {}, this.state.otp, { value: e.target.value, is_valid: e.target.value.length === 5 } ) }) }
          helperText="Setelah anda tekan “Ambil OTP” , silahkan masukkan kode yg dikirim melalui SMS"/>

        <div className="footer-action">
          <Button className={`submit-btn${ is_ready_for_submit ? ' is-ready' : '' }`} onClick={this._onSubmit}>Proses</Button>
        </div>

        <LoadingIndicatorBar isVisible={this.props.user_password_update.is_submitting || this.props.user_password_update_otp.is_submitting}/>

      </FormWrapper>

    );
  }

}

const mapStateToProps = state => {

  return {
    user_profile: state.user.profile,
    user_password_update: state.user.password_update,
    user_password_update_otp: state.user.password_update_otp
  };

};

export default connect( mapStateToProps ) (PasswordSetForm);