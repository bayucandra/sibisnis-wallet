// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// React Material
import IconButton from '@material-ui/core/IconButton';

// Local Images
import menuIcon from '../../../../images/icons/menu.svg';
import rightArrowIcon from '../../../../images/icons/s-litle-right.svg'
import backBlueIcon from '../../../../images/icons/ico-back-blue.svg'

// Custom Libraries
import {modalToggle, cameraCaptureFileUpload} from '../../../../lib/utilities';//TODO: Delete soon
import {modalTypes} from '../../../../lib/constants';//TODO: Delete soon

import biqHelper from "../../../../lib/biqHelper";

// Custom CSS
import './ProfileImagePreview.scss';
import biqConfig from "../../../../providers/biqConfig";
import appActions from "../../../../redux/actions/global/appActions";

class ProfileImagePreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalPosTop: 0,
      anchorEl: null,
      menuExpand: false
    };
  }

  _modalClose = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appDialogProfilePhotoClose() );
  };

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null, menuExpand:false });
  };

  onExpandMenu = () => {
    this.setState({ menuExpand: true })
  };

  onCollapseMenu = () => {
    this.setState({ menuExpand: false })
  };

  _fromFile = () => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( appActions.appDialogProfilePhotoOpen( 'upload-dialog' ) );
    } );
  };

  _fromCamera = () => {
    biqHelper.utils.clickTimeout( () => this._fromCameraActual() );
  };

  _fromCameraActual = () => {
    let {dispatch} = this.props;
    let is_supported = 'mediaDevices' in navigator;
    if (is_supported) {
      dispatch( appActions.appDialogProfilePhotoOpen( 'camera-dialog' ) );
    } else {
      dispatch( appActions.appDialogNoticeOpen( { title: 'Error', notice: 'Maaf, browser anda tidak mendukung fitur kamera.' } ) );
    }
  };
  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.profile-image-preview', top_space: 184, bottom_space: 240};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 85;
      ratio_opt.bottom_space = 115;
    }
    let top_pos = biqHelper.utils.modalTopRatio( ratio_opt );
    return top_pos;
  }

  componentDidMount() {
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    let top_pos = this._modalPosTopGen();
    if ( this.state.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
      return false;
    }

    return true;
  }

  render() {
    const { anchorEl } = this.state;
    let { photo } = this.props.user_profile;
    return (
      <div className="profile-image-preview" style={{ marginTop: this.state.modalPosTop }} >

        <div className={"profile-image-preview__inner"}
             onClick={this.onMenuClose}>
          <img alt={"Profile picture"} src={`${biqConfig.profile_photo_url_base}/${ encodeURI(photo) }`}/>
        </div>

        <div className="menu">

          <div className="profile-menu-button ripple icon-touch-area-container-40">
            {/* <img src={menuIcon} alt="menu-icon" /> */}

            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.onMenuOpen}
            >
              <img src={menuIcon}
                className="menu-btn ripple" />
            </IconButton>

          </div>

        </div>

        {this.state.anchorEl ?
          <div className="custom-menu">
            {
              !this.state.menuExpand ?

              <>

                <div className="custom-menu-item ripple" onClick={this.onExpandMenu}>
                  <div className="custom-menu-item__text">
                    <span>Ganti Gambar</span>
                    <img src={rightArrowIcon} alt="" />
                  </div>
                </div>

                <div className="custom-menu-item ripple" onClick={this._modalClose}>
                  <div className="custom-menu-item__text">Tutup</div>
                </div>

              </>

                :

              <>

                <div className="custom-menu-item expand ripple" onClick={this.onCollapseMenu}>
                  <div className="custom-menu-item__text">
                    <img src={backBlueIcon} alt="" />
                    <span className="active">Ganti Gambar</span>
                  </div>
                </div>

                <div className="custom-menu-item expand ripple" onClick={this._fromFile}>
                  <div className="custom-menu-item__text">Ambil dari galeri</div>
                </div>

                <div className="custom-menu-item expand ripple" onClick={this._fromCamera}>
                  <div className="custom-menu-item__text">Ambil dari kamera</div>
                </div>

              </>

            }
          </div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user_profile: store.user.profile
  }
};

export default withRouter( connect( mapStateToProps ) (ProfileImagePreview) );