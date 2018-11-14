import React, { Component } from 'react';
import {connect} from 'react-redux';

import AppActions from "../../../../redux/actions/global/appActions";
import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";

import "./BalancePaymentStatus.scss";

class BalancePaymentStatus extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
  }

  render() {
    return (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          <div className="title">Silahkan memproses pembayaran Anda</div>
          <HeaderMenuMobile forceVisible={true}/>
        </div>



        <div className="balance-payment-status__body">

          <div className="expiration-notice">

            <div className="expiration-notice__icon"/>

            <div className="expiration-notice__time">

              <div className="notice">Batas Waktu Pembayaran</div>
              <div className="time">2 jam  :  30 menit  : 50 detik</div>

            </div>

          </div>

          <div className="payment-detail">

          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    main_header_mobile_show: state.app.main_header_mobile_show
  };
};

export default connect( mapStateToProps )(BalancePaymentStatus);