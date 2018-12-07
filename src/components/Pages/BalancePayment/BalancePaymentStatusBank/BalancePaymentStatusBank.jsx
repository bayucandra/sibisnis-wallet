import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from "../../../Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";

import walletProvider from "../../../../providers/walletProvider";

import "./BalancePaymentStatusBank.scss";

class BalancePaymentStatusBank extends Component {

  _paymentConfirmClick = ( param_type, param_deposit_id, param_referrer ) => {
    biqHelper.utils.clickTimeout(()=> {
      let confirm_url = `/balance/payment/status/${param_type}/${param_deposit_id}/${param_referrer}/confirm`;
      this.props.history.push(confirm_url);
    });
  };

  render() {
    let param_type = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' );
    let param_referrer = biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer');
    let param_deposit_id = biqHelper.JSON.pathValueGet(this.props.match.params, 'id');

    let data = this.props.biqData;

    let bank_record = walletProvider.bankByMethodAbreviation(data.bank);
    let bank_icon_size = bank_record.icons.main.size_default;

    let amount_arr = biqHelper.utils.numberFormat( data.nominal_origin, 'Rp ', { split_last_thousand: true } );

    return (

          <div className="balance-payment-status-bank">
            {
              data.status !== '3' ?
                <div className="expiration-notice">

                  <div className="expiration-notice__icon"/>

                  <div className="expiration-notice__time">

                    <div className="notice">Batas Waktu Pembayaran</div>

                    <div className="time">
                      <span>{this.props.countDown.hours}</span> jam &nbsp;<div>:</div> &nbsp;<span>{this.props.countDown.minutes}</span> menit &nbsp;<div>:</div> &nbsp;<span>{this.props.countDown.seconds}</span> detik
                    </div>

                  </div>

                </div>
                :

                <div className="notice-expired hidden-md-up">
                  <div className="notice-expired__icon"/>
                  <div className="notice-expired__text">Waktu Kadaluwarsa</div>
                </div>
            }

            {
              data.status === '3' ?
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

              <div className={`payment-detail__row${ data.status !== '3' ? ' bill-amount-row' : ' bill-amount-row-expired' } is-last`}>
                <div className="label">Total Tagihan</div>
                <div className="bill-amount"><span>{ amount_arr[0] }</span><span>{ amount_arr[1] }</span></div>
              </div>

              {
                data.status !== '3' ?
                  <div className="payment-detail__row-notice">
                    Pastikan total transfer anda tepat hingga 3 digit terakhir, sehingga pembayaran anda akan divalidasi dalam waktu secepatnya
                  </div>
                : ''
              }

            </div>

            {
              data.status !== '3' ?
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
              data.status === '3' ?
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
              data.status !== '3' ?

                <div className="confirmation-block">
                  <div className="header">
                    <div className="icon"/>
                    <div className="title">Sudah transfer?</div>
                  </div>
                  <div className="action">
                    <Button className="confirmation-btn" onClick={ () => this._paymentConfirmClick( param_type, param_deposit_id, param_referrer ) }>
                      Konfirmasi transfer
                    </Button>
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
    );
  }

}

export default withRouter( connect( null )(BalancePaymentStatusBank) );