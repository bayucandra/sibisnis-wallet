import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from "../../../Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";

import walletProvider from "../../../../providers/walletProvider";

import AppActions from "../../../../redux/actions/global/appActions";

import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentStatus.scss";

class BalancePaymentStatus extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
  }

  render() {
    let bank_record = walletProvider.bankByMethodAbreviation('bank-tf-bni');
    let bank_icon_size = bank_record.icons.main.size_default;

    let amount_arr = biqHelper.utils.numberFormat( '102546', 'Rp ', { wrap_last_thousand: 'span' } );

    return (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          <div className="title">Silahkan memproses pembayaran Anda</div>
          <HeaderMenuMobile forceVisible={true}/>
        </div>

        <div className="balance-payment-status__body">

          <div className="balance-payment-status__main-panel">

            <div className="expiration-notice">

              <div className="expiration-notice__icon"/>

              <div className="expiration-notice__time">

                <div className="notice">Batas Waktu Pembayaran</div>
                <div className="time"><span>2</span> jam &nbsp;<div>:</div> &nbsp;<span>30</span> menit &nbsp;<div>:</div> &nbsp;<span>50</span> detik</div>

              </div>

            </div>

            <div className="payment-detail">

              <div className="payment-detail__row">
                <div className="label">Pembayaran</div>

                <div className="bank-info">
                  <div className="bank-info__name visible-md-up"> { bank_record.bank_name } </div>
                  <img src={walletProvider.bankIconGet( 'bank-tf-bni', 'main' )} style={{ width: bank_icon_size[0], height: bank_icon_size[1] }} alt={"Bank logo"}/>
                </div>

              </div>

              <div className="payment-detail__row">
                <div className="label">No. Rekening</div>
                <div className="bank-account-number">{ bank_record.account_number }</div>
              </div>

              <div className="payment-detail__row">
                <div className="label">Atas nama</div>
                <div className="bank-account-holder">{ bank_record.account_name }</div>
              </div>

              <div className="payment-detail__row bill-amount-row is-last">
                <div className="label">Total Tagihan</div>
                <div className="bill-amount">{ amount_arr[0] }<span>{ amount_arr[1] }</span></div>
              </div>

              <div className="payment-detail__row-notice">
                Pastikan total transfer anda tepat hingga 3 digit terakhir, sehingga pembayaran anda akan divalidasi dalam waktu secepatnya
              </div>

            </div>

            <div className="notice-bottom">
              Setelah pembayaran diterima, otomatis saldo anda akan bertambah sesuai jumlah transfer hingga 3 digit terakhir, namun anda juga bisa melaporkan jika anda sudah transfer
            </div>

            <div className="confirmation-block">
              <div className="header">
                <div className="icon"/>
                <div className="title">Sudah transfer?</div>
              </div>
              <div className="action">
                <Button className="confirmation-btn">Konfirmasi transfer</Button>
              </div>
            </div>

          </div>

          <div className="balance-payment-status__spacer"/>

          <BalanceTransactionInfo/>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    main_header_mobile_show: state.app.main_header_mobile_show
  };
};

export default connect( mapStateToProps )(BalancePaymentStatus);