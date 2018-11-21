// Node Modules
import React, { Component } from 'react';

// Custom Components
import DropPhotoUpload from '../DropPhotoUpload/DropPhotoUpload';

// Custom Libraries
import { modalToggle,cameraCaptureFileUpload } from '../../../lib/utilities';//TODO: Delete soon
import { modalTypes } from '../../../lib/constants';//TODO: Delete soon
import biqHelper from "../../../lib/biqHelper/index";

// Local Images
import fileIconBlue from '../../../images/icons/ico-file-blue.svg';
import cameraIconBlue from '../../../images/icons/ico-camera-blue.svg';
import WebcamCapture from '../WebcamCapture/WebcamCapture';

// Custom CSS
import './PhotoUpload.scss';
import closeIconBlack from "../../../images/icons/ico-close-black.svg";
/*
const UploadButton = (props) => {
  const { id, icon, label, onClick } = props
  return (
    <div className="upload-button-container">
      <label htmlFor={id} className="upload-button ripple" onClick={onClick(id)}>
        <div className="upload-button__icon">
          <img src={icon} alt="icon-button" />
        </div>
        <div className="upload-button__label">
          {label}
        </div>
      </label>
      {id === "camera" ?
        <input type="file" accept="image/!*;capture=camera" capture="camera" id={id} className="upload-file-input" />
        :
        <input type="file" id={id} className="upload-file-input" />
      }
    </div>
  )
}*/
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragPhotoUpload: false,
      cameraCapture: false,
      modalPosTop: 0
    };
  }

  toggleDragPhotoUpload = () =>{
    // this.setState({ dragPhotoUpload: true });
    this.props.modalSetActiveComponent( DropPhotoUpload );
  }

  toggleCameraCapture = (id) => {
    if (navigator.getUserMedia) {
      modalToggle.next({ status: true, type: modalTypes.webCameraCapture });
    } else {
      alert('getUserMedia() is not supported by your browser');
    }
  };

  onCameraCapture = (image) =>{
  };

  modalPosTopGen() {
    let ratio_opt = { box_selector: '.photo-upload-container', top_space: 155, bottom_space: 459};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 97;
      ratio_opt.bottom_space = 97;
    }
    let top_pos;
    top_pos = biqHelper.utils.modalTopRatio(ratio_opt);
    return top_pos;
  }

  componentDidMount(){
    let top_pos = this.modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );

    cameraCaptureFileUpload.subscribe(
      (data)=>{
        if(data.status){
          this.toggleDragPhotoUpload();
        }
      }
    )
  }

  componentDidUpdate(prevProp, prevState){
    let top_pos = this.modalPosTopGen();
    if ( prevState.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
    }
  }

  _modalClose = ()=>{
    biqHelper.utils.clickTimeout({
      callback: this.props.modalClose
    });
  };

  render() {

    const { dragPhotoUpload, cameraCapture } = this.state;
    return (
        <>
          <div className="photo-upload-container" style={{marginTop: this.state.modalPosTop}}>

            <div className="modal-close-block">
              <div className="close-icon icon-touch-area-container-50 ripple" onClick={this._modalClose}>
                <img src={closeIconBlack} alt="close-icon-black" />
              </div>
            </div>

            <div className="photo-upload-header">
              <div className="photo-upload-header__title">Anda belum memiliki photo profile</div>
              <div className="photo-upload-header__description">Untuk keperluan validasi, silahkan tambahkan foto profile terkini anda</div>
            </div>
            <div className="photo-upload-button">
              <div className="photo-upload-button__file">
                <div className="upload-button-container">
                  <label htmlFor="file" className="upload-button ripple" onClick={this.toggleDragPhotoUpload}>
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
                {cameraCapture ? <WebcamCapture onCameraCapture={this.onCameraCapture} /> : null}
                <div className="upload-button-container">
                  <label htmlFor="file" className="upload-button ripple" onClick={this.toggleCameraCapture.bind(this)}>
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
          </div>
        </>
    )
  }
}

export default PhotoUpload;