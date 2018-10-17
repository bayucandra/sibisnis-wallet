// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';

import { Observable } from 'rxjs'; // = require("rxjs")
import { ajax } from 'rxjs/ajax'; // = require("rxjs/ajax")
import { map } from 'rxjs/operators'; // = require("rxjs/operators")

// Custom Components
import PhotoCrop from './../PhotoCrop/PhotoCrop';
import UploadProgressButton from './../../Shared/UploadProgressButton/UploadProgressButton';//TODO: deprecated and delete soon

// Custom Libraries
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
import biqConfig from "../../../providers/biqConfig";

class DropPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      src: null,
      cropData: {
        pixelCrop: null
      },
      error:false,
      success:false,
      uploading:false,
      changeImageStatus: false,
      uploadProgress: 0,
      modalPosTop: 0
    }
  }

  onDrop = (files) => {

    if ( !biqHelper.utils.isNull(files) && files.length > 0) {

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
            changeImageStatus:true
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


  parseCroppedImg = ( pixelCrop ) => {
    this.setState( { cropData: { pixelCrop } }  );
  };

  getCroppedImg = (image, pixelCrop, fileName) => {

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    var img2 = document.createElement('img'); // use DOM HTMLImageElement
    img2.src = image;
    const ctx = canvas.getContext('2d');
    // debugger;
    ctx.drawImage(
      img2,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // return base64Image;
    // As a blob

    return Observable.create(( observer )=>{
      observer.next();
      canvas.toBlob(file => {
        file.name = fileName;
        observer.next(file);
      }, 'image/jpeg');

    });
  };

  onImageUploadStart = () => {
    console.log(this.state.src);
    console.log(this.state.cropData.pixelCrop);
return;
    this.getCroppedImg( this.state.src, this.state.cropData.pixelCrop, 'test' )
      .subscribe(( file )=>{

        console.log(file);
        return;
        let form_data = new FormData();
        form_data.append( 'profile-picture' );

        let request$ = ajax({
          url: biqConfig.api.url_base,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8; ',
          },
          body: {
            hello: 'World!'
          }
        });

        if (this.state.error || this.state.success) {
          if (this.state.success) {
          } else {
            // this.setState({ uploading: true, changeImageStatus: false, error: false }, () => {
            //   setTimeout(() => {
            //     this.setState({ success: true, uploading: false })
            //   }, 1500)
            // });
            // this.props.getUserWithUpdatedProfile(this.state.croppedImage);
          }
        }

      });

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
            <PhotoCrop src={this.state.src} parseCroppedImg={this.parseCroppedImg} />
          </div>
        }

        <div className="image-actions-container">

          <Button className={ "upload-photo-btn" + (file_not_set ? ' is-disabled' : '') } onClick={this.onImageUploadStart}>
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