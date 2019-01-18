import React, {Component} from 'react';
import {connect} from 'react-redux';

import biqHelper from "lib/biqHelper";

import balanceTransferActions from "../../../../redux/actions/pages/balanceTransferActions";

import appActions from "../../../../redux/actions/global/appActions";

import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral/HeaderMobileGeneral";

import "./BalanceTransferAmount.scss";

class BalanceTransferAmount extends Component {

  _backBtnClick = () => {

    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( balanceTransferActions.memberInfoReset() );

      this.props.history.push( '/balance-transfer' );
    } );

  };

  componentDidMount() {
    let {dispatch} = this.props;

    dispatch( appActions.appRouterChange( { header_mobile_show: false } ) );
  }

  render() {
    return (
      <div className="l-balance-transfer-amount">
        <HeaderMobileGeneral backBtnClick={this._backBtnClick} headerTitle="Transfer saldo"/>

        <div className="l-balance-transfer-amount__body">

          <div className="destination">
            <div className="destination__title">Tujuan transfer</div>
          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {

  return {
    member_info: state.balanceTransfer.member_info
  }

};

export default connect( mapStateToProps ) ( BalanceTransferAmount );