import React, { Component } from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";

import { Button } from "components/Widgets/material-ui";
import PhoneInput from "components/Widgets/PhoneInput";
import SideNavMain from "components/Shared/SideNavMain/SideNavMain";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";

import "./BalanceTransfer.scss";

class BalanceTransfer extends Component {

  state = {
    input: {
      is_valid: false,
      value: ''
    }
  };

  _inputChange = ( p_obj ) => {
    this.setState( { input: Object.assign( this.state.input, p_obj ) } );
  };

  componentDidMount() {
    let {dispatch} = this.props;

    dispatch( appActions.appRouterChange( { header_mobile_show: false } ) );

  }

  render() {

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper biq-wrapper--md-narrow-side-padding l-balance-transfer">

        <div className="biq-wrapper__inner l-balance-transfer__inner">

          <SideNavMain cssClasses={"visible-md-up"}/>

          <div className="l-balance-transfer-panel">

            <HeaderMobileGeneral headerTitle="Transfer saldo"/>

            <h1 className="l-balance-transfer-panel__title visible-md-up">Transfer Saldo</h1>

            <div className="l-balance-transfer-panel__body">
              <PhoneInput label="Nomor Hp Tujuan" onChange={this._inputChange}/>

              <div className="footer">
                <Button className={`submit-btn${ this.state.input.is_valid ? ' is-ready' : '' }`}>Lanjutkan</Button>
              </div>

            </div>

          </div>

        </div>

      </div>
    );

  }

}

export default connect(null) (BalanceTransfer);