import React, { Component } from 'react';
import DropPhotoUpload from './../DropPhotoUpload/DropPhotoUpload';
import './PhotoUpload.css';
import fileIconBlue from './../../../images/icons/ico-file-blue.svg';
import cameraIconBlue from './../../../images/icons/ico-camera-blue.svg';

const UploadButton = (props) => {
  const { id, icon, label } = props
  return (
    <div className="upload-button-container">
      <label for={id} className="upload-button ripple">
        <div className="upload-button__icon">
          <img src={icon} alt="icon-button" />
        </div>
        <div className="upload-button__label">
          {label}
        </div>
      </label>
      {id === "camera" ?
        <input type="file" accept="image/*;capture=camera" id={id} className="upload-file-input" />
        :
        <input type="file" id={id} className="upload-file-input" />
      }
    </div>
  )
}

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      // <div className="photo-upload-container">
      //   <div className="photo-upload-header">
      //     <div className="photo-upload-header__title">Anda belum memiliki photo profile</div>
      //     <div className="photo-upload-header__description">Untuk keperluan validasi, silahkan tambahkan foto profile terkini anda</div>
      //   </div>
      //   <div className="photo-upload-button">
      //     <div className="photo-upload-button__file">
      //       <UploadButton icon={fileIconBlue} label="Ambil dari direktori" id="file" />
      //     </div>
      //     <div className="photo-upload-button__Camera">
      //       <UploadButton icon={cameraIconBlue} label="Ambil dari Kamera" id="camera" />
      //     </div>
      //   </div>
      // </div>
      <DropPhotoUpload/>
    )
  }
}

export default PhotoUpload;