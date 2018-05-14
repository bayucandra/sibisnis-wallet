import React, { Component } from 'react';
import switchIcon from './../../../images/icons/switch.png';
import logoutIcon from './../../../images/icons/logout.png';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './Header.css';

class Header extends Component {
  state = {}


  onSwtich = () => {
    alert('Switched');
  }

  onLogout = () => {
    alert('Logout');
  }

  onMenuClick = () => {
    console.log('Menu Clicked');
  }

  render() {
    return (
      <div id="header">
        <div className="header-container container">
          <div className="left-header">
            <img src={switchIcon} className="switch-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
            <span className="user-meta">BantulPulsa</span>
          </div>
          <div className="right-header right-header-desktop">
            <img src={logoutIcon} className="logout-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
            <span className="logout">Logout</span>
          </div>
        </div>
        <div className="right-header right-header-mobile">
          <IconButton
            aria-label="More"
            aria-owns={null}
            aria-haspopup="true"
            onClick={this.onMenuClick.bind(this)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default Header;