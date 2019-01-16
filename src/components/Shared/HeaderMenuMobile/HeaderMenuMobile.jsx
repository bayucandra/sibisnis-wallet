import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import appActions from "../../../redux/actions/global/appActions";

import IconButton from "@material-ui/core/IconButton";
import menuIcon from "../../../images/icons/menu.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import biqHelper from "../../../lib/biqHelper";

import "./HeaderMenuMobile.scss";
import biqConfig from "../../../providers/biqConfig";

class HeaderMenuMobile extends  Component {

  state = {
    anchorEl: null
  };

  _onMenuOpen = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  _onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  _switchClick = () => {
    biqHelper.utils.clickTimeout( () => {

      switch( this.props.user_profile.kelompok ) {

        case 'master':
          window.location = `webmin.${biqConfig.url_base}`;
          break;

        case 'premium':
          window.location = `${biqConfig.url_base}/dashboard`;
          break;

        case 'paket':
          window.location = `${biqConfig.url_base}/agen`;
          break;

        default:
          window.location = `${biqConfig.url_base}/agen`;

      }

    } );
  };

  _logoutClick = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appLogout() );
  };

  render() {
    const { anchorEl } = this.state;

    let force_visible = this.props.forceVisible === true;

    return (

      <div className={`header-menu-mobile hidden-md-up${ !this.props.header_menu_mobile_show && !force_visible ? ' header-menu-mobile--hidden-mobile' : '' }`}>

        <IconButton
          className="header-menu-mobile__trigger"
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this._onMenuOpen}
        >
          <img src={menuIcon} className="icon" alt="Menu Icon" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._onMenuClose}
          className="header-menu-panel"
        >

          <MenuItem className="switch" onClick={this._switchClick}>Switch ke dashboard transaksi</MenuItem>

          <Divider/>

          <MenuItem className="logout" onClick={this._logoutClick}>Logout</MenuItem>

        </Menu>

      </div>

    );

  }

}

const mapStateToProps = state => {

  return {
    header_menu_mobile_show: state.app.header_menu_mobile_show,
    user_profile: state.user.profile
  };

};

export default withRouter( connect( mapStateToProps ) ( HeaderMenuMobile ) );