import React, { Component } from 'react';
import uploadErrorIcon from './../../../images/icons/ico-upload-progress-error.svg';
import uploadSuccessIcon from './../../../images/icons/ico-upload-progress-complete.svg';
import './UploadProgressButton.css';

class UploadProgressButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        status: false,
        buttonText: 'Kirim ulang',
        messageText: 'Kirim image gagal, telah terjadi error xxxx'
      },
      success: {
        status: false,
        buttonText: 'Tutup',
        messageText: 'Selamat foto profile berhasil disimpan'
      },
      progress:{
        status: false,
        buttonText: 'Proses Upload',
        messageText: null
      }
    }
  }
  render() {
    const { disabled, onImageUploadStart, progress } = this.props;
    const { error, success } = this.state;
    return (
      <React.Fragment>
      <div className="progress-status-text">

      </div>
      <div className={"drop-photo-upload-button " + (disabled ? '' : 'disabled')} onClick={onImageUploadStart}>
        {/* <span className="drop-photo-upload-button__text">Upload Foto</span> */}
        {/* <span className="drop-photo-upload-button__text error"><img src={uploadErrorIcon} alt="ico-upload-progress-error" /> Kirim ulang</span> */}
        <span className="drop-photo-upload-button__text success"><img src={uploadSuccessIcon} alt="ico-upload-progress-success" /> Kirim ulang</span>
        {/* <div className="drop-photo-upload-button__progress" style={{ 'width': progress + '%' }}></div> */}
      </div>
      </React.Fragment>
    )
  }
}

export default UploadProgressButton;