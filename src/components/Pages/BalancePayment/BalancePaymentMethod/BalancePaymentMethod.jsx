import React, { Component } from 'react';

import {Button} from '@material-ui/core';

import "./BalancePaymentMethod.scss";

import iconBankMethod from "../../../../images/icons/payment/transfer-bank@3x.png";
import iconBankBri from "../../../../images/icons/payment/bank-bri@3x.png";
import iconBankBca from "../../../../images/icons/payment/bank-bca@3x.png";
import iconBankMandiri from "../../../../images/icons/payment/bank-mandiri@3x.png";
import iconBankBni from "../../../../images/icons/payment/bank-bni@3x.png";

import iconAtm from "../../../../images/icons/payment/atm@3x.png";

import iconCreditCard from "../../../../images/icons/payment/kartu-kredit@3x.png";

import iconIndomaret from "../../../../images/icons/payment/indomaret@3x.png";

import iconKlikBcaSingle from "../../../../images/icons/payment/klikbca-singgle@3x.png";

import iconBcaKlikPaySingle from "../../../../images/icons/payment/bcaklikpay-single@3x.png";

import iconMandiriKlikPaySingle from "../../../../images/icons/payment/mandiriklikpay-single@3x.png";

import iconCimbClickSingle from "../../../../images/icons/payment/cimb-klik-singgle@3x.png";

class BalancePaymentMethod extends Component {

  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div className="balance-payment-method">

        <Button className="transaction-info-btn-mobile hidden-md-up">
          Info Transaksi
        </Button>

        <div className="balance-payment-method__title">Pilih Metode Pembayaran</div>

        <div className="balance-payment-method__method-list">

          <Button className="payment-method-item is-first">
            <div className="payment-method-item__inner">
              <div className="label">
                <div>Transfer Bank</div>
                <div className="icon-desktop visible-md-up">
                  <img src={iconBankBri} alt={"Bank BRI"}/>
                  <img src={iconBankBca} alt={"Bank BCA"}/>
                  <img src={iconBankMandiri} alt={"Bank Mandiri"}/>
                  <img src={iconBankBni} alt={"Bank BNI"}/>
                </div>
              </div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconBankMethod} )`, backgroundSize: 'auto 27px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">ATM / Bank Transfer</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconAtm} )`, backgroundSize: 'auto 21px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">Kartu Kredit</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconCreditCard} )`, backgroundSize: 'auto 16px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">Indomaret</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconIndomaret} )`, backgroundSize: 'auto 30px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">Klik BCA</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconKlikBcaSingle} )`, backgroundSize: 'auto 23px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">BCA KlikPay</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconBcaKlikPaySingle} )`, backgroundSize: 'auto 12px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">Mandiri ClickPay</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconMandiriKlikPaySingle} )`, backgroundSize: 'auto 23px' }}/>
            </div>
          </Button>

          <Button className="payment-method-item">
            <div className="payment-method-item__inner">
              <div className="label">CIMB Clicks</div>
              <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconCimbClickSingle} )`, backgroundSize: 'auto 13px' }}/>
            </div>
          </Button>

        </div>

      </div>
    );
  }

}

export default BalancePaymentMethod;