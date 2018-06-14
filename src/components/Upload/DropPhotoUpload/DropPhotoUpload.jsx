import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uploadIconMobile from './../../../images/icons/ico-upload-mobile.svg';
import uploadIconDesktop from './../../../images/icons/ico-upload-desktop.svg';
import PhotoCrop from './../PhotoCrop/PhotoCrop';
import './DropPhotoUpload.css';

class DropPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      src: null
    }
  }

  onDrop = (files) => {
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
          }),
        false
      )
      reader.readAsDataURL(files[0])
    }
    this.setState({
      files
    });
  }

  render() {
    return (
      <div className="drop-photo-upload-container">
        <div className="drop-photo-upload-header">
          <div className="drop-photo-upload-header__title mobile-show__block">Tambahkan foto dari galeri</div>
          <div className="drop-photo-upload-header__title desktop-show__block">Tambahkan foto dari direktori</div>
          <div className="drop-photo-upload-header__description">Maksimum file berukuran 10 Mb, Untuk keperluan validasi pastikan upload foto profile terakhir anda</div>
        </div>

        {!this.state.src ?
          <div className="drop-zone-area-container">
            <Dropzone activeClassName="drop-zone-active" className="drop-zone" onDrop={this.onDrop.bind(this)}>
              <div className="drop-zone-area">
                <img src={uploadIconMobile} className="drop-zone-area__icon upload-icon-mobile" alt="" />
                <img src={uploadIconDesktop} className="drop-zone-area__icon upload-icon-desktop" alt="" />
                <div className="drop-zone-area__description mobile-show__block">Klik untuk menuju ke direktori lokasi Foto</div>
                <div className="drop-zone-area__description desktop-show__block">Tarik file anda kesini, atau klik untuk menuju ke direktori lokasi Foto</div>
              </div>
            </Dropzone>
          </div> :
          <div className="image-preview-container">
            {/* <img src={this.state.files[0].preview} style={{width:'100%',height:'100%'}} alt="" /> */}
            <PhotoCrop src={this.state.src} />
          </div>
        }
        <div className={"drop-photo-upload-button " + (this.state.files.length > 0 ? '' : 'disabled')}>
          Upload Foto
        </div>
      </div>
    )
  }
}

export default DropPhotoUpload;