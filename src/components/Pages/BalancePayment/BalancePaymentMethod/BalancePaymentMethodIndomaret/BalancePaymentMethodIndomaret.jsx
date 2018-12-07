import React, { Component } from 'react';
import { connect } from 'react-redux';

import biqHelper from "lib/biqHelper";

import balanceActions from "redux/actions/pages/balanceActions";

import {Button} from "components/Widgets/material-ui";

import BalanceTransactionInfo from "../../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentMethodIndomaret.scss";

import iconIndomaret from "images/icons/payment/indomaret@3x.png";

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