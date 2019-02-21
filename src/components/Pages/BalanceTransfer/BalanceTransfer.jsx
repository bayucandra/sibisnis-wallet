import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import appActions from "redux/actions/global/appActions";
import balanceTransferActions from "redux/actions/pages/balanceTransferActions";

import SideNavMain from "components/Shared/SideNavMain/SideNavMain";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";

import BalanceTransferPhone from "./BalanceTransferPhone";
import BalanceTransferAmount from "./BalanceTransferAmount";
import BalanceTransferSuccess from "./BalanceTransferSuccess/BalanceTransferSuccess";

import "./BalanceTransfer.scss";

class BalanceTransfer extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    if ( !this.props.balance_transfer.member_info.is_fetching && nextProps.balance_transfer.member_info.is_fetching ) {
      dispatch( appActions.appLoadingIndicatorShow() );
      return false;
    }

    if( !this.props.balance_transfer.member_info.is_fetched && nextProps.balance_transfer.member_info.is_fetched ) {
      dispatch( appActions.appLoadingIndicatorHide() );
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    let {dispatch} = this.props;

    dispatch( balanceTransferActions.memberInfoCanceled() );
    dispatch( balanceTransferActions.nominalCanceled() );
    dispatch( balanceTransferActions.memberInfoReset() );

  }

  render() {

    return (
      <>

        {

          !this.props.loading_indicator_show ?

          <div
            className={`main-wrapper${!this.props.header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper biq-wrapper--md-narrow-side-padding l-balance-transfer`}>

            <div className="biq-wrapper__inner l-balance-transfer__inner">

              <SideNavMain cssClasses={"visible-md-up"}/>

              <Switch>
                <Route path="/balance-transfer/success" component={BalanceTransferSuccess}/>
                <Route path="/balance-transfer/amount" component={BalanceTransferAmount}/>
                <Route path="/balance-transfer" component={BalanceTransferPhone}/>
              </Switch>

            </div>

          </div>

            :

          <HeaderMobileGeneral headerTitle="Transfer saldo"/>

        }

      </>

    );

  }

}

const mapStateToProps = state => {
  return {
    loading_indicator_show: state.app.loading_indicator_show,
    header_mobile_show: state.app.header_mobile_show,
    balance_transfer: state.balanceTransfer
  };
};

export default connect( mapStateToProps ) (BalanceTransfer);