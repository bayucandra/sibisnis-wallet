import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import biqHelper from "../../../lib/biqHelper";

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import BalanceProfileVerification from "./BalanceProfileVerification";

import "./Balance.scss";
import AppActions from "../../../redux/actions/AppActions";
import BalanceTopup from "./BalanceTopup/BalanceTopup";

class Balance extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      is_verifying: false//Is in Balance verification progress
    };

  }

  _setVerifiyingState = val => {
    this.setState( { is_verifying: val } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
  }

  render() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    return (
      <div className={`main-wrapper${!this.props.main_header_mobile_show ? ' main-wrapper--mobile-no-header' : ''} biq-wrapper l-balance`}>
        <div className="biq-wrapper__inner l-balance__inner">
          <SideNavMain cssClasses={"visible-md-up"} />

          {
            (is_photo_set && is_address_set && !this.state.is_verifying) ?

            <BalanceTopup/>

            : <BalanceProfileVerification _setVerifiyingState={this._setVerifiyingState}/>
          }
        </div>
      </div>
    )
  }//render()

}//class Balance

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    main_header_mobile_show: state.app.main_header_mobile_show
  }
};

export default withRouter( connect(mapStateToProps)(Balance) );