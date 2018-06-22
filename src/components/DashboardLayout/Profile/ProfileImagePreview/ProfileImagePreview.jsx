import React, { Component } from 'react';
import menuIcon from './../../../../images/icons/menu.svg';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import rightArrowIcon from './../../../../images/icons/s-litle-right.svg'
import backBlueIcon from './../../../../images/icons/ico-back-blue.svg'
import {modalToggle} from './../../../../lib/utilities';
import {modalTypes} from './../../../../lib/constants';
import './ProfileImagePreview.css';

class ProfileImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuExpand: false
    }
  }

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null, menuExpand:false });
  };

  onExpandMenu = (status) => {
    this.setState({ menuExpand: status })
  }

  getImageFromGallery = () => {
    modalToggle.next({ status: true, type: modalTypes.imageUpload })
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="profile-image-preview-container" >
        <img src={`${this.props.data.image}`} alt="" className="image-preview" onClick={this.onMenuClose.bind(this)} />
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
          </div>
        </div>
        {this.state.anchorEl ?
          <div className="custom-menu">
            {!this.state.menuExpand ?
              <div>
                <div className="custom-menu-item ripple" onClick={this.onExpandMenu.bind(this,true)}>
                  <div className="custom-menu-item__text">
                    <span>Ganti Gambar</span>
                    <img src={rightArrowIcon} alt="" />
                  </div>
                </div>
                <div className="custom-menu-item ripple" onClick={this.onMenuClose.bind(this)}>
                  <div className="custom-menu-item__text">Tutup</div>
                </div>
              </div>
              :
              <div>
                <div className="custom-menu-item expand ripple" onClick={this.onExpandMenu.bind(this,false)}>
                  <div className="custom-menu-item__text">
                    <img src={backBlueIcon} alt="" />
                    <span className="active">Ganti Gambar</span>
                  </div>
                </div>
                <div className="custom-menu-item expand ripple" onClick={this.getImageFromGallery.bind(this)}>
                  <div className="custom-menu-item__text">Ambil dari galeri</div>
                </div>
                <div className="custom-menu-item expand ripple">
                  <div className="custom-menu-item__text">Ambil dari kamera</div>
                </div>
              </div>
            }
          </div> : ''}
      </div>
    )
  }
}

export default ProfileImagePreview;