import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";
import * as moment from "moment";

import biqHelper from "../../../../lib/biqHelper";

import balanceActions from "../../../../redux/actions/pages/balanceActions";
import appActions from "../../../../redux/actions/global/appActions";

import Modal from "@material-ui/core/Modal/Modal";
import {Button} from "../../../Widgets/material-ui";

import ModalNotice from "../../../Widgets/ModalNotice/ModalNotice";
import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";

import BalancePaymentStatusBank from "./BalancePaymentStatusBank/BalancePaymentStatusBank";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";

import "./BalancePaymentStatus.scss";

class BalancePaymentStatus extends Component {
  count_down_obj = null;

  state = {
    should_fetch: false,
    modal_is_open: true,
    count_down: {
      hours: 0, minutes: 0, seconds: 0
    },
    modal_err_is_open: true,
    error: { title: 'Gagal', notice: '' }
  };

  _modalClose = () => {
    this.setState( { modal_is_open: false }, () => {
      let param_referrer_encoded = atob( decodeURIComponent( biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer') ) );
      setTimeout(() => this.props.history.push( param_referrer_encoded ), 250);
    } );
  };

  _modalErrorClose = () => {
    this.setState( { modal_err_is_open: false }, ()=>{
      let param_referrer_encoded = atob( decodeURIComponent( biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer') ) );
      setTimeout( ()=> this.props.history.push(param_referrer_encoded), 250 );
    } );
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    let is_fetched_current = this.props.balance.payment_transaction.is_fetched;
    let is_fetched_next = nextProps.balance.payment_transaction.is_fetched;

    let data_source_next = nextProps.balance.payment_transaction.server_response;
    let data_next = biqHelper.JSON.pathValueGet( data_source_next, 'response.data' );
    let status_next = biqHelper.JSON.pathValueGet( data_next, 'status' );


    let is_submit_current = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' ) === 'submit';

    let is_submitting_current = this.props.balance.payment_submit.is_submitting;
    let submit_http_status = biqHelper.JSON.pathValueGet( nextProps.balance.payment_submit.server_response, 'status' );
    let is_submitted_next = nextProps.balance.payment_submit.is_submitted && biqHelper.utils.httpResponseIsSuccess( submit_http_status );
    let param_deposit_id_current = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );

    //REDIRECT AFTER SUBMIT DONE===========
    if ( is_submit_current && param_deposit_id_current === '0' && is_submitting_current && is_submitted_next ) {
      let param_referrer = biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer');
      let deposit_id_submit = biqHelper.JSON.pathValueGet( nextProps.balance.payment_submit.server_response, 'response.data.id_deposit' );
      this.props.history.replace(`/balance/payment/status/submit/${deposit_id_submit}/${param_referrer}`);
      return false;
    }



    let is_submit_next = biqHelper.JSON.pathValueGet( nextProps.match.params, 'type' ) === 'submit';
    let param_deposit_id_next = biqHelper.JSON.pathValueGet( nextProps.match.params, 'id' );
    //FETCH AFTER SUBMIT DONE - REDIRECT====================
    if (
      (is_submit_current && !is_submit_next) ||
      ( is_submit_current && is_submit_next && param_deposit_id_current === '0' && param_deposit_id_next !== '0' )
    ) {
      dispatch( balanceActions.balancePaymentTransactionFetch( param_deposit_id_next ) );
      return false;
    }



    //START COUNTER===========
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

    if ( nextState.should_fetch ) {//Should fetch after counter done.
      this.setState({ should_fetch: false });
      dispatch( balanceActions.balancePaymentTransactionFetch( param_deposit_id_current ) );
      // return false;
    }

    if ( nextProps.header_mobile_show === true ) {
      dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    if ( !biqHelper.utils.isNull( this.count_down_obj ) && typeof this.count_down_obj.stop === 'function') this.count_down_obj.stop();

    let {dispatch} = this.props;

    dispatch( balanceActions.balancePaymentCancel() );
    dispatch( balanceActions.balancePaymentReset() );

    dispatch( balanceActions.balancePaymentTransactionCancel() );
    dispatch( balanceActions.balancePaymentTransactionReset() );
  }

  render() {
    let param_type = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' );
    let param_referrer = biqHelper.JSON.pathValueGet(this.props.match.params, 'referrer');
    let param_deposit_id = biqHelper.JSON.pathValueGet(this.props.match.params, 'id');
    let is_submit = param_type === 'submit';

    let response_status = biqHelper.JSON.pathValueGet( this.props.balance.payment_submit.server_response, 'status' );
    if ( !biqHelper.utils.isNull( response_status ) && !biqHelper.utils.httpResponseIsSuccess(response_status) ) {
      return (
        <Modal
          open={this.state.modal_err_is_open}
          onClose={this._modalErrorClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalErrorClose} title="Error" notice={<span>Error <b>{response_status}</b>, harap periksa koneksi anda atau mencoba kembali dari awal.</span>}/>
          </div>

        </Modal>
      )
    }

    //BEGIN LOADING PROCEDURE===
    let dummy_header= (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          <div className="title">Silahkan memproses pembayaran Anda</div>
          <HeaderMenuMobile forceVisible={true}/>
        </div>

      </div>
    );

    if ( is_submit && this.props.balance.payment_submit.is_submitting ){
      return dummy_header;
    }

    if ( is_submit && param_deposit_id !== '0' && this.props.balance.payment_transaction.is_fetching ) return dummy_header;

    if ( is_submit && param_deposit_id === '0' && this.props.balance.payment_submit.is_submitted ) return dummy_header;

    if ( !is_submit && this.props.balance.payment_transaction.is_fetching ) return dummy_header;
    //END LOADING PROCEDURE**********

    let source = is_submit && (param_deposit_id === '0') ?
      this.props.balance.payment_submit : this.props.balance.payment_transaction;

    let response = biqHelper.JSON.pathValueGet( source, 'server_response.response' );
    let data = biqHelper.JSON.pathValueGet( response, 'data' );
    let response_code = biqHelper.JSON.pathValueGet( response, 'response_code' );

    if ( biqHelper.utils.isNull(data) ) return <div/>;

    if ( source.is_fetched && biqHelper.utils.isNull(data) ) {//Protect page in case something wrong
      return <Redirect to={'/balance/topup-history'}/>;
    }


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

    let transaction_status = biqHelper.JSON.pathValueGet( data, 'status' );
    let confirmed_url = `/balance/payment/status/${param_type}/${param_deposit_id}/${param_referrer}/confirmed`;
    if ( transaction_status === '5' ) return <Redirect to={confirmed_url}/>;


    let StatusPanel = null;
    switch ( data.payment_channel ) {
      case 'manual_transfer':
        StatusPanel = BalancePaymentStatusBank;
    }

    return (

      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          {
            data.status === '3' || !is_submit ?

              <div className="nav-back">
                <Button className="nav-back__btn" onClick={()=> biqHelper.utils.clickTimeout( () => this.props.history.push('/balance/topup-history') )}>&nbsp;</Button>
                <div className="nav-back__text">Status pembayaran</div>
              </div>

              :

              <div className="title">Silahkan memproses pembayaran Anda</div>
          }
          <HeaderMenuMobile forceVisible={true}/>
        </div>

        <div className="balance-payment-status__body">

          <StatusPanel biqData={data} countDown={this.state.count_down}/>

          <div className="balance-payment-status__spacer visible-md-up"/>

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

export default connect( mapStateToProps ) (BalancePaymentStatus);
