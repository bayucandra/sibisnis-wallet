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
    server_response: {}
  };

  _modalOpen = () => {
    this.setState( { modal_is_open: true } );
  };

  _modalClose = () => {
    this.setState( { modal_is_open: false } );
  };

  _onSubmitClick = () => {
    if ( this.props.dashboard.email_verification.is_submitting ) return;
    let {dispatch} = this.props;
    dispatch( dashboardActions.dashboardEmailVerificationSubmit() );
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    let response_status = biqHelper.JSON.pathValueGet( nextProps.dashboard.email_verification.response, 'response.response_code.status' );
    let response_is_error = biqHelper.utils.httpResponseIsError( response_status );

    if ( response_is_error ) {
      this.setState( { server_response: Object.assign( {}, nextProps.dashboard.email_verification.response ) } );
      dispatch( dashboardActions.dashboardEmailVerificationReset() );
      this._modalOpen();
      return false;
    }

    return true;
  }

  render() {

    return (
      <>

        <div className={`email-verification-form visible-md-up${ this.props.isVisible ? ' is-visible' : '' }`}>

          {
            !this.props.dashboard.email_verification.is_submitted ?

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
                <div className="title">Link Verifikasi Email telah terkirim</div>
                <div className="notice">
                  Kami telah mengirim link verifikasi ke { this.props.user_profile.email } , Silahkan mengklik link verifikasi tersebut untuk memverifikasi email Anda.
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
            <ModalNotice modalClose={this._modalClose} title="Gagal" notice={biqHelper.JSON.pathValueGet( this.state.server_response, 'response.response_code.message' )}/>
          </div>

        </Modal>

      </>
    );

  }

}

const mapStateToProps = state => {

  return {
    user_profile : state.user.profile,
    dashboard: state.dashboard
  };

};

export default connect(mapStateToProps) (EmailVerificationForm);