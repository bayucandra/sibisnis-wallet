import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Button} from "../../../Widgets/material-ui";
import biqHelper from "../../../../lib/biqHelper/index";
import walletProvider from "../../../../providers/walletProvider";

import balanceActions from "../../../../redux/actions/pages/balanceActions";

import "./BalanceTransactionInfo.scss";

class BalanceTransactionInfo extends Component {

  _paymentInfoVisibilityToggle = () => {
    biqHelper.utils.clickTimeout(()=>{
      let {dispatch} = this.props;
      dispatch( balanceActions.balancePaymentInfoVisibility() );
    });
  };

  render() {

    let is_submit = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';
    let param_invoice_id = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );

    let has_transaction = ( is_submit && this.props.balance.payment_bank_submit.is_submitted === true
                            && biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet( this.props.balance.payment_bank_submit.data, 'response_code.status' ) )
                          )
                          || ( is_submit && param_invoice_id !== '0'
                              && biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet(this.props.balance.payment_transaction.data, 'response_code.status') )
                          )
                          || ( !is_submit && this.props.balance.payment_transaction.is_fetched === true
                            && biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet(this.props.balance.payment_transaction.data, 'response_code.status') )
                          );

    let data = is_submit && (param_invoice_id === '0')  ? biqHelper.JSON.pathValueGet( this.props.balance.payment_bank_submit.data, 'data' ) : biqHelper.JSON.pathValueGet(this.props.balance.payment_transaction.data, 'data');
    let invoice_id = biqHelper.JSON.pathValueGet( data, 'invoice_id' );
    let status = biqHelper.JSON.pathValueGet( data, 'status' );
    let status_class = '';

    switch( status ) {
      case 3:
        status_class = ' status--expired';
        break;
      case 5:
        status_class = ' status--verification-process';
        break;
    }

    return (
      <div className={`balance-transaction-info${ this.props.balance.payment_info_is_visible_mobile ? ' is-visible-mobile' : '' }`}>

        <div className="header">
          <div className="header__title">Info Transaksi</div>
          <Button className="header__close-btn hidden-md-up" onClick={this._paymentInfoVisibilityToggle}>&nbsp;</Button>
        </div>

        <div className="info-section">

          {
            has_transaction ?

            <>
              <div className="info-section__row">
                <div className="label">ID Transaksi</div>
                <div className="value">{ invoice_id }</div>
              </div>

              <div className="info-section__row">
                <div className="label">Status</div>
                <div className={`status${ status_class }`}> { walletProvider.paymentStatusGet( status ) } </div>
              </div>
            </>
            :
            ''
          }

          <div className="info-section__title">Penambahan saldo</div>

          <div className="info-section__name">{this.props.user_profile.nama}</div>

          <div className="info-section__account-number">
            <div className="label">Nomor akun :</div>
            <div className="value">{biqHelper.utils.phoneDashFormat(this.props.user_profile.kontak)}</div>
          </div>

          <div className="info-section__nominal">
            <div className="label">Request Topup :</div>
            <div className="value">{biqHelper.utils.numberFormat(this.props.balance.nominal_value, 'Rp ')}</div>
          </div>

        </div>

      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    user_profile: state.user.profile
  };
};

export default withRouter( connect(mapStateToProps) (BalanceTransactionInfo) );