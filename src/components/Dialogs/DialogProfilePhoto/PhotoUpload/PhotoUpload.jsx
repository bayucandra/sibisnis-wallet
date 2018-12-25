import React, { Component } from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";

import biqHelper from "lib/biqHelper";

import Modal from "@material-ui/core/Modal";
import ModalNotice from "components/Widgets/ModalNotice/ModalNotice";

import {Button} from "components/Widgets/material-ui";

// Local Images
import fileIconBlue from 'images/icons/ico-file-blue.svg';
import cameraIconBlue from 'images/icons/ico-camera-blue.svg';

import "./PhotoUpload.scss";
import "styles/components/_modal.scss";

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPosTop: 0,
      modal_notice: {
        is_open: false,
        text: {
          title: 'Error',
          notice: ''
        }
      }
    };
  }

  _modalNoticeOpen = ( p_obj_notice = {} ) => {
    let params = {
      title: 'Error',
      notice: ''
    };

    Object.assign( params, p_obj_notice );

    this.setState( { modal_notice: {
        is_open: true,
        text: params
      } } );

  };

  _modalNoticeClose = () => {
    this.setState( { modal_notice: Object.assign( {}, this.state.modal_notice, { is_open: false } ) } );
  };

  _fromFile = () =>{
    let {dispatch} = this.props;
    dispatch( appActions.appDialogProfilePhotoOpen( 'upload-dialog' ) );
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
      this._modalNoticeOpen({ title: 'Error', notice: 'Maaf, browser anda tidak mendukung fitur kamera.' });
    }
  };

  _modalPosTopGen = () => {
    let ratio_opt = { box_selector: '.photo-upload-container', top_space: 155, bottom_space: 459};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 97;
      ratio_opt.bottom_space = 97;
    }
    let top_pos;
    top_pos = biqHelper.utils.modalTopRatio(ratio_opt);
    return top_pos;
  };

  componentDidMount(){
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  componentDidUpdate(prevProp, prevState, snapshot){
    let top_pos = this._modalPosTopGen();
    if ( prevState.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
    }
  }

  _modalClose = ()=>{
    biqHelper.utils.clickTimeout(()=>this.props.modalClose() );
  };

  render() {

    return (
      <div className="photo-upload-container" style={{marginTop: this.state.modalPosTop}}>

        <Button className="modal-close-btn" onClick={this._modalClose} >&nbsp;</Button>

        <div className="photo-upload-header">
          <div className="photo-upload-header__title">Anda belum memiliki photo profile</div>
          <div className="photo-upload-header__description">Untuk keperluan validasi, silahkan tambahkan foto profile terkini anda</div>
        </div>

        <div className="photo-upload-button">
          <div className="photo-upload-button__file">
            <div className="upload-button-container">
              <label htmlFor="file" className="upload-button ripple" onClick={this._fromFile}>
                <div className="upload-button__icon">
                  <img src={fileIconBlue} alt="icon-button" />
                </div>
                <div className="upload-button__label">
                  Ambil dari direktori
                </div>
              </label>
            </div>
          </div>

          <div className="photo-upload-button__Camera">
            <div className="upload-button-container">
              <label htmlFor="file" className="upload-button ripple" onClick={this._fromCamera}>
                <div className="upload-button__icon">
                  <img src={cameraIconBlue} alt="icon-button" />
                </div>
                <div className="upload-button__label">
                  Ambil dari Kamera
                </div>
              </label>
            </div>
          </div>

        </div>

        <Modal
          open={this.state.modal_notice.is_open}
          onClose={this._modalNoticeClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalNoticeClose}
                 title={this.state.modal_notice.text.title}
                 notice={this.state.modal_notice.text.notice}/>
          </div>

        </Modal>

      </div>
    )
  }
}

export default connect( null ) ( PhotoUpload );