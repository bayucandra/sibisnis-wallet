import React, { Component } from 'react';

import {connect} from 'react-redux';

import dashboardActions from 'redux/actions/pages/dashboardActions';

import { TextField } from '@material-ui/core';
import { Button } from "components/Widgets/material-ui";

import "./EmailVerificationForm.scss";
import LoadingIndicatorBar from "components/Widgets/LoadingIndicatorBar";
import Modal from "@material-ui/core/Modal/Modal";
import ModalNotice from "../../../../Widgets/ModalNotice/ModalNotice";
import biqHelper from "../../../../../lib/biqHelper";

class EmailVerificationForm extends Component {

  state = {
    modal_is_open: false,
    response_noticed: false,
    error: {
      title: 'Gagal',
      notice: ''
    }
  };

  _modalOpen = ( p_obj ) => {

    let params = {
      title: 'Gagal',
      notice: ''
    };

    Object.assign( params, p_obj );

    this.setState( {  error: params } );

    this.setState( { modal_is_open: true } );
  };

  _modalClose = () => {
    biqHelper.utils.clickTimeout( () => {
      this.setState( { modal_is_open: false } );
    } );
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
      this._modalOpen({ title: 'Gagal', notice: modal_notice });
      return false;
    }

    return true;
  }

  render() {
    let is_submitted = this.props.dashboard.email_verification.is_submitted;
    let response_status = biqHelper.JSON.pathValueGet( this.props.dashboard.email_verification.response, 'response.response_code.status' );
    let response_is_success = biqHelper.utils.httpResponseIsSuccess( response_status );

    return (
      <>

        <div className={`email-verification-form visible-md-up${ this.props.isVisible ? ' is-visible' : '' }`}>

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


              { this.props.dashboard.email_verification.is_submitting && <LoadingIndicatorBar/>}

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

        </div>



        <Modal
          open={this.state.modal_is_open}
          onClose={this._modalClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalClose}
              title={this.state.error.title}
              notice={this.state.error.notice}/>
          </div>

        </Modal>

      </>
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