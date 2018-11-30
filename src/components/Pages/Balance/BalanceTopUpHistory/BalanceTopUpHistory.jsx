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

class BalanceTopUpHistory extends Component {

  panel_body_ref = React.createRef();

  state = {
    panel_body_has_scroll: false
  };

  constructor( props ) {
    super(props);

    biqHelper.jquery.init($);

  }

  _navBackClick = () => {
    biqHelper.utils.clickTimeout(()=>{
      this.props.history.push('/balance');
    });
  };

  _recordClick = ( deposit_id ) => {

    biqHelper.utils.clickTimeout( ()=>{
      let referrer = encodeURIComponent( btoa( this.props.location.pathname ) );
      let url = `/balance/payment/status/history/${deposit_id}/${referrer}`;
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
    }

    return ret;

  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    if ( this.props.is_profile_parsed ) {
      let memberid= biqHelper.JSON.pathValueGet( this.props, 'user_profile.memberid' );
      dispatch( balanceActions.balanceTopUpHistoryFetch( memberid ) );
    }

  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    let memberid_current = biqHelper.JSON.pathValueGet( this.props, 'user_profile.memberid' );
    let memberid_next = biqHelper.JSON.pathValueGet( nextProps, 'user_profile.memberid' );
    if( memberid_current !== memberid_next ) dispatch( balanceActions.balanceTopUpHistoryFetch( memberid_next ) );

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ( prevProps.balance.top_up_history.is_fetching && this.props.balance.top_up_history.is_fetched ) {

      let panel_body_has_scroll = $(this.panel_body_ref.current).biqHasScroll( { v_padding: 20 } );

      if ( panel_body_has_scroll.y === true && this.state.panel_body_has_scroll === false ) {
        this.setState( { panel_body_has_scroll: true } );
      }

      if ( panel_body_has_scroll.y === false && this.state.panel_body_has_scroll === true ) {
        this.setState( { panel_body_has_scroll: false } );
      }

    }
  }

  render() {

    let nav_header_mobile = (
      <nav className="nav-mobile hidden-md-up">
        <div className="title">History Topup</div>
        <IconButton className="close-btn" onClick={this._navBackClick}>
          <img src={iconCloseWhite}/>
        </IconButton>
      </nav>
    );

    if ( this.props.balance.top_up_history.is_fetching ) return nav_header_mobile;

    let data = biqHelper.JSON.pathValueGet( this.props.balance.top_up_history.server_response, 'response.data' );

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

          <div className={`history-panel__body${ this.state.panel_body_has_scroll ? ' has-scroll' : '' }`} ref={this.panel_body_ref}>
            {
              this.props.balance.top_up_history.is_fetched && !biqHelper.utils.isNull( data ) && data.length ?

                data.map( ( el )=>{
                  return (
                    <Button className="history-item" key={el.id} onClick={ () => this._recordClick( el.id ) }>

                      <div className="history-item__inner">

                        <div className="row-inner">
                          <div className="biq-col-spacer-left visible-md-up"/>
                          <div className="biq-col biq-col--date visible-md-up">
                            { moment( el.tanggal ).format( 'D MMM YYYY , HH:MM' ) }
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
                          { moment( el.tanggal ).format( 'D MMM YYYY , HH:MM' ) }
                        </div>

                      </div>

                    </Button>
                  );
                })

                  :

                ''

            }
          </div>

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