import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import biqHelper from "../../../lib/biqHelper";

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import BalanceProfileVerification from "./BalanceProfileVerification";

import "./Balance.scss";

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
  }

  render() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    return (
      <div className="main-wrapper biq-wrapper l-balance">
        <div className="biq-wrapper__inner l-balance__inner">
          <SideNavMain cssClasses={"visible-md-up"} />

          {
            (is_photo_set && is_address_set && !this.state.is_verifying) ?

            <div>test</div>

            : <BalanceProfileVerification _setVerifiyingState={this._setVerifiyingState}/>
          }
        </div>
      </div>
    )
  }//render()

}//class Balance

const mapStateToProps = store => {
  return {
    user_profile: store.user.profile
  }
};

export default withRouter( connect(mapStateToProps)(Balance) );