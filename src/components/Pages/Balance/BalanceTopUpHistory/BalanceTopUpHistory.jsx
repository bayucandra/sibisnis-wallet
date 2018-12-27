import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import {Button} from '../../../Widgets/material-ui';

import $ from 'jquery';

import appActions from "../../../../redux/actions/global/appActions";
import balanceActions from "../../../../redux/actions/pages/balanceActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopUpHistory.scss";
import iconCloseWhite from "../../../../images/icons/close-white.svg";
import walletProvider from "../../../../providers/walletProvider";

import * as moment from 'moment';
import ScrollPagination from "../../../Widgets/ScrollPagination/ScrollPagination";
import biqConfig from "../../../../providers/biqConfig";

class BalanceTopUpHistory extends Component {

  panel_body_ref = React.createRef();

  constructor( props ) {
    super(props);

    biqHelper.jquery.init($);

  }

  _navBackClick = () => {
    biqHelper.utils.clickTimeout(()=>{
      this.props.history.push('/balance');
    });
  };

  _recordClick = ( id_deposit ) => {

    biqHelper.utils.clickTimeout( ()=>{
      let referrer = encodeURIComponent( btoa( this.props.location.pathname ) );
      let url = `/balance/payment/status/history/${id_deposit}/${referrer}`;
      this.props.history.push( url );
    } );

  };

  _statusClassGet = status => {
    let ret = '';

    switch ( status ) {
      case '1':
        ret = ' is-waiting-confirmation';
        break;

      case '2':
      case '3':
        ret = ' is-failed';
        break;

      case '4':
        ret = ' is-success';
        break;

      case '5':
        ret = ' is-waiting-verification';
        break;
      default:
    }

    return ret;

  };

  _onFetch = () => {
    let {dispatch} = this.props;
    dispatch( balanceActions.balanceTopUpHistoryFetch() );
  };

  _onFetched = obj => {
    let {dispatch} = this.props;
    dispatch( balanceActions.balanceTopUpHistoryFetched( { data: obj.data_all } ) );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let memberid_current = biqHelper.JSON.pathValueGet( this.props, 'user_profile.memberid' );
    let memberid_prev = biqHelper.JSON.pathValueGet( prevProps, 'user_profile.memberid' );

    let scroll_pagination_instance = this.panel_body_ref.current;
    if( !biqHelper.utils.isNull( scroll_pagination_instance )) {
      if (
        memberid_current !== memberid_prev
        && typeof scroll_pagination_instance.loadInit === 'function'
      ) {
        scroll_pagination_instance.loadInit({force_load: true});
      }
    }

  }

  componentWillUnmount() {

    let {dispatch} = this.props;
    dispatch( balanceActions.balanceTopUpHistoryReset() );
  }

  render() {

    let nav_header_mobile = (
      <nav className="nav-mobile hidden-md-up">
        <div className="title">History Topup</div>
        <IconButton className="close-btn" onClick={this._navBackClick}>
          <img src={iconCloseWhite} alt="Icon Close"/>
        </IconButton>
      </nav>
    );

    let data = this.props.balance.top_up_history.data;

    return (
      <div className="balance-topup-history">

        {nav_header_mobile}

        <nav className="nav-desktop visible-md-up">

          <Button className="back-btn" onClick={this._navBackClick}>&nbsp;</Button>

          <div className="title">History Topup</div>

        </nav>

        <div className="history-panel">

          <div className="history-panel__header visible-md-up">
            <div className="biq-col-spacer-left"/>
            <div className="biq-col biq-col--date">Tanggal</div>
            <div className="biq-col biq-col--method">Metode Transfer</div>
            <div className="biq-col biq-col--amount">Jumlah</div>
            <div className="biq-col biq-col--status">Status</div>
            <div className="biq-col-spacer-right"/>
          </div>

          <ScrollPagination className={`history-panel__body`} ref={this.panel_body_ref}
              biqUrl={`${biqConfig.api.url_base}/api/wallet/list_deposit`} biqMethod={'POST'}
              biqData={ Object.assign( { memberid: this.props.user_profile.memberid }, biqConfig.api.data_auth ) }
              onFetch={this._onFetch} onFetched={ this._onFetched }>
            {
              !biqHelper.utils.isNull( data ) && data.length &&

                data.map( ( el )=>{
                  return (
                    <Button className="history-item" key={el.id} onClick={ () => this._recordClick( el.id ) }>

                      <div className="history-item__inner">

                        <div className="row-inner">
                          <div className="biq-col-spacer-left visible-md-up"/>
                          <div className="biq-col biq-col--date visible-md-up">
                            { moment( el.tanggal ).format( 'D MMM YYYY , HH:mm' ) }
                          </div>
                          <div className="biq-col biq-col--method">
                            { walletProvider.bankByMethodAbreviation(el.bank).bank_name }
                          </div>
                          <div className="biq-col biq-col--amount">
                            { biqHelper.utils.numberFormat(el.nominal, 'Rp ') }
                          </div>
                          <div className="biq-col biq-col--status visible-md-up">
                            <div className={`status-box${ this._statusClassGet( el.status ) }`}>
                              { walletProvider.paymentStatusGet( el.status ) }
                            </div>
                          </div>
                          <div className="biq-col-spacer-right visible-md-up"/>
                        </div>


                        <div className={ `transfer-status-mobile hidden-md-up${ this._statusClassGet( el.status ) }` }>
                          { walletProvider.paymentStatusGet( el.status ) }
                        </div>

                        <div className="date-mobile hidden-md-up">
                          { moment( el.tanggal ).format( 'D MMM YYYY , HH:mm' ) }
                        </div>

                      </div>

                    </Button>
                  );
                })

            }
          </ScrollPagination>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {

  return {
    is_profile_parsed: state.user.is_profile_parsed,
    user_profile: state.user.profile,
    balance: state.balance
  };

};

export default withRouter( connect( mapStateToProps ) (BalanceTopUpHistory) );