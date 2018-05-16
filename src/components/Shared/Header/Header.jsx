import React, { Component } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';
import menuIcon from './../../../images/icons/menu.svg';

import './Header.css';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null
    }
  }


  onSwtich = () => {
    alert('Switched');
  }

  onLogout = () => {
    alert('Logout');
  }

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  backToDashboard = () =>{
    alert('Back to Dashboard');
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div id="header">
        <div className="header-container container">
          <div className="left-header">
            <img src={switchIcon} className="switch-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
            <span className="user-meta-info">BantulPulsa</span>
          </div>
          <div className="right-header right-header-desktop">
            <img src={logoutIcon} className="logout-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
            <span className="logout-text">Logout</span>
          </div>
          <div className="right-header right-header-mobile">
            {/* <img src={menuIcon}
              onClick={this.onMenuOpen.bind(this)}
              aria-owns={anchorEl ? 'simple-menu' : null}
              className="menu-btn"
              alt="menuIcon" /> */}
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.onMenuOpen.bind(this)}
            >
              <img src={menuIcon}
                className="menu-btn" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onMenuClose.bind(this)}
            >
              <MenuItem onClick={this.backToDashboard.bind(this)}>Switch ke dashboard transaksi</MenuItem>
              <Divider></Divider>
              <MenuItem onClick={this.onLogout.bind(this)}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;