import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Subject } from 'rxjs';

import {Button} from 'components/Widgets/material-ui';

import appActions from "redux/actions/global/appActions";
import balanceActions from "redux/actions/pages/balanceActions";

import biqHelper from "lib/biqHelper";

import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentMethod.scss";

import iconBankMethod from "images/icons/payment/transfer-bank@3x.png";
import iconBankBri from "images/icons/payment/bank-bri@3x.png";
import iconBankBca from "images/icons/payment/bank-bca@3x.png";
import iconBankMandiri from "images/icons/payment/bank-mandiri@3x.png";
import iconBankBni from "images/icons/payment/bank-bni@3x.png";

import iconCreditCard from "images/icons/payment/kartu-kredit@3x.png";
import iconCreditCardMastercard from "images/icons/payment/master-card@3x.png";

import iconIndomaret from "images/icons/payment/indomaret@3x.png";

import iconBcaKlikPaySingle from "images/icons/payment/bcaklikpay-single@3x.png";
import iconBcaKlikPay from "images/icons/payment/bca-klikpay@3x.png";

import iconMandiriKlikPaySingle from "images/icons/payment/mandiriklikpay-single@3x.png";
import iconMandiriKlikPay from "images/icons/payment/mandiri-e@3x.png";

import iconCimbClickSingle from "images/icons/payment/cimb-klik-singgle@3x.png";
import iconCimbClick from "images/icons/payment/cimb-klik@3x.png";

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
    let {dispatch} = this.props;

    dispatch( balanceActions.balanceMethodFetch() );

    if( biqHelper.utils.isNull( this.props.balance.nominal_value ) || this.props.balance.nominal_value < 10000 )
      this.props.history.push('/balance');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if ( !biqHelper.utils.isNull( this.props.balance.payment_method_selected ) ) {
      switch( this.props.balance.payment_method_selected ) {

        case 'manual_transfer':
          this.props.history.push('/balance/payment/bank-transfer');
          break;

        case 'indomaret':
          this.props.history.push('/balance/payment/indomaret');
          break;

        default:

      }
    }

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    let next_payment_methods_status = biqHelper.JSON.pathValueGet( nextProps.balance.payment_methods.server_response, 'status' );
    let next_payment_methods_is_error = biqHelper.utils.httpResponseIsError( next_payment_methods_status );

    if ( !this.props.balance.payment_methods.is_fetched && nextProps.balance.payment_methods.is_fetched && next_payment_methods_is_error ) {

      this.props.history.goBack();

      let error_msg = biqHelper.JSON.pathValueGet( nextProps.balance.payment_methods.server_response, 'response.response_code.message' );
      error_msg = biqHelper.utils.isNull( error_msg ) ? `Error: ${ next_payment_methods_status }` : error_msg;
      dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal', notice: error_msg } ) );

      return true;
    }

    return true;
  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch( balanceActions.balanceMethodFetchCanceled() );

    this.stop$.next();
    this.stop$.complete();
  }

  render() {

    if ( this.props.balance.payment_methods.is_fetching ) return null;

    let payment_methods = biqHelper.JSON.pathValueGet( this.props.balance.payment_methods.server_response, 'response.data' );
    payment_methods = biqHelper.utils.isNull( payment_methods ) ? [] : payment_methods;

    return (
      <div className="balance-payment-method">

        <Button className="transaction-info-btn-mobile hidden-md-up" onClick={this._paymentInfoVisibilityToggle}>
          Info Transaksi
        </Button>

        <div className="balance-payment-method__header">Pilih Metode Pembayaran</div>

        <div className="balance-payment-method__body">

          <section className="balance-payment-method__method-list">

            {

              payment_methods.map(( el, idx )=>{

                let icon_desktop = null;
                let icon_mobile = null;
                let icon_mobile_width = 'auto';

                switch( el.payment_method ) {
                  case 'doku-wallet':
                    break;

                  case 'indomaret':
                    icon_desktop = (
                      <>
                        <img src={iconIndomaret} alt={"Indomaret"}/>
                      </>
                    );
                    icon_mobile = iconIndomaret;
                    icon_mobile_width = '70px';
                    break;

                  case 'rekening-va':
                    break;

                  case 'visa-mastercard':
                    icon_desktop = <img src={iconCreditCardMastercard} alt={"Kartu kredit Mastercard"}/>;
                    icon_mobile = iconCreditCard;
                    icon_mobile_width = '67px';
                    break;

                  case 'bri-epay':
                    break;

                  case 'klikpay-bca':
                    icon_desktop = <img src={iconBcaKlikPay} alt={"BCA Click Pay"}/>;
                    icon_mobile = iconBcaKlikPaySingle;
                    icon_mobile_width = '60px';
                    break;

                  case 'kartu-kredit':
                    icon_desktop = <img src={iconCreditCardMastercard} alt={"Kartu kredit Mastercard"}/>;
                    icon_mobile = iconCreditCard;
                    icon_mobile_width = '67px';
                    break;

                  case 'mandiri-clickpay':
                    icon_desktop = <img src={iconMandiriKlikPay} alt={"BCA Click Pay"}/>;
                    icon_mobile = iconMandiriKlikPaySingle;
                    icon_mobile_width = '42px';
                    break;

                  case 'cimb':
                    icon_desktop = <img src={iconCimbClick} alt={"CIMB Click"}/>;
                    icon_mobile = iconCimbClickSingle;
                    icon_mobile_width = '79px';
                    break;

                  case 'manual_transfer':
                    icon_desktop = (
                      <>
                        <img src={iconBankBri} alt={"Bank BRI"}/>
                        <img src={iconBankBca} alt={"Bank BCA"}/>
                        <img src={iconBankMandiri} alt={"Bank Mandiri"}/>
                        <img src={iconBankBni} alt={"Bank BNI"}/>
                      </>
                    );
                    icon_mobile = iconBankMethod;
                    icon_mobile_width = '213px';
                    break;

                  default:
                }

                return (
                  <Button className={`payment-method-item${ idx===0 ? ' is-first' : '' }`} onClick={() => { this._paymentMethodSelect( el.payment_method ) }} key={el.payment_method}>
                    <div className="payment-method-item__inner">
                      <div className="label">
                        <div>{el.payment_method_label}</div>
                        <div className="icon-desktop visible-md-up">
                          { icon_desktop }
                        </div>
                      </div>
                      <div className="icon-mobile hidden-md-up" style={{ backgroundImage: `url( ${icon_mobile} )`, backgroundSize: `${icon_mobile_width} auto` }}/>
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