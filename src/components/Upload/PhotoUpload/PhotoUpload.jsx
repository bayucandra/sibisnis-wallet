// Node Modules
import React, { Component } from 'react';

// Custom Components
import DropPhotoUpload from './../DropPhotoUpload/DropPhotoUpload';

// Custom Libraries
import { modalToggle,cameraCaptureFileUpload } from '../../../lib/utilities';
import { modalTypes } from '../../../lib/constants';

// Local Images
import fileIconBlue from './../../../images/icons/ico-file-blue.svg';
import cameraIconBlue from './../../../images/icons/ico-camera-blue.svg';
import WebcamCapture from './../../Shared/WebcamCapture/WebcamCapture';

// Custom CSS
import './PhotoUpload.css';

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
        <input type="file" accept="image/*;capture=camera" capture="camera" id={id} className="upload-file-input" />
        :
        <input type="file" id={id} className="upload-file-input" />
      }
    </div>
  )
}
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragPhotoUpload: false,
      cameraCapture: false
    }
  }

  componentDidMount() {
    cameraCaptureFileUpload.subscribe(
      (data)=>{
        if(data.status){
          this.toggleDragPhotpUpload();
        }
      }
    )
  }

  toggleDragPhotpUpload = () =>{
    this.setState({ dragPhotoUpload: true });
  }

  toggleCameraCapture = (id) => {
    if (navigator.getUserMedia) {
      modalToggle.next({ status: true, type: modalTypes.webCameraCapture });
    } else {
      alert('getUserMedia() is not supported by your browser');
    }
  }

  onCameraCapture = (image) =>{
  }

  render() {
    const { dragPhotoUpload, cameraCapture } = this.state;
    return (
      <React.Fragment>
        {!dragPhotoUpload ?
          <div className="photo-upload-container">
            <div className="photo-upload-header">
              <div className="photo-upload-header__title">Anda belum memiliki photo profile</div>
              <div className="photo-upload-header__description">Untuk keperluan validasi, silahkan tambahkan foto profile terkini anda</div>
            </div>
            <div className="photo-upload-button">
              <div className="photo-upload-button__file">
                <div className="upload-button-container">
                  <label htmlFor="file" className="upload-button ripple" onClick={this.toggleDragPhotpUpload.bind(this)}>
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
          </div> :
          <DropPhotoUpload />}
      </React.Fragment>
    )
  }
}

export default PhotoUpload;