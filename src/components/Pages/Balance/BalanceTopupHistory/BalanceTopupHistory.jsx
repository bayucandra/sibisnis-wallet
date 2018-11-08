import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {IconButton, Button} from '@material-ui/core';

import AppActions from "../../../../redux/actions/AppActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopupHistory.scss";
import iconCloseWhite from "../../../../images/icons/close-white.svg";
import walletProvider from "../../../../providers/walletProvider";

import * as moment from 'moment';

class BalanceTopupHistory extends Component {

  state = {
    data: [
      {
        "id": "1844",
        "bank": "bank-tf-bni",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-15 13:38:24"
      },
      {
        "id": "1845",
        "bank": "bank-tf-mandiri",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-15 14:24:22"
      },
      {
        "id": "1846",
        "bank": "bank-tf-bri",
        "nominal": "10000",
        "status": "2",
        "tanggal": "2018-08-16 17:18:22"
      },
      {
        "id": "1847",
        "bank": "bank-tf-bni",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-18 10:05:22"
      },
      {
        "id": "1848",
        "bank": "bank-tf-bri",
        "nominal": "10000",
        "status": "1",
        "tanggal": "2018-08-25 21:15:22"
      },
      {
        "id": "1849",
        "bank": "bank-tf-mandiri",
        "nominal": "10000",
        "status": "3",
        "tanggal": "2018-08-28 07:20:22"
      }

    ]
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
  }

  _navBackClick = () => {
    biqHelper.utils.clickTimeout(()=>{
      this.props.history.push('/balance');
    });
  };

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
              <div className="history-item" key={el.id}>


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
                      { walletProvider.depositStatusGet( el.status ) }
                    </div>
                  </div>
                  <div className="biq-col-spacer-right visible-md-up"/>
                </div>


                <div className={ `transfer-status-mobile hidden-md-up${ el.status === '2' || el.status === '3' ? ' is-failed' : '' }` }>
                  { walletProvider.depositStatusGet( el.status ) }
                </div>

                <div className="date-mobile hidden-md-up">
                  { moment( el.tanggal ).format( 'D MMM YYYY , HH:MM' ) }
                </div>

              </div>
            );
          } )}
        </div>

      </div>
    );
  }

}

export default withRouter( connect(null) (BalanceTopupHistory) );