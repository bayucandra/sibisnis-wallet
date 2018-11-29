import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import {Button} from '../../../Widgets/material-ui';

import appActions from "../../../../redux/actions/global/appActions";
import balanceActions from "../../../../redux/actions/pages/balanceActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopUpHistory.scss";
import iconCloseWhite from "../../../../images/icons/close-white.svg";
import walletProvider from "../../../../providers/walletProvider";

import * as moment from 'moment';

class BalanceTopUpHistory extends Component {

  state = {
    data: [
      {
        "id": "1",
        "bank": "bank-tf-bni",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-15 13:38:24"
      },
      {
        "id": "2",
        "bank": "bank-tf-mandiri",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-15 14:24:22"
      },
      {
        "id": "3",
        "bank": "bank-tf-bri",
        "nominal": "10000",
        "status": "2",
        "tanggal": "2018-08-16 17:18:22"
      },
      {
        "id": "4",
        "bank": "bank-tf-bni",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-18 10:05:22"
      },
      {
        "id": "5",
        "bank": "bank-tf-bri",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-25 21:15:22"
      },
      {
        "id": "6",
        "bank": "bank-tf-mandiri",
        "nominal": "10000",
        "status": "3",
        "tanggal": "2018-08-28 07:20:22"
      }

    ]
  };

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

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    dispatch( balanceActions.balanceTopUpHistoryFetch() );

  }

  render() {
    return (
      <div className="balance-topup-history">

        <nav className="nav-mobile hidden-md-up">
          <div className="title">History Topup</div>
          <IconButton className="close-btn" onClick={this._navBackClick}>
            <img src={iconCloseWhite}/>
          </IconButton>
        </nav>

        <nav className="nav-desktop visible-md-up">

          <Button className="back-btn" onClick={this._navBackClick}>&nbsp;</Button>

          <div className="title">History Topup</div>

        </nav>

        <div className="history-panel">

          <div className="header visible-md-up">
            <div className="biq-col-spacer-left"/>
            <div className="biq-col biq-col--date">Tanggal</div>
            <div className="biq-col biq-col--method">Metode Transfer</div>
            <div className="biq-col biq-col--amount">Jumlah</div>
            <div className="biq-col biq-col--status">Status</div>
            <div className="biq-col-spacer-right"/>
          </div>

          {this.state.data.map( ( el )=>{
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
                      <div className={`status-box${ el.status === '2' || el.status === '3' ? ' is-failed' : '' }`}>
                        { walletProvider.paymentStatusGet( el.status ) }
                      </div>
                    </div>
                    <div className="biq-col-spacer-right visible-md-up"/>
                  </div>


                  <div className={ `transfer-status-mobile hidden-md-up${ el.status === '2' || el.status === '3' ? ' is-failed' : '' }` }>
                    { walletProvider.paymentStatusGet( el.status ) }
                  </div>

                  <div className="date-mobile hidden-md-up">
                    { moment( el.tanggal ).format( 'D MMM YYYY , HH:MM' ) }
                  </div>

                </div>

              </Button>
            );
          } )}
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

export default withRouter( connect( mapStateToProps ) (BalanceTopUpHistory) );