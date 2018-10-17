// Node Modules
import React, { Component } from 'react';

// Local Images
import uploadErrorIcon from './../../../images/icons/ico-upload-progress-error.svg';
import uploadSuccessIcon from './../../../images/icons/ico-upload-progress-complete.svg';

// Custom CSS
import './UploadProgressButton.scss';

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
      progressing: {
        status: false,
        buttonText: 'Proses Upload',
        messageText: null
      }
    }
  }

  componentWillReceiveProps(props) {
    const { error, success, uploading } = props.uploadingStatus;
    if (error) {
      let error = { ...this.state.error, status: true };
      let success = { ...this.state.success, status: false };
      let uploading = { ...this.state.progressing, status: false };
      this.setState({ success: success, error: error, progressing: uploading });
    }else if (success) {
      let success = { ...this.state.success, status: true };
      let uploading = { ...this.state.progressing, status: false };
      let error = { ...this.state.error, status: false };
      this.setState({ success: success, progressing: uploading, error: error });
    }else if (uploading) {
      let uploading = { ...this.state.progressing, status: true };
      let success = { ...this.state.success, status: false };
      let error = { ...this.state.error, status: false };
      this.setState({ success: success, progressing: uploading, error: error });
    }else {
      let uploading = { ...this.state.progressing, status: false };
      let success = { ...this.state.success, status: false };
      let error = { ...this.state.error, status: false };
      this.setState({ success: success, progressing: uploading, error: error });
    }
  }

  getProgressButtonText = () => {
    const { error, success, progressing } = this.state;
    if (error.status) {
      return (
        <React.Fragment>
          <img src={uploadErrorIcon} alt="ico-upload-progress-error" /> {error.buttonText}
        </React.Fragment>
      )
    } else if (success.status) {
      return (
        <React.Fragment>
          <img src={uploadSuccessIcon} alt="ico-upload-progress-success" /> {success.buttonText}
        </React.Fragment>
      )
    }
    else if (progressing.status) {
      return (
        <React.Fragment>
          {progressing.buttonText}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          Upload Foto
        </React.Fragment>
      )
    }
  };

  render() {
    const { disabled, onImageUploadStart, progress, uploadingStatus } = this.props;
    const { error, success, progressing } = this.state;
    return (
      <React.Fragment>
        {error.status ? <div className="progress-status-text error">{error.messageText}</div> : ''}
        {success.status ? <div className="progress-status-text success">{success.messageText}</div> : ''}
        <div className={"drop-photo-upload-button " + ((error.status || success.status) ? '' : 'without-text-spacing ') + (disabled ? '' : 'disabled')} onClick={onImageUploadStart}>
          <span className="drop-photo-upload-button__text">{this.getProgressButtonText()}</span>
          {progressing.status ? <div className="drop-photo-upload-button__progress" style={{ 'width': progress + '%' }}></div> : null}
        </div>
      </React.Fragment>
    )
  }

}

export default UploadProgressButton;