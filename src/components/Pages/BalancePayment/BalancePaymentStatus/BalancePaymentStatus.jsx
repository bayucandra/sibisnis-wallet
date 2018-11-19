import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Countdown from 'react-countdown-now';
import * as moment from 'moment';
import Modal from "@material-ui/core/Modal";
import {Button} from "../../../Widgets/material-ui";

import ModalNotice from "../../../Widgets/ModalNotice/ModalNotice";

import biqHelper from "../../../../lib/biqHelper";

import walletProvider from "../../../../providers/walletProvider";

import appActions from "../../../../redux/actions/global/appActions";
import balanceActions from "../../../../redux/actions/pages/balanceActions";

import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentStatus.scss";

class BalancePaymentStatus extends Component {

  state = {
    modal_is_open: true,
    referrer: '/balance/topup-history'
  };

  _modalClose = () => {
    this.setState( { modal_is_open: false }, () => {
      setTimeout(() => this.props.history.push( this.state.referrer ), 250);
    } );
  };

  _countdownRender = ({ hours, minutes, seconds, completed }) => {
    return <div className="time"><span>{hours}</span> jam &nbsp;<div>:</div> &nbsp;<span>{minutes}</span> menit &nbsp;<div>:</div> &nbsp;<span>{seconds}</span> detik</div>
  };

  componentDidMount() {

    if ( this.props.location.state.hasOwnProperty('referrer') ) this.setState({ referrer: this.props.location.state.referrer });

    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let is_submit = !this.props.match.params.hasOwnProperty( 'id' );
    if ( !is_submit ) {
      balanceActions.balancePaymentTransactionFetch();
    }

  }

  render() {
    // let is_submit = biqHelper.JSON.pathValueGet( this.props, 'location.state.referrer' ) === '/balance/payment/bank-transfer';
    let is_submit = !this.props.match.params.hasOwnProperty( 'id' );

    //BEGIN LOADING PROCEDURE===
    if ( is_submit && this.props.balance.payment_bank_submit.is_submitting ) return <div/>;

    if ( !is_submit && this.props.balance.payment_transaction.is_fetching ) return <div/>;
    //END LOADING PROCEDURE**********

    let response_code = this.props.balance.payment_bank_submit.data.response_code;
    let data = is_submit ? this.props.balance.payment_bank_submit.data.data : this.props.balance.payment_transaction.data.data;

    if ( biqHelper.utils.isNull(data) ) return <Redirect to={this.state.referrer}/>;

    if ( biqHelper.utils.httpResponseIsError( response_code.status ) ) {
      return (
        <Modal
          open={this.state.modal_is_open}
          onClose={this._modalClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalClose} title={"Gagal"} notice={response_code.message}/>
          </div>

        </Modal>
      )
    }

    let bank_record = walletProvider.bankByMethodAbreviation(data.bank);
    console.log(bank_record);
    let bank_icon_size = bank_record.icons.main.size_default;

    let amount_arr = biqHelper.utils.numberFormat( data.nominal_origin, 'Rp ', { wrap_last_thousand: 'span' } );

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
                <Countdown date={moment(data.expired).valueOf()} renderer={this._countdownRender}/>

              </div>

            </div>

            <div className="payment-detail">

              <div className="payment-detail__row">
                <div className="label">Pembayaran</div>

                <div className="bank-info">
                  <div className="bank-info__name visible-md-up"> { bank_record.bank_name } </div>
                  <img src={walletProvider.bankIconGet( bank_record.payment_method, 'main' )} style={{ width: bank_icon_size[0], height: bank_icon_size[1] }} alt={"Bank logo"}/>
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
    balance: state.balance,
    header_mobile_show: state.app.header_mobile_show
  };
};

export default connect( mapStateToProps )(BalancePaymentStatus);