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
    is_ready: false,
    modal_is_open: true
  };

  _modalClose = () => {
    this.setState( { modal_is_open: false }, () => {
      setTimeout(() => this.props.history.push( this.state.referrer ), 250);
    } );
  };

  _countdownRender = ({ hours, minutes, seconds, completed }) => {
    let is_submit = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';
    if ( completed && is_submit ){
      let invoice_id = this.props.balance.payment_bank_submit.data.data.invoice_id;
      let target_url = `/balance/payment/status/transaction/${invoice_id}/${encodeURIComponent( btoa('/balance/topup-history') )}`;
      return <Redirect to={target_url}/>;
    }

    return <div className="time"><span>{hours}</span> jam &nbsp;<div>:</div> &nbsp;<span>{minutes}</span> menit &nbsp;<div>:</div> &nbsp;<span>{seconds}</span> detik</div>
  };

  componentDidMount() {

    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let is_submit = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';

    console.log('did mount');
    if ( !is_submit ) {
      dispatch( balanceActions.balancePaymentTransactionFetch() );
    }
    this.setState({is_ready: true});

  }

  shouldComponentUpdate(nextProp, nextState, nextContext) {
    let {dispatch} = this.props;
    let is_submit_current = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';
    let is_submit_next = biqHelper.JSON.pathValueGet( nextProp.match.params, 'type' ) === 'submit';
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
    if ( is_submit_current && !is_submit_next ) {
      dispatch( balanceActions.balancePaymentTransactionFetch() );
      return false;
    }
    return true;
  }

  render() {
    let is_submit = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';

    //BEGIN LOADING PROCEDURE===
    let dummy_header= (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          <div className="title">Silahkan memproses pembayaran Anda</div>
          <HeaderMenuMobile forceVisible={true}/>
        </div>

      </div>
      );

    if ( is_submit && this.props.balance.payment_bank_submit.is_submitting ) return dummy_header;

    if ( !is_submit && this.props.balance.payment_transaction.is_fetching ) return dummy_header;
    //END LOADING PROCEDURE**********

    let response_code = this.props.balance.payment_bank_submit.data.response_code;
    let data = is_submit ? this.props.balance.payment_bank_submit.data.data : this.props.balance.payment_transaction.data.data;

    if ( this.state.is_ready && biqHelper.utils.isNull(data) ) {//is_ready to ensure that procedure on componentDidMount has ben ran
      return <Redirect to={'/balance/topup-history'}/>;
    }

    if ( biqHelper.utils.isNull(data) ) return <div/>;

    if ( is_submit && biqHelper.utils.httpResponseIsError( biqHelper.JSON.pathValueGet( response_code, 'status' ) ) ) {
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
    let bank_icon_size = bank_record.icons.main.size_default;

    let amount_arr = biqHelper.utils.numberFormat( data.nominal_origin, 'Rp ', { split_last_thousand: true } );

    return (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          {
            data.status === 3 ?
              <div className="nav-back">
                <Button className="nav-back__btn" onClick={()=> biqHelper.utils.clickTimeout( () => this.props.history.push('/balance/topup-history') )}>
                  &nbsp;
                </Button>
                <div className="nav-back__text">Status pembayaran</div>
              </div>

              :

              <div className="title">Silahkan memproses pembayaran Anda</div>
          }
          <HeaderMenuMobile forceVisible={true}/>
        </div>

        <div className="balance-payment-status__body">

          <div className="balance-payment-status__main-panel">
            {
              data.status !== 3 ?
                <div className="expiration-notice">

                  <div className="expiration-notice__icon"/>

                  <div className="expiration-notice__time">

                    <div className="notice">Batas Waktu Pembayaran</div>
                    <Countdown date={moment(data.expired).valueOf()} renderer={this._countdownRender}/>

                  </div>

                </div>
                :

                <div className="notice-expired hidden-md-up">
                  <div className="notice-expired__icon"/>
                  <div className="notice-expired__text">Waktu Kadaluwarsa</div>
                </div>
            }

            {
              data.status === 3 ?
                <div style={{ height: '10px' }} className={"visible-md-up"}/>
                :
                ''
            }

            <div className={`payment-detail`}>

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

              <div className={`payment-detail__row${ data.status !== 3 ? ' bill-amount-row' : ' bill-amount-row-expired' } is-last`}>
                <div className="label">Total Tagihan</div>
                <div className="bill-amount"><span>{ amount_arr[0] }</span><span>{ amount_arr[1] }</span></div>
              </div>

              {
                data.status !== 3 ?
                  <div className="payment-detail__row-notice">
                    Pastikan total transfer anda tepat hingga 3 digit terakhir, sehingga pembayaran anda akan divalidasi dalam waktu secepatnya
                  </div>
                : ''
              }

            </div>

            {
              data.status !== 3 ?
              <div className="notice-bottom">
                Setelah pembayaran diterima, otomatis saldo anda akan bertambah sesuai jumlah transfer hingga 3 digit terakhir, namun anda juga bisa melaporkan jika anda sudah transfer
              </div>
                :
              <div className="notice-bottom-expired">
                <div className="notice-bottom-expired__inner">
                  Kami tidak menemukan pembayaran anda hingga batas waktu yang ditentukan, untuk melakukan pembayaran lagi silahkan ulangi dari awal
                </div>
              </div>
            }

            {
              data.status === 3 ?
                <div className="customer-service-block">
                  <div className="title">Anda butuh info lebih lanjut?</div>
                  <div className="phone">
                    <div className="icon"/>
                    <div className="text">
                      CS: 021-768-987
                    </div>
                  </div>
                </div>
                  :
                ''
            }

            {
              data.status !== 3 ?

                <div className="confirmation-block">
                  <div className="header">
                    <div className="icon"/>
                    <div className="title">Sudah transfer?</div>
                  </div>
                  <div className="action">
                    <Button className="confirmation-btn">Konfirmasi transfer</Button>
                  </div>
                </div>

                :

                <div className="add-deposit-block">
                  <Button className="add-deposit-btn" onClick={()=>biqHelper.utils.clickTimeout( ()=> this.props.history.push('/balance') )}>
                    Tambah deposit
                  </Button>
                </div>
            }

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