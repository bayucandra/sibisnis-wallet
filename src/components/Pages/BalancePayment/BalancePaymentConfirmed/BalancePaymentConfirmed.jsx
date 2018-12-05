import React, { Component } from 'react'
import {connect} from 'react-redux';

import "./BalancePaymentConfirmed.scss";
import appActions from "../../../../redux/actions/global/appActions";
import {Button} from "../../../Widgets/material-ui";
import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import biqHelper from "../../../../lib/biqHelper";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import balanceActions from "../../../../redux/actions/pages/balanceActions";

class BalancePaymentConfirmed extends Component {

  _sseHandler = () => {
    setTimeout( () => {
      let {dispatch} = this.props;

      if ( this.props.balance.payment_transaction.is_fetched
        && biqHelper.JSON.pathValueGet( this.props.balance.payment_transaction.server_response, 'data.status' ) === '5' )
        dispatch(balanceActions.balancePaymentTransactionFetch(3));

    }, 5000);
  };

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( () => this.props.history.push('/balance/topup-history') );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let param_deposit_id = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );
    dispatch( balanceActions.balancePaymentTransactionFetch(param_deposit_id) );

    this._sseHandler();

  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch( balanceActions.balancePaymentBankCancel() );
    dispatch( balanceActions.balancePaymentTransactionCancel() );

    dispatch( balanceActions.balancePaymentBankReset() );
    dispatch( balanceActions.balancePaymentTransactionReset() );
  }

  render() {

    if( this.props.balance.payment_transaction.is_fetching ) return <div/>;

    let is_failed = biqHelper.JSON.pathValueGet( this.props.balance.payment_transaction.server_response, 'data.status' ) === '2';

    return (
      <div className="balance-payment-confirmed">


        <div className="balance-payment-confirmed__header">

          <div className="nav-back">
            <Button className="nav-back__btn" onClick={ this._backBtnClick }>&nbsp;</Button>
            <div className="nav-back__text">Status pembayaran</div>
          </div>

          <HeaderMenuMobile forceVisible={true}/>

        </div>


        <div className="balance-payment-confirmed__body">

          <div className="balance-payment-confirmed__main-panel">

            <div className="notice-block">
              <div className="title">
                { !is_failed ? 'Proses Verifikasi' : 'Tidak ditemukan Pembayaran' }
              </div>

              <div className="description">
                {
                  !is_failed ?

                  `Saat ini kami sedang melakukan pengecekan bukti transfer yang anda sampaikan, mohon ditunggu beberapa
                  saat lagi`

                    :

                  `Kami telah melakukan verifikasi bukti transfer anda dan tidak ditemukan adanya pembayaran`
                }
              </div>

              {
                is_failed ?

                <div className="icon-not-found"/>

                  :

                <div className="icon-waiting"/>

              }
            </div>

            <div className="cs-title">Anda butuh info lebih lanjut?</div>

            <div className="cs-contact">

              <div className="cs-contact__icon"/>

              <div className="cs-contact__text">
                CS: 021-768-987
              </div>

            </div>

          </div>

          <div className="balance-payment-confirmed__spacer visible-md-up"/>

          <BalanceTransactionInfo/>

        </div>


      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    balance: state.balance
  }
};

export default connect( mapStateToProps ) ( BalancePaymentConfirmed );