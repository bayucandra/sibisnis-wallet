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

  render() {
    return (
      <div className={`main-wrapper${!this.props.header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper l-balance`}>
        <div className="biq-wrapper__inner l-balance__inner">
          <SideNavMain cssClasses={"visible-md-up"} />

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