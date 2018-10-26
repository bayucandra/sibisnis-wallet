import React, {Component} from 'react';
import { connect } from 'react-redux';
import biqHelper from "../../../lib/biqHelper";

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import BalanceProfileVerification from "./BalanceProfileVerification";

import "./Balance.scss";

class Balance extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      was_verified: false
    };

  }

  componentDidMount() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    this.setState( { was_verified: is_photo_set && is_address_set } );
  }

  render() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    return (
      <div className="main-wrapper biq-wrapper l-balance">
        <div className="biq-wrapper__inner l-balance__inner">
          <SideNavMain cssClasses={"visible-md-up"} />

          {
            (is_photo_set && is_address_set && this.state.was_verified) ?

            <div>test</div>

            : <BalanceProfileVerification/>
          }
        </div>
      </div>
    )
  }//render()

}//class Deposit

const mapStateToProps = store => {
  return {
    user_profile: store.user.profile
  }
};

export default connect(mapStateToProps)(Balance);