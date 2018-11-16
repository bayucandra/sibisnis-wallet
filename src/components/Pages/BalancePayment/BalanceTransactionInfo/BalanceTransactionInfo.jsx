import React, { Component } from 'react'
import {connect} from 'react-redux';

import {Button} from "../../../Widgets/material-ui";
import biqHelper from "../../../../lib/biqHelper/index";

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

    return (
      <div className={`balance-transaction-info${ this.props.balance.payment_info_is_visible_mobile ? ' is-visible-mobile' : '' }`}>

        <div className="header">
          <div className="header__title">Info Transaksi</div>
          <Button className="header__close-btn hidden-md-up" onClick={this._paymentInfoVisibilityToggle}>&nbsp;</Button>
        </div>

        <div className="info-section">

          {
            !biqHelper.utils.isNullAll(this.props.balance.payment_transaction_id, this.props.balance.payment_status_id) ?

            <>
              <div className="info-section__row">
                <div className="label">ID Transaksi</div>
                <div className="value">63872388103</div>
              </div>

              <div className="info-section__row">
                <div className="label">Status</div>
                <div className="status">Menunggu Pembayaran</div>
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

export default connect(mapStateToProps) (BalanceTransactionInfo);