import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import appActions from "../../../redux/actions/global/appActions";

import { Button } from '../../Widgets/material-ui';

import HeaderMenuMobile from "../HeaderMenuMobile";

import biqHelper from "../../../lib/biqHelper";
import biqConfig from "../../../providers/biqConfig";

import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';

import './Header.scss';

class Header extends Component {

  _switchClick = () => {

    biqHelper.utils.clickTimeout( () => {

      let dst = `${biqConfig.url_base}/agen`;

      switch( this.props.user_profile.kelompok ) {

        case 'master':
          dst = `${biqConfig.protocol}//webmin.${biqConfig.host}`;
          break;

        case 'premium':
          dst = `${biqConfig.url_base}/dashboard`;
          break;

        case 'paket':
          dst = `${biqConfig.url_base}/agen`;
          break;

        default:
          dst = `${biqConfig.url_base}/agen`;

      }

      console.log(this.props.user_profile.kelompok);
      console.log(dst);

      window.location = dst;

    } );
  };

  _logoutClick = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appLogout() );
  };

  _goToDashboard = () =>{
    biqHelper.utils.clickTimeout( () =>{
      this.props.history.push('/');
    } );
  };

  render() {
    return (
      <div className={`biq-wrapper header-main${!this.props.header_mobile_show ? ' header-main--hidden-mobile' : ''}`}>

        <div className="biq-wrapper__inner header-main__inner">

          <div className="left">

            <Button className="switch-btn visible-md-up" onClick={this._switchClick}>
              <img src={switchIcon} alt="switch" />
            </Button>

            <Button className="brand" onClick={this._goToDashboard}>
               BantulPulsa
            </Button>

          </div>

          <div className="right">

            <Button className="logout-btn visible-md-up" onClick={this._logoutClick}>
              <img src={logoutIcon} className="logout-btn__icon" alt="switch" />
              <span className="logout-btn__text">Logout</span>
            </Button>

            <HeaderMenuMobile/>

          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    header_mobile_show: state.app.header_mobile_show,
    should_redirect_to_agen: state.app.should_redirect_to_agen,
    user_profile: state.user.profile
  }
};

export default withRouter( connect( mapStateToProps ) (Header) );