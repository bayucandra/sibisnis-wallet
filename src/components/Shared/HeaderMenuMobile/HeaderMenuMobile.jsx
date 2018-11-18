import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./HeaderMenuMobile.scss";
import IconButton from "@material-ui/core/IconButton";
import menuIcon from "../../../images/icons/menu.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

class HeaderMenuMobile extends  Component {

  state = {
    anchorEl: null
  };

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
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
          onClick={this.onMenuOpen}
        >
          <img src={menuIcon} className="icon" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          <MenuItem>
            <span  className="switch-to-desktop-text">Switch ke dashboard transaksi</span>
          </MenuItem>

          <Divider/>

          <MenuItem>
            <span className="logout-text">Logout</span>
          </MenuItem>
        </Menu>

      </div>

    );

  }

}

const mapStateToProps = state => {

  return {
    header_menu_mobile_show: state.app.header_menu_mobile_show
  };

};

export default connect( mapStateToProps ) ( HeaderMenuMobile );