import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";

import biqHelper from "lib/biqHelper";

import HeaderMobile from "components/Shared/HeaderMobile/HeaderMobile";
import {Button} from "components/Widgets/material-ui";

import "./LoginHistory.scss";

class LoginHistory extends Component {

  _backBtnClickMobile = () => {
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push('/dashboard');
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
  }

  render() {
    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper l-login-history">

        <div className="biq-wrapper__inner l-login-history__inner">

          <HeaderMobile backBtnClick={this._backBtnClickMobile} label={'History Login'}/>

          <div className="header-desktop">
            <Button className="back-btn" onClick={this._backBtnClickMobile}>
              Kembali
            </Button>
          </div>

        </div>

      </div>
    );
  }

}

export default withRouter( connect(null) (LoginHistory) );