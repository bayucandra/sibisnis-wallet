import React, { Component } from 'react';
import { connect } from 'react-redux';

import biqHelper from "lib/biqHelper";

import balanceActions from "redux/actions/pages/balanceActions";

import {Button} from "components/Widgets/material-ui";

import BalanceTransactionInfo from "../../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentMethodIndomaret.scss";

import iconIndomaret from "images/icons/payment/indomaret@3x.png";
import Modal from "@material-ui/core/Modal/Modal";
import ModalNotice from "../../../../Widgets/ModalNotice/ModalNotice";
import {Redirect} from "react-router-dom";

class BalancePaymentMethodIndomaret extends Component {

  state = {
    user_email: '',
    is_user_email_copied: false,
    modal_err_is_open: false,
    error: { title: 'Gagal', notice: '' }
  };

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( ()=>{
      let {dispatch} = this.props;
      dispatch( balanceActions.balanceMethodReset() );
      this.props.history.push('/balance/payment/method');
    } );
  };

  _submitBtnClick = () => {
    let is_email_valid = !biqHelper.utils.isNull( this.state.user_email );

    if ( !is_email_valid ) {
      this._modalErrorOpen( { title: 'Periksa input', notice: 'Harap mengisi alamat email.' } );
      return;
    }

    let is_nominal_valid = !biqHelper.utils.isNull( this.props.balance.nominal_value ) && this.props.balance.nominal_value >= 10000;
    if( !is_nominal_valid ){
      this._modalErrorOpen( { title: 'Kesalahan system ', notice: 'Ada kesalahan system, harap mengulang proses topup.' } );
      return;
    }

    biqHelper.utils.clickTimeout(()=>{
      let {dispatch} = this.props;
      dispatch(
        balanceActions.balancePaymentSubmit(
          {
          },
          {
            method: 'indomaret'
          }
        )
      );
    });

  };

  _modalErrorClose = () => {
    this.setState( { modal_err_is_open: false } );
  };

  _modalErrorOpen = ( p_obj ) => {

    let params = {
      title: 'Gagal',
      notice: ''
    };

    Object.assign( params, p_obj );

    this.setState( {  error: params } );

    this.setState( { modal_err_is_open: true } );
  };

  componentDidMount() {
    if ( this.props.is_app_initialized ) {
      this.setState({ is_user_email_copied: true });
      this.setState({ user_email: this.props.user_profile.email });
    }
  }

  componentDidUpdate( prevProps, prevState, snapshot ){

    if ( this.props.is_app_initialized && !this.state.is_user_email_copied ) {
      this.setState({ is_user_email_copied: true });
      this.setState({ user_email: this.props.user_profile.email });
    }

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    if ( nextProps.balance.payment_submit.is_submitted ) {

      let server_response_next = nextProps.balance.payment_submit.server_response;
      let response_status_next  = server_response_next.status;

      if ( biqHelper.utils.httpResponseIsError( response_status_next ) ) {
        dispatch( balanceActions.balancePaymentReset() );

        this._modalErrorOpen({
          title: 'Error',
          notice: `Error <b>${response_status_next}</b>, harap periksa koneksi anda atau mencoba kembali dari awal.`
        });

        return false;
      }

      let response_next = biqHelper.JSON.pathValueGet( server_response_next, 'response' );
      let response_code_next = biqHelper.JSON.pathValueGet( response_next, 'response_code' );
      let id_deposit_next = biqHelper.JSON.pathValueGet( response_next, 'data.id_deposit' );
      if ( biqHelper.utils.httpResponseIsSuccess( response_code_next.status ) && !biqHelper.utils.isNull( id_deposit_next ) ){
        this.props.history.push( `/balance/payment/status/submit/${id_deposit_next}/${encodeURIComponent( btoa('/balance/payment/bank-transfer') )}` );
        return false;
      } else {
        dispatch( balanceActions.balancePaymentReset() );
        this._modalErrorOpen({
          title: 'Gagal',
          notice: response_code_next.message
        });
        return false;
      }

    }

    return true;
  }

  render() {

    if ( this.props.balance.payment_submit.is_submitting ) return <div/>;

    if( biqHelper.utils.isNull( this.props.balance.nominal_value )
      || this.props.balance.nominal_value < 10000
      || this.props.balance.payment_method_selected !== 'indomaret'
    ) return <Redirect to="/balance"/>;

    return (
      <div className="balance-payment-indomaret">

        <div className="balance-payment-indomaret__header visible-md-up">Pilih Metode Pembayaran</div>

        <div className="balance-payment-indomaret__body">

          <div className="balance-payment-indomaret__main-panel">

            <div className="top-nav">

              <Button className="back-btn" onClick={this._backBtnClick}>Kembali</Button>

              <div className="divider visible-md-up"/>

              <div className="title visible-md-up">Indomaret</div>

            </div>

            <div className="notice-top">
              <ul>
                <li>Pembayaran melalui loket Indomaret akan dikenakan biaya sesuai ketentuan Indomaret</li>
                <li className={"visible-md-up"}>Setelah Anda menekan "Bayar Sekarang", Anda tidak bisa mengubah metode pembayaran Anda</li>
              </ul>
            </div>

            <div className="detail-payment">

              <div className="detail-payment__title">Detail Pembayaran</div>

              <div className="detail-payment__panel">

                <div className="biq-row">
                  <div className="label">Metode bayar</div>
                  <div className="value"><img src={iconIndomaret} alt={"Indomaret"} style={{ width: '70px' }}/></div>
                </div>

                <div className="biq-row">
                  <div className="label">Sub Total</div>
                  <div className="value">{ biqHelper.utils.numberFormat( 200000, 'Rp ' ) }</div>
                </div>

                <div className="biq-row">
                  <div className="label">Biaya Layanan</div>
                  <div className="value">{ biqHelper.utils.numberFormat( 7800, 'Rp ' ) }</div>
                </div>

                <div className="biq-row biq-row--total">
                  <div className="label">Total</div>
                  <div className="value">{ biqHelper.utils.numberFormat( (200000 + 7800), 'Rp ' ) }</div>
                </div>

              </div>

            </div>

            <div className="email-notification">

              <div className="email-notification__title">Alamat Email Anda</div>

              <div className="email-notification__notice">Untuk mengirimkan invoice dan status pemesanan Anda</div>

              <input type="text" className="email-notification__input" value={this.state.user_email} onChange={ e => this.setState( { user_email: e.target.value } ) }/>

            </div>

            <div className="action">

              <Button className="submit-btn" onClick={this._submitBtnClick}>
                Bayar Sekarang
                {
                  this.props.balance.payment_transaction.is_fetching ?

                    <div className="c-loading-indicator">
                      <div className="c-loading-indicator__circle"/>
                    </div>

                    :

                    null
                }
              </Button>

            </div>

          </div>


          <div className="balance-payment-indomaret__spacer"/>


          <BalanceTransactionInfo/>


        </div>


        <Modal
          open={this.state.modal_err_is_open}
          onClose={this._modalErrorClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalErrorClose} title={this.state.error.title} notice={this.state.error.notice}/>
          </div>

        </Modal>

      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    user_profile: state.user.profile,
    is_app_initialized: state.app.is_app_initialized
  };
};

export default connect( mapStateToProps ) (BalancePaymentMethodIndomaret);