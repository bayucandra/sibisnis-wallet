import React, { Component } from 'react';
import { connect } from 'react-redux';

import biqHelper from "../../../../lib/biqHelper";
import appActions from "../../../../redux/actions/global/appActions";

import {Button} from "../../../Widgets/material-ui";
import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";

import "./BalancePaymentDone.scss";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";
import balanceActions from "../../../../redux/actions/pages/balanceActions";

class BalancePaymentDone extends Component {

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( () => this.props.history.push('/balance/topup-history') );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let param_deposit_id = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );
    dispatch( balanceActions.balancePaymentTransactionFetch(param_deposit_id) );
  }

  render() {
    if( this.props.balance.payment_transaction.is_fetching ) return <div/>;

    return (
      <div className="balance-payment-done">

        <div className="balance-payment-done__header">

          <div className="nav-back">
            <Button className="nav-back__btn" onClick={ this._backBtnClick }>&nbsp;</Button>
            <div className="nav-back__text">Status pembayaran</div>
          </div>

          <HeaderMenuMobile forceVisible={true}/>
        </div>

        <div className="balance-payment-done__body">

          <div className="balance-payment-done__main-panel">

            <div className="notice">
              <div className="notice__title">Topup Berhasil</div>
              <div className="notice__description">Topup anda sudah berhasil ditambahkan ke akun anda</div>
            </div>

            <div className="icon"/>

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

export default connect( mapStateToProps ) ( BalancePaymentDone );