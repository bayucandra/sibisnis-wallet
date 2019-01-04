import React, { Component } from 'react';

import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";
import dashboardActions from 'redux/actions/pages/dashboardActions';

import biqHelper from "lib/biqHelper";

import { TextField } from '@material-ui/core';
import { Button } from "components/Widgets/material-ui";

import LoadingIndicatorBar from "components/Widgets/LoadingIndicatorBar";
import FormWrapper from "../FormWrapper";

import "./EmailVerificationForm.scss";

class EmailVerificationForm extends Component {

  state = {
    response_noticed: false
  };

  _onSubmitClick = () => {
    if ( this.props.dashboard.email_verification.is_submitting ) return;
    let {dispatch} = this.props;
    this.setState({ response_noticed: false }, () => {
      dispatch( dashboardActions.dashboardEmailVerificationReset() );
      dispatch( dashboardActions.dashboardEmailVerificationSubmit() );
    });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let response_status = biqHelper.JSON.pathValueGet( nextProps.dashboard.email_verification.response, 'response.response_code.status' );
    let response_is_error = biqHelper.utils.httpResponseIsError( response_status );

    if ( response_is_error && !this.state.response_noticed && !biqHelper.mediaQuery.isMobile() ) {
      this.setState( { response_noticed: true } );

      let modal_notice = biqHelper.JSON.pathValueGet( this.state.server_response, 'response.response_code.message' );
      modal_notice = biqHelper.utils.isNull( modal_notice ) ? `Error: ${ response_status }` : modal_notice;
      let {dispatch} = this.props;
      dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal', notice: modal_notice } ) );
      return false;
    }

    return true;
  }

  render() {
    let is_submitted = this.props.dashboard.email_verification.is_submitted;
    let response_status = biqHelper.JSON.pathValueGet( this.props.dashboard.email_verification.response, 'response.response_code.status' );
    let response_is_success = biqHelper.utils.httpResponseIsSuccess( response_status );

    return (
      <FormWrapper className={`email-verification-form`} isVisible={this.props.isVisible}>

        {
          !( is_submitted && response_is_success ) ?

          <div className={`form-input`}>
            <TextField
              disabled
              className="email-input"
              label="Email"
              value={this.props.user_profile.email}
              helperText="Cek email anda sebelumnya dan klik link verifikasi, atau klik Kirim Link jika data email anda sebelumnya terhapus"
              margin="normal"
            />

            <Button className={`send-btn${ this.props.dashboard.email_verification.is_submitting ? ' is-submitting' : '' }`} onClick={ this._onSubmitClick }>
              Kirim Link
            </Button>


            <LoadingIndicatorBar isVisible={this.props.dashboard.email_verification.is_submitting}/>

          </div>


           :


          <div className={`form-submitted`}>

            <div className="icon"/>

            <div className="right-col">
              <div className="title">{ biqHelper.JSON.pathValueGet( this.props.dashboard.email_verification.response, 'response.data.header_message' ) }</div>
              <div className="notice">
                { biqHelper.JSON.pathValueGet( this.props.dashboard.email_verification.response, 'response.data.body_message' ) }
              </div>
              <div className="right-col__action">
                <div className="right-col__action__notice">Belum menerima link verifikasi?</div>
                <Button className="right-col__action__btn" onClick={this._onSubmitClick}>Kirim ulang link verifikasi</Button>
              </div>
            </div>

          </div>


        }

      </FormWrapper>
    );

  }

}

const mapStateToProps = state => {

  return {
    user_profile: state.user.profile,
    dashboard: state.dashboard
  };

};

export default connect(mapStateToProps) (EmailVerificationForm);