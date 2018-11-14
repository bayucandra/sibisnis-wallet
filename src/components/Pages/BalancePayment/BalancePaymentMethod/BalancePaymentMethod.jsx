import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Button} from '../../../Widgets/material-ui';

import balanceActions from "../../../../redux/actions/pages/balanceActions";

import biqHelper from "../../../../lib/biqHelper";

import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentMethod.scss";

import iconBankMethod from "../../../../images/icons/payment/transfer-bank@3x.png";
import iconBankBri from "../../../../images/icons/payment/bank-bri@3x.png";
import iconBankBca from "../../../../images/icons/payment/bank-bca@3x.png";
import iconBankMandiri from "../../../../images/icons/payment/bank-mandiri@3x.png";
import iconBankBni from "../../../../images/icons/payment/bank-bni@3x.png";

import iconAtm from "../../../../images/icons/payment/atm@3x.png";
import iconAtmPrima from "../../../../images/icons/payment/prima-card@3x.png";
import iconAtmAlto from "../../../../images/icons/payment/alto-card@3x.png";
import iconAtmBersama from "../../../../images/icons/payment/atm-bersama@3x.png";

import iconCreditCard from "../../../../images/icons/payment/kartu-kredit@3x.png";
import iconCreditCardMastercard from "../../../../images/icons/payment/master-card@3x.png";

import iconIndomaret from "../../../../images/icons/payment/indomaret@3x.png";

import iconKlikBcaSingle from "../../../../images/icons/payment/klikbca-singgle@3x.png";
import iconKlikBca from "../../../../images/icons/payment/klik-bca@3x.png";

import iconBcaKlikPaySingle from "../../../../images/icons/payment/bcaklikpay-single@3x.png";
import iconBcaKlikPay from "../../../../images/icons/payment/bca-klikpay@3x.png";

import iconMandiriKlikPaySingle from "../../../../images/icons/payment/mandiriklikpay-single@3x.png";
import iconMandiriKlikPay from "../../../../images/icons/payment/mandiri-e@3x.png";

import iconCimbClickSingle from "../../../../images/icons/payment/cimb-klik-singgle@3x.png";
import iconCimbClick from "../../../../images/icons/payment/cimb-klik@3x.png";

class BalancePaymentMethod extends Component {

  constructor( props ) {
    super(props);
  }

  _paymentInfoVisibilityToggle = () => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( balanceActions.balancePaymentInfoVisibility() );
    } );
  };

  _paymentMethodSelect = ( type ) => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( balanceActions.balanceMethodSet( type ) );
    });
  };

  render() {

    if ( !biqHelper.utils.isNull( this.props.balance.payment_method ) ) {
      switch( this.props.balance.payment_method ) {
        case 'bank-transfer':
          return <Redirect to="/balance/payment/bank-transfer"/>
      }
    }

    return (
      <div className="balance-payment-method">

        <Button className="transaction-info-btn-mobile hidden-md-up" onClick={this._paymentInfoVisibilityToggle}>
          Info Transaksi
        </Button>

        <div className="balance-payment-method__header">Pilih Metode Pembayaran</div>

        <div className="balance-payment-method__body">

          <section className="balance-payment-method__method-list">

            <Button className="payment-method-item is-first" onClick={() => { this._paymentMethodSelect( 'bank-transfer' ) }}>
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
                <div className="label">
                  <div>ATM / Bank Transfer</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconAtmPrima} alt={"Atm Prima"}/>
                    <img src={iconAtmAlto} alt={"Atm Alto"}/>
                    <img src={iconAtmBersama} alt={"Atm Bersama"}/>
                  </div>
                </div>
                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconAtm} )`, backgroundSize: 'auto 21px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">
                <div className="label">
                  <div>Kartu Kredit</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconCreditCardMastercard} alt={"Kartu kredit Mastercard"}/>
                  </div>
                </div>
                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconCreditCard} )`, backgroundSize: 'auto 16px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">
                <div className="label">
                  <div>Indomaret</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconIndomaret} alt={"Indomaret"}/>
                  </div>
                </div>
                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconIndomaret} )`, backgroundSize: 'auto 30px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">

                <div className="label">
                  <div>Klik BCA</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconKlikBca} alt={"Klik BCA"}/>
                  </div>
                </div>

                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconKlikBcaSingle} )`, backgroundSize: 'auto 23px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">

                <div className="label">
                  <div>BCA KlikPay</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconBcaKlikPay} alt={"BCA Click Pay"}/>
                  </div>
                </div>

                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconBcaKlikPaySingle} )`, backgroundSize: 'auto 12px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">

                <div className="label">
                  <div>Mandiri ClickPay</div>
                  <div className="icon-desktop visible-md-up">
                    <img src={iconMandiriKlikPay} alt={"BCA Click Pay"}/>
                  </div>
                </div>

                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconMandiriKlikPaySingle} )`, backgroundSize: 'auto 23px' }}/>
              </div>
            </Button>

            <Button className="payment-method-item">
              <div className="payment-method-item__inner">

                <div className="label">
                  <div>CIMB Clicks</div>
                  <div className='icon-desktop visible-md-up'>
                    <img src={iconCimbClick} alt={"CIMB Click"}/>
                  </div>
                </div>

                <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${iconCimbClickSingle} )`, backgroundSize: 'auto 13px' }}/>
              </div>
            </Button>

          </section>

          <div className="balance-payment-method__spacer visible-md-up"/>

          <BalanceTransactionInfo/>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    balance: state.balance
  };
};

export default connect( mapStateToProps ) (BalancePaymentMethod);