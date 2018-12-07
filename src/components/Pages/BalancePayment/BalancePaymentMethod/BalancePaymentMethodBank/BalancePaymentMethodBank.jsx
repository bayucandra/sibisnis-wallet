import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import {Button} from "components/Widgets/material-ui";

import biqHelper from "lib/biqHelper";

import balanceActions from "redux/actions/pages/balanceActions";

import "./BalancePaymentMethodBank.scss";

import BalanceTransactionInfo from "../../BalanceTransactionInfo/BalanceTransactionInfo";
import walletProvider from "providers/walletProvider";
import Modal from "@material-ui/core/Modal/Modal";
import ModalNotice from "components/Widgets/ModalNotice/ModalNotice";

class BalancePaymentMethodBank extends Component {

  state = {
    bank_selected: null,
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

  _bankSelectClick = method=> {
    this.setState({ bank_selected: method });
  };

  _bankSelectedClassGen = method => {
    return biqHelper.JSON.pathValueGet( this.state.bank_selected, 'payment_method' ) === method ? ' is-selected' : '';
  };

  _submitBtnClick = () => {

    let is_nominal_valid = !biqHelper.utils.isNull( this.props.balance.nominal_value ) && this.props.balance.nominal_value >= 10000;
    let is_bank_valid = !biqHelper.utils.isNull(this.state.bank_selected) && this.state.bank_selected.hasOwnProperty( 'payment_method' ) && this.state.bank_selected.hasOwnProperty( 'account_number' );
    let is_email_valid = !biqHelper.utils.isNull( this.state.user_email );

    if ( !is_bank_valid || !is_email_valid ) {
      this._modalErrorOpen( { title: 'Periksa input', notice: 'Harap memilih bank dan mengisi alamat email.' } );
      return;
    }

    if( !is_nominal_valid ){
      this._modalErrorOpen( { title: 'Kesalahan system ', notice: 'Ada kesalahan system, harap mengulang proses topup.' } );
      return;
    }

    biqHelper.utils.clickTimeout(()=>{
      let {dispatch, balance} = this.props;
      dispatch( balanceActions.balancePaymentSubmit({
        nominal: balance.nominal_value,
        payment_method: this.state.bank_selected.payment_method,
        va_number: this.state.bank_selected.account_number,
        kode_unik: biqHelper.number.random( 1, 999 )
      }) );

      this.props.history.push( `/balance/payment/status/submit/0/${encodeURIComponent( btoa('/balance/payment/bank-transfer') )}` );

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

  render() {

    if( biqHelper.utils.isNull( this.props.balance.nominal_value )
      || this.props.balance.nominal_value < 10000
      || this.props.balance.payment_method !== 'manual_transfer'
    ) return <Redirect to="/balance"/>;

    return (
      <div className="balance-payment-bank">

        <div className="balance-payment-bank__header visible-md-up">Pilih Metode Pembayaran</div>

        <div className="balance-payment-bank__body">

          <div className="balance-payment-bank__main-panel">

            <div className="top-nav">

              <Button className="back-btn" onClick={this._backBtnClick}>Kembali</Button>

              <div className="divider visible-md-up"/>

              <div className="title visible-md-up">Transfer Bank</div>

            </div>

            <div className="notice-top">
              <ul>
                <li>Bisa menggunakan channel ATM, IBanking, MBanking, SMS Banking</li>
                <li>Setelah Anda menekan "Bayar Sekarang", Anda tidak bisa mengubah metode pembayaran Anda</li>
              </ul>
            </div>

            <div className="bank-destination">

              <div className="bank-destination__title">Pilih Bank Tujuan Transfer</div>

              <div className="bank-destination__row">

                {
                  walletProvider.bankListGet()
                    .map((el) => {
                      let icon = walletProvider.bankIconGet( el.payment_method, 'main' );
                      let bank_record = walletProvider.bankByMethodAbreviation( el.payment_method );
                      let icon_width = bank_record.icons.main.size_topup_select[0];
                      let icon_height = bank_record.icons.main.size_topup_select[1];

                      return (
                        <Button className={`bank-select${ this._bankSelectedClassGen( el.payment_method ) }`} onClick={ () => this._bankSelectClick( el )} key={el.payment_method}>
                          <div className="bank-select__radio-circle"/>
                          <div className="bank-select__label">{el.bank_name}</div>
                          <div className="bank-select__spacer"/>
                          <div className="bank-select__icon" style={{ backgroundImage: `url(${icon})`, width: icon_width, height: icon_height }}/>
                        </Button>
                      )
                    })
                }


              </div>

            </div>

            <div className="detail-payment hidden-md-up">

              <div className="detail-payment__title">Detail Pembayaran</div>

              <div className="detail-payment__panel">

                <div className="biq-row">
                  <div className="label">Pemilik akun</div>
                  <div className="value">{ this.props.user_profile.nama }</div>
                </div>

                <div className="biq-row">
                  <div className="label">Nomor Akun</div>
                  <div className="value">{ this.props.user_profile.kontak }</div>
                </div>

                <div className="biq-row biq-row--total">
                  <div className="label">Request Topup</div>
                  <div className="value">{ biqHelper.utils.numberFormat( this.props.balance.nominal_value, 'Rp ' ) }</div>
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


          <div className="balance-payment-bank__spacer"/>


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

export default withRouter( connect(mapStateToProps) (BalancePaymentMethodBank) );