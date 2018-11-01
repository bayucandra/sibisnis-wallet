// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// React Material
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Local Images
import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';
import menuIcon from './../../../images/icons/menu.svg';

// Custom Libraries
import biqHelper from "../../../lib/biqHelper";
import biqConfig from "../../../providers/biqConfig";

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

  onSwitch = () => {
    biqHelper.utils.clickTimeout( () => {
      window.location = biqConfig.agen.url_base;
    } );
  };

  onLogout = () => {
    alert('Logout');
  };

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  backToDashboard = () =>{
    alert('Back to Dashboard');
  }

  goToDashboard = () =>{
    biqHelper.utils.clickTimeout( () =>{
      this.props.history.replace('/');
    } );
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="biq-wrapper header-main">

        <div className="biq-wrapper__inner header-main__inner">

          <div className="left">

            <Button className="switch-btn visible-md-up" onClick={this.onSwitch}>
              <img src={switchIcon} alt="switch" />
            </Button>

            <Button className="brand" onClick={this.goToDashboard}>
               BantulPulsa
            </Button>

          </div>

          <div className="right">

            <Button className="logout-btn visible-md-up">
              <img src={logoutIcon} className="logout-btn__icon" onClick={this.onSwitch} alt="switch" />
              <span className="logout-btn__text">Logout</span>
            </Button>

            <div className="menu-btn-mobile hidden-md-up">

              <IconButton
                className="menu-btn-mobile__trigger"
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
                <MenuItem onClick={this.backToDashboard}>
                  <span  className="switch-to-desktop-text">Switch ke dashboard transaksi</span>
                </MenuItem>

                <Divider/>

                <MenuItem onClick={this.onLogout}>
                  <span className="logout-text">Logout</span>
                </MenuItem>
              </Menu>

            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default withRouter(Header);