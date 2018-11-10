import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import AppActions from "../../../redux/actions/Global/AppActions";

import BalancePaymentMethod from "./BalancePaymentMethod/BalancePaymentMethod";

import "./BalancePayment.scss";

class BalancePayment extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange({ main_header_menu_mobile_show: false }) );
  }

  render() {

    return (
      <div className="main-wrapper biq-wrapper balance-payment">
        <div className="biq-wrapper__inner balance-payment__inner">

          <Switch>
            <Route path="/balance/payment/method" component={BalancePaymentMethod}/>
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