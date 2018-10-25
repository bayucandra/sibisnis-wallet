// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// React Material
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// Local Images
import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';
import menuIcon from './../../../images/icons/menu.svg';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Custom Components
import HeaderNavigationStatus from './../HeaderNavigationStatus/HeaderNavigationStatus';

// Custom CSS
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      headerTitle: 'BantulPulsa'
    }
  }

  componentWillMount() {
    navigationStatus.subscribe(
      (data) => {
        if(data.navigationLink){
          this.setState({headerTitle:data.navigationLink});
        }
      }
    )
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

  goToDashboard = () =>{
    this.props.history.replace('/');
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div id="header">
        <div className="header-container container-inner">
          <div className="left-header">
            <div className="header-navigation-status-desktop">
              <img src={switchIcon} className="switch-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
              <div className="user-meta-info-container ripple" onClick={this.goToDashboard.bind()}>
                 <span className="user-meta-info">BantulPulsa</span>
              </div>
            </div>
            <div className="header-navigation-status-mobile">
              <HeaderNavigationStatus />
            </div>
          </div>
          <div className="right-header right-header-desktop">
            <img src={logoutIcon} className="logout-icon" onClick={this.onSwtich.bind(this)} alt="switch" />
            <span className="logout-text">Logout</span>
          </div>
          <div className="right-header right-header-mobile">
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.onMenuOpen.bind(this)}
            >
              <img src={menuIcon}
                className="menu-btn ripple" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onMenuClose.bind(this)}
            >
              <MenuItem onClick={this.backToDashboard.bind(this)}><span  className="switch-to-desktop-text">Switch ke dashboard transaksi</span></MenuItem>
              <Divider></Divider>
              <MenuItem onClick={this.onLogout.bind(this)}><span className="logout-text">Logout</span></MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);