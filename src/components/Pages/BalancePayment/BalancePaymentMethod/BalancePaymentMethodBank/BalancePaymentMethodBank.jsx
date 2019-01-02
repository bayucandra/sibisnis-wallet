import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import {Button} from "components/Widgets/material-ui";

import biqHelper from "lib/biqHelper";

import balanceActions from "redux/actions/pages/balanceActions";

import "./BalancePaymentMethodBank.scss";

import BalanceTransactionInfo from "../../BalanceTransactionInfo/BalanceTransactionInfo";
import walletProvider from "providers/walletProvider";
import appActions from "../../../../../redux/actions/global/appActions";

class BalancePaymentMethodBank extends Component {

  state = {
    bank_selected: null,
    user_email: '',
    is_user_email_copied: false,
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
    let is_bank_valid = !biqHelper.utils.isNull(this.state.bank_selected) && this.state.bank_selected.hasOwnProperty( 'payment_method' ) && this.state.bank_selected.hasOwnProperty( 'account_number' );
    let is_email_valid = !biqHelper.utils.isNull( this.state.user_email );

    if ( !is_bank_valid || !is_email_valid ) {
      this._modalErrorOpen( { title: 'Periksa input', notice: 'Harap memilih bank dan mengisi alamat email.' } );
      return;
    }

    let is_nominal_valid = !biqHelper.utils.isNull( this.props.balance.nominal_value ) && this.props.balance.nominal_value >= 10000;
    if( !is_nominal_valid ){
      this._modalErrorOpen( { title: 'Kesalahan system ', notice: 'Ada kesalahan system, harap mengulang proses topup.' } );
      return;
    }

    biqHelper.utils.clickTimeout(()=>{
      let {dispatch, balance} = this.props;
      dispatch(
        balanceActions.balancePaymentSubmit(
        {
            nominal: balance.nominal_value,
            payment_method: this.state.bank_selected.payment_method,
            va_number: this.state.bank_selected.account_number,
            kode_unik: biqHelper.number.random( 1, 999 )
          },
          {
            method: 'manual_transfer'
          }
        )
      );

    });
  };

  _modalErrorOpen = ( p_obj ) => {

    let params = {
      title: 'Gagal',
      notice: ''
    };

    Object.assign( params, p_obj );

    let {dispatch} = this.props;
    dispatch( appActions.appDialogNoticeOpen( params ) );
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
      || this.props.balance.payment_method_selected !== 'manual_transfer'
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
                      let icon_width = 0;
                      let icon_height = 0;

                      let icon_size = biqHelper.JSON.pathValueGet( bank_record, 'icons.main.size_topup_select' );

                      if (
                        !biqHelper.utils.isNull( icon_size )
                        && icon_size.length === 2
                      ) {
                        icon_width = icon_size[0];
                        icon_height = icon_size[1];
                      }

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


          <div className="balance-payment-bank__spacer visible-md-up"/>


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

export default withRouter( connect(mapStateToProps) (BalancePaymentMethodBank) );