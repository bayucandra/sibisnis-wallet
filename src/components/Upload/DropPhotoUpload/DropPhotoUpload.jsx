// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';

// Custom Components
import PhotoCrop from './../PhotoCrop/PhotoCrop';
import UploadProgressButton from './../../Shared/UploadProgressButton/UploadProgressButton';

// Custom Libraries
import { modalToggle } from './../../../lib/utilities';//TODO: Delete soon
import biqHelper from "../../../lib/biqHelper";

// Redux
import { getUserWithUpdatedProfile } from './../../../redux/actions/UserActions';
import { connect } from 'react-redux';

// Local Images
import uploadIconMobile from './../../../images/icons/ico-upload-mobile.svg';
import uploadIconDesktop from './../../../images/icons/ico-upload-desktop.svg';

// Custom CSS
import './DropPhotoUpload.scss';
import closeIconBlack from "../../../images/icons/ico-close-black.svg";

class DropPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      src: null,
      croppedImage: null,
      error:false,
      success:false,
      uploading:false,
      changeImageStatus: false,
      uploadProgress: 0,
      modalPosTop: 0
    }
  }

  onDrop = (files) => {

    if (files && files.length > 0) {

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
            changeImageStatus:true,
            croppedImage: reader.result
          }),
        false
      );

      reader.readAsDataURL(files[0]);

    }

    this.setState({files});

  };

  onImageChange = (e) => {
    let files = e.target.files;

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => this.setState({
            src: reader.result,
            changeImageStatus:true,
            croppedImage: reader.result,
            error:false,
            success:false,
            uploading:false,
            uploadStatus:false
          }),

        false
      );

      reader.readAsDataURL(files[0])

    }

    this.setState({
      files
    });

  };

  // Set the image or directly upload it to server from here
  onImageCrop = (image) => {
    this.setState({ croppedImage: image });
  };

  onImageUploadStart = () => {

    if (this.state.error || this.state.success) {
      if (this.state.success) {
      } else {
        // this.setState({ uploading: true, changeImageStatus: false, error: false }, () => {
        //   setTimeout(() => {
        //     this.setState({ success: true, uploading: false })
        //   }, 1500)
        // });
        this.props.getUserWithUpdatedProfile(this.state.croppedImage);
      }
    }

  };

/*
  // Create simulation for image upload if error
  simulateErrorOnImageUpload = () =>{
    this.setState({ uploading: true, uploadStatus: true }, () => {
      setTimeout(() => {
        this.setState({ uploadProgress: 45 }, () => {
          setTimeout(() => {
            this.setState({ error: true, });
          }, 2000);
        })
      }, 1000);
    });
  }*/


  modalPosTopGen() {
    let ratio_opt = { box_selector: '.drop-photo-upload-container', top_space: 155, bottom_space: 317};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 30;
      ratio_opt.bottom_space = 30;
    }
    let top_pos = biqHelper.utils.modalTopRatio( ratio_opt );
    return top_pos;
  }

  componentDidMount(){
    let top_pos = this.modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  componentDidUpdate(prevProp, prevState){
    let top_pos = this.modalPosTopGen();
    if ( prevState.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
    }
  }

  render() {
    const { error, success, uploading } = this.state;
    let file_not_set = this.state.files.length > 0;

    return (
      <div className="drop-photo-upload-container" style={{ marginTop: this.state.modalPosTop }}>

        <div className="close-icon-container">
          <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.props.modalClose}>
            <img src={closeIconBlack} alt="close-icon-black" />
          </div>
        </div>

        <div className="drop-photo-upload-header">
          <div className="drop-photo-upload-header__title mobile-show__block">Tambahkan foto dari galeri</div>
          <div className="drop-photo-upload-header__title desktop-show__block">Tambahkan foto dari direktori</div>
          <div className="drop-photo-upload-header__description">Maksimum file berukuran 10 Mb, Untuk keperluan validasi pastikan upload foto profile terakhir anda</div>
        </div>

        {!this.state.src ?
          <div className="drop-zone-area-container">
            <Dropzone activeClassName="drop-zone-active" accept="image/jpeg, image/png" className="drop-zone" onDrop={this.onDrop.bind(this)}>
              <div className="drop-zone-area">
                <img src={uploadIconMobile} className="drop-zone-area__icon upload-icon-mobile" alt="" />
                <img src={uploadIconDesktop} className="drop-zone-area__icon upload-icon-desktop" alt="" />
                <div className="drop-zone-area__description mobile-show__block">Klik untuk menuju ke direktori lokasi Foto</div>
                <div className="drop-zone-area__description desktop-show__block">Tarik file anda kesini, atau klik untuk menuju ke direktori lokasi Foto</div>
              </div>
            </Dropzone>
          </div> :
          <div className="image-preview-container">
            <PhotoCrop src={this.state.src} onImageCrop={this.onImageCrop} />
          </div>
        }

        <div className="image-actions-container">

          <Button className={ "upload-photo-btn" + (file_not_set ? ' is-disabled' : '') }>
            <div className="icon"></div>
            <div className="text text--upload">Upload Foto</div>
          </Button>

{/*          <UploadProgressButton
            disabled={this.state.files.length > 0}
            progress={this.state.uploadProgress}
            uploadingStatus={{ error, success, uploading }}
            onImageUploadStart={this.onImageUploadStart.bind(this)}
          />*/}


          {((this.state.src && this.state.changeImageStatus) && !this.state.uploadStatus) ?
            <div className="change-image-button-container">
              <label htmlFor="change-image" className="change-image-button ripple">
                Ganti Foto
              </label>
              <input type="file" id="change-image" onChange={this.onImageChange.bind(this)} className="change-image-input" accept="image/jpeg, image/png" />
            </div> : null
          }
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = {
  getUserWithUpdatedProfile
};


export default withRouter( connect( null, mapDispatchToProps)(DropPhotoUpload) );