import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import appActions from "../../../redux/actions/global/appActions";

import BalancePaymentMethod from "./BalancePaymentMethod";
import BalancePaymentBank from "./BalancePaymentBank";
import BalancePaymentStatusBank from "./BalancePaymentStatusBank";
import BalancePaymentConfirmation from "./BalancePaymentConfirmation";
import BalancePaymentConfirmed from "./BalancePaymentConfirmed";
import BalancePaymentDone from "./BalancePaymentDone";

import "./BalancePayment.scss";

class BalancePayment extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange({ header_menu_mobile_show: false }) );
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    let {dispatch} = this.props;
    if (
        nextProps.balance.payment_submit.is_submitting

        || ( !this.props.balance.payment_transaction.is_fetching && nextProps.balance.payment_transaction.is_fetching )
    ) {
      dispatch(appActions.appLoadingIndicatorShow());
      return false;
    }

    if (
      (nextProps.balance.payment_submit.is_submitted && !nextProps.balance.payment_transaction.is_fetching)
      || ( !this.props.balance.payment_transaction.is_fetched && nextProps.balance.payment_transaction.is_fetched && !nextProps.balance.payment_submit.is_submitting )
    ) {
      dispatch(appActions.appLoadingIndicatorHide());
      return false;
    }


    return true;
  }

  render() {

    let is_loading = this.props.balance.payment_submit.is_submitting || this.props.balance.payment_transaction.is_fetching;

    return (
        <div className={`main-wrapper${!this.props.header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper biq-wrapper--md-no-side-padding balance-payment`}>

          {
            !is_loading ?
            <div className="balance-payment__header-background visible-md-up"/>
            : ''
          }

          <div className="biq-wrapper__inner balance-payment__inner">

            <Switch>
              <Route path="/balance/payment/method" component={BalancePaymentMethod}/>
              <Route path="/balance/payment/bank-transfer" component={BalancePaymentBank}/>
              {/*<Route path="/balance/payment/status/:type/:id/:referrer" render={ props => (<BalancePaymentStatus {...props}/>)}/>*/}
              <Route path="/balance/payment/status/:type/:id/:referrer/done" component={BalancePaymentDone}/>
              <Route path="/balance/payment/status/:type/:id/:referrer/confirmed" component={BalancePaymentConfirmed}/>
              <Route path="/balance/payment/status/:type/:id/:referrer/confirm" component={BalancePaymentConfirmation}/>
              <Route path="/balance/payment/status/:type/:id/:referrer" component={BalancePaymentStatusBank}/>
              <Redirect from="/balance/payment" to="/balance/payment/method"/>
            </Switch>

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

export default connect( mapStateToProps ) (BalancePayment);