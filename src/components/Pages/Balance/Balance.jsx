import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import BalanceProfileVerification from "./BalanceProfileVerification";

import "./Balance.scss";
import BalanceTopup from "./BalanceTopup/BalanceTopup";

class Balance extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      is_verifying: false//Is in Balance verification progress
    };

  }

  render() {
    return (
      <div className={`main-wrapper${!this.props.main_header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper l-balance`}>
        <div className="biq-wrapper__inner l-balance__inner">
          <SideNavMain cssClasses={"visible-md-up"} />

          <Switch>
            <Route path="/balance/profile-verification" component={BalanceProfileVerification} />
            <Route path="/balance" component={BalanceTopup}/>
          </Switch>

        </div>
      </div>
    )
  }//render()

}//class Balance

const mapStateToProps = state => {
  return {
    main_header_mobile_show: state.app.main_header_mobile_show
  }
};

export default withRouter( connect(mapStateToProps) (Balance) );