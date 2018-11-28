import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import {Button} from "../../../Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";

import balanceActions from "../../../../redux/actions/pages/balanceActions";

import "./BalancePaymentBank.scss";

import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";
import walletProvider from "../../../../providers/walletProvider";

class BalancePaymentBank extends Component {

  state = {
    bank_selected: null,
    user_email: '',
    user_email_copied: false
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
    return this.state.bank_selected === method ? ' is-selected' : '';
  };

  _submitBtnClick = () => {

    biqHelper.utils.clickTimeout(()=>{
      let {dispatch} = this.props;
      dispatch( balanceActions.balancePaymentBankSubmit() );
      this.props.history.push( `/balance/payment/status/submit/0/${encodeURIComponent( btoa('/balance/payment/bank-transfer') )}` );
    });
  };

  componentDidMount() {
    if ( this.props.is_app_initialized ) {
      this.setState({ user_email_copied: true });
      this.setState({ user_email: this.props.user_profile.email });
    }

    if( biqHelper.utils.isNull( this.props.balance.nominal_value ) ) this.props.history.push('/balance');
  }

  componentDidUpdate( prevProps, prevState, snapshot ){

    if ( this.props.is_app_initialized && !this.state.user_email_copied ) {
      this.setState({ user_email_copied: true });
      this.setState({ user_email: this.props.user_profile.email });
    }

  }

  render() {

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
                        <Button className={`bank-select${ this._bankSelectedClassGen( el.payment_method ) }`} onClick={ () => this._bankSelectClick( el.payment_method )} key={el.payment_method}>
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

                <div className="biq-row">
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

                    ''
                }
              </Button>

            </div>

          </div>

          <div className="balance-payment-bank__spacer"/>

          <BalanceTransactionInfo/>

        </div>

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

export default withRouter( connect(mapStateToProps) (BalancePaymentBank) );