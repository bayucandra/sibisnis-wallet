import React, { Component } from 'react';
import biqHelper from "../../../../lib/biqHelper";
import * as moment from "moment";
import balanceActions from "../../../../redux/actions/pages/balanceActions";
import appActions from "../../../../redux/actions/global/appActions";


class BalancePaymentStatus extends Component {

  state = {
    should_fetch: false
  };

  componentDidMount() {

    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let is_submit = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';

    let param_deposit_id = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );
    if ( !is_submit || ( is_submit && param_deposit_id !== '0') ) {
      dispatch( balanceActions.balancePaymentTransactionFetch( param_deposit_id ) );
    }

  }

  shouldComponentUpdate(nextProp, nextState, nextContext) {
    let {dispatch} = this.props;

    let is_fetched_current = this.props.balance.payment_transaction.is_fetched;
    let is_fetched_next = nextProp.balance.payment_transaction.is_fetched;

    let data_source_next = nextProp.balance.payment_transaction.server_response;
    let data_next = biqHelper.JSON.pathValueGet( data_source_next, 'response.data' );
    let status_next = biqHelper.JSON.pathValueGet( data_next, 'status' );
    if ( !is_fetched_current && is_fetched_next && !biqHelper.utils.isNull(data_next) && status_next === '1' ) {
      let expiration_date = data_next.expired_at.split('+')[0];

      this.count_down_obj = biqHelper.moment.countDown({
        compared_dt: moment( expiration_date ).valueOf(),
        current_dt: biqHelper.moment.now().valueOf(),
        callback_update: ( duration )=> {
          let counter_obj = {
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds()
          };

          this.setState({ count_down: counter_obj });
        },
        callback_done: () => {
          this.setState({should_fetch: true});
        }
      });
      // return false;
    }

    let param_deposit_id_current = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );
    if ( nextState.should_fetch ) {//Should fetch after counter done etc.
      this.setState({ should_fetch: false });
      dispatch( balanceActions.balancePaymentTransactionFetch( param_deposit_id_current ) );
      return false;
    }

    let is_submit_current = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';

    let is_submitting_current = this.props.balance.payment_submit.is_submitting;
    let submit_http_status = biqHelper.JSON.pathValueGet( nextProp.balance.payment_submit.server_response, 'status' );
    let is_submitted_next = nextProp.balance.payment_submit.is_submitted && biqHelper.utils.httpResponseIsSuccess( submit_http_status );

    if ( is_submit_current && param_deposit_id_current === '0' && is_submitting_current && is_submitted_next ) {//REDIRECT AFTER SUBMIT DONE=========
      let param_referrer = biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer');
      let deposit_id_submit = biqHelper.JSON.pathValueGet( nextProp.balance.payment_submit.server_response, 'response.data.id_deposit' );
      this.props.history.replace(`/balance/payment/status/submit/${deposit_id_submit}/${param_referrer}`);
      return false;
    }

    let is_submit_next = biqHelper.JSON.pathValueGet( nextProp.match.params, 'type' ) === 'submit';
    let param_deposit_id_next = biqHelper.JSON.pathValueGet( nextProp.match.params, 'id' );

    if ( nextProp.header_mobile_show === true ) {
      dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
      return false;
    }

    if (
      (is_submit_current && !is_submit_next) ||
      ( is_submit_current && is_submit_next && param_deposit_id_current === '0' && param_deposit_id_next !== '0' )//FETCH AFTER SUBMIT DONE - REDIRECT====================
    ) {
      dispatch( balanceActions.balancePaymentTransactionFetch( param_deposit_id_next ) );
      return false;
    }

    return true;
  }

  render() {

    return (
      <>
      </>
    );

  }

}

export default BalancePaymentStatus;
