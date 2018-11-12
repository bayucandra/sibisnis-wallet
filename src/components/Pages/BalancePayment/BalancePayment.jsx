import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import AppActions from "../../../redux/actions/global/appActions";

import BalancePaymentMethod from "./BalancePaymentMethod/BalancePaymentMethod";
import BalancePaymentBank from "./BalancePaymentBank/BalancePaymentBank";

import "./BalancePayment.scss";

class BalancePayment extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange({ main_header_menu_mobile_show: false }) );
  }

  render() {

    return (
        <div className="main-wrapper biq-wrapper biq-wrapper--md-no-side-padding balance-payment">

          <div className="balance-payment__header-background visible-md-up" />

          <div className="biq-wrapper__inner balance-payment__inner">

            <Switch>
              <Route path="/balance/payment/method" component={BalancePaymentMethod}/>
              <Route path="/balance/payment/bank-transfer" component={BalancePaymentBank}/>
              <Redirect from="/balance/payment" to="/balance/payment/method"/>
            </Switch>

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

export default connect( mapStateToProps ) (BalancePayment);