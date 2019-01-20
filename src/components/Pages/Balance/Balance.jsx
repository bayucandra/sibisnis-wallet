import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import BalanceProfileVerification from "./BalanceProfileVerification";
import BalanceTopupHistory from "./BalanceTopUpHistory";
import BalanceTopup from "./BalanceTopUp/BalanceTopUp";

import "./Balance.scss";

class Balance extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      is_verifying: false//Is in Balance verification progress
    };

  }

/*  componentWillUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;
    let should_loading_show = nextProps.balance.top_up_history.is_fetching;
    let should_loading_hide = nextProps.balance.top_up_history.is_fetched;

    if ( should_loading_show ) dispatch(appActions.appLoadingIndicatorShow());

    if ( should_loading_hide ) dispatch(appActions.appLoadingIndicatorHide());

  }*/

  render() {

    return (
      <div className={`main-wrapper${!this.props.header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper biq-wrapper--md-narrow-side-padding l-balance`}>
        <div className="biq-wrapper__inner l-balance__inner">

          <SideNavMain cssClasses={"visible-md-up"}/>

          <Switch>
            <Route path="/balance/profile-verification" component={BalanceProfileVerification} />
            <Route path="/balance/topup-history" component={BalanceTopupHistory} />
            <Route path="/balance" component={BalanceTopup}/>
          </Switch>

        </div>
      </div>
    )
  }//render()

}//class Balance

const mapStateToProps = state => {
  return {
    header_mobile_show: state.app.header_mobile_show,
    balance: state.balance
  }
};

export default withRouter( connect(mapStateToProps) (Balance) );