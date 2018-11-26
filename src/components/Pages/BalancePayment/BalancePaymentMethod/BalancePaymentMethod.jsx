import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Subject, of } from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {takeUntil, catchError} from 'rxjs/operators'

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
import biqConfig from "../../../../providers/biqConfig";

class BalancePaymentMethod extends Component {

  stop$ = new Subject();

  state = {
    payment_methods: []
  };

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

  componentDidMount() {
    let ajax$ = rxAjax({
      url: `${biqConfig.api.url_base}/api/wallet/list_payment_method`,
      method: 'POST',
      crossDomain: true,
      withCredentials: true,
      body: Object.assign( {}, biqConfig.api.data_auth )
    })
      .pipe(
        takeUntil(this.stop$),
        catchError( err=> of( err.xhr ) )
      );

    ajax$
      .subscribe(
        res => {

          if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {
            let data = res.response.data;
            this.setState( { payment_methods: data } );
          }

          // doku-wallet; alfamart; rekening-va; bank-tf-bri; bank-tf-bni; visa-mastercard; bank-tf-mandiri; bri-epay; klikpay-bca; kartu-kredit; mandiri-clickpay; cimb;
          /*
                    data_json: "{"bank_name": "BRI", "account_name": "A.N. PT. Apta Media Indonesia", "account_number": "2120.01.000202.305", "kategori_payment": "bank_transfer"}"
                    id: "14"
                    images: "b2c_assets/images/stdlogo1-bri.jpg"
                    keterangan: "<div style="text-align:center;"><h1>2120.01.000202.305</h1><h4>A.N. PT. Apta Media Indonesia</h4></div>"
                    payment_channel: "manual_transfer"
                    payment_method: "bank-tf-bri"
                    payment_method_label: "Transfer BRI"
                    status: "0"*/

        }
      );

  }

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();
  }

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

            {

              this.state.payment_methods.map(( el )=>{

                let icon_desktop = null;
                let icon_mobile = null;

                switch( el.payment_method ) {
                  case 'doku-wallet':
                    break;

                  case 'alfamart':
                    icon_desktop = (
                      <>
                        <img src={iconIndomaret} alt={"Indomaret"}/>
                      </>
                    );
                    icon_mobile = iconIndomaret;
                    break;

                  case 'rekening-va':
                    break;

                  case 'visa-mastercard':
                    icon_desktop = <img src={iconCreditCardMastercard} alt={"Kartu kredit Mastercard"}/>;
                    icon_mobile = iconCreditCard;
                    break;

                  case 'bri-epay':
                    break;

                  case 'klikpay-bca':
                    icon_desktop = <img src={iconBcaKlikPay} alt={"BCA Click Pay"}/>;
                    icon_mobile = iconBcaKlikPaySingle;
                    break;

                  case 'kartu-kredit':
                    icon_desktop = <img src={iconCreditCardMastercard} alt={"Kartu kredit Mastercard"}/>;
                    icon_mobile = iconCreditCard;
                    break;

                  case 'mandiri-clickpay':
                    icon_desktop = <img src={iconMandiriKlikPay} alt={"BCA Click Pay"}/>;
                    icon_mobile = iconMandiriKlikPaySingle;
                    break;

                  case 'cimb':
                    icon_desktop = <img src={iconCimbClick} alt={"CIMB Click"}/>;
                    icon_mobile = iconCimbClickSingle;
                    break;

                  case 'bank-tf-bri':
                  case 'bank-tf-bni':
                  case 'bank-tf-mandiri':
                    icon_desktop = (
                      <>
                        <img src={iconBankBri} alt={"Bank BRI"}/>
                        <img src={iconBankBca} alt={"Bank BCA"}/>
                        <img src={iconBankMandiri} alt={"Bank Mandiri"}/>
                        <img src={iconBankBni} alt={"Bank BNI"}/>
                      </>
                    );
                    icon_mobile = iconBankMethod;
                    break;
                }

                return (
                  <Button className="payment-method-item is-first" onClick={() => { this._paymentMethodSelect( el.payment_method ) }} key={el.payment_method}>
                    <div className="payment-method-item__inner">
                      <div className="label">
                        <div>{el.payment_method_label}</div>
                        <div className="icon-desktop visible-md-up">
                          { icon_desktop }
                        </div>
                      </div>
                      <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${icon_mobile} )`, backgroundSize: 'auto 27px' }}/>
                    </div>
                  </Button>
                );

              })

            }

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