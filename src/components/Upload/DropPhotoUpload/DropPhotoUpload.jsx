// Node Modules
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase';


// Custom Components
import PhotoCrop from './../PhotoCrop/PhotoCrop';
import UploadProgressButton from './../../Shared/UploadProgressButton/UploadProgressButton';

// Custom Libraries
import { modalToggle } from './../../../lib/utilities';

// Redux
import { getUserWithUpdatedProfile } from './../../../redux/actions/UserActions';
import { connect } from 'react-redux';

// Local Images
import uploadIconMobile from './../../../images/icons/ico-upload-mobile.svg';
import uploadIconDesktop from './../../../images/icons/ico-upload-desktop.svg';

// Custom CSS
import './DropPhotoUpload.css';

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
      uploadProgress: 0
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
            changeImageStatus:true,
            croppedImage: reader.result
          }),
        false
      )
      reader.readAsDataURL(files[0])
    }
    this.setState({
      files
    });
  }

  onImageChange = (e) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
            changeImageStatus:true,
            croppedImage: reader.result,
            error:false,
            success:false,
            uploading:false,
            uploadStatus:false
          }),
        false
      )
      reader.readAsDataURL(files[0])
    }
    this.setState({
      files
    });
  }

  // Set the image or directly upload it to server from here
  onImageCrop = (image) => {
    this.setState({ croppedImage: image });
  }

  onImageUploadStart = () => {

    if (this.state.error || this.state.success) {
      if (this.state.success) {
        this.onImageCompleteDialogClose();
      } else {
        this.firebaseUploadSimulation(this.state.files[0])
        // this.setState({ uploading: true, changeImageStatus: false, error: false }, () => {
        //   setTimeout(() => {
        //     this.setState({ success: true, uploading: false })
        //   }, 1500)
        // });
        this.props.getUserWithUpdatedProfile(this.state.croppedImage);
      }
    } else {
      this.simulateErrorOnImageUpload();
    }
  }

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
  }

  firebaseUploadSimulation = (file) =>{

    // Create Storage Reference
    var storageRef =  firebase.storage().ref('sibinis_samples/'+file.name);

    // Upload File
    // var task = storageRef.put(file);
    var task = storageRef.putString(this.state.croppedImage,'data_url');

    // Update Progress Bar
    var thiss =this;
    task.on('state_changed',
     function progress(snapshot){
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       thiss.setState({ uploading: true,uploadStatus:true, changeImageStatus: false, error: false, uploadProgress: progress });
     },
     function error(err){
      thiss.setState({ error: true })
     },
     function complete(){
      thiss.setState({ success: true, uploading: false })
     }
    )
  }

  onImageCompleteDialogClose = () => {
    modalToggle.next({ status: false })
  }

  render() {
    const { error, success, uploading } = this.state;
    return (
      <div className="drop-photo-upload-container">
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
          <UploadProgressButton
            disabled={this.state.files.length > 0}
            progress={this.state.uploadProgress}
            uploadingStatus={{ error, success, uploading }}
            onImageUploadStart={this.onImageUploadStart.bind(this)}
          />
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

const mapStateToProps = (store) => {
  return {}
}

const mapDispatchToProps = {
  getUserWithUpdatedProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(DropPhotoUpload);