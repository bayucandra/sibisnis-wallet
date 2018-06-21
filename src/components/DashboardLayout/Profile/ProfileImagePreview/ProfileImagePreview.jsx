import React, { Component } from 'react';
import menuIcon from './../../../../images/icons/menu.svg';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import rightArrowIcon from './../../../../images/icons/s-litle-right.svg'

import './ProfileImagePreview.css';

class ProfileImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="profile-image-preview-container" onClick={this.onMenuClose.bind(this)}>
        <img src={`..${this.props.data.image}`} alt="" className="image-preview" />
        <div className="profile-menu-container">
          <div className="profile-menu-button ripple icon-touch-area-container-40">
            {/* <img src={menuIcon} alt="menu-icon" /> */}
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.onMenuOpen.bind(this)}
            >
              <img src={menuIcon}
                className="menu-btn ripple" />
            </IconButton>
            {/* <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onMenuClose.bind(this)}
              className="profile-menu-item-container"
            >
              <MenuItem className="profile-menu">
                <div className="profile-menu-item"><span className="profile-menu-item__text">Ganti Gambar</span><img src={rightArrowIcon} alt="" /></div>
              </MenuItem>
              <Divider></Divider>
              <MenuItem className="profile-menu">
              <div className="profile-menu-item"><span className="profile-menu-item__text">Tutup</span></div>
              </MenuItem>
            </Menu> */}
          </div>
        </div>
        {this.state.anchorEl ?
              <div className="custom-menu">
                <div className="custom-menu-item">Ganti Gambar</div>
                <div className="custom-menu-item">Tutup</div>
              </div> : ''}
      </div>
    )
  }
}

export default ProfileImagePreview;