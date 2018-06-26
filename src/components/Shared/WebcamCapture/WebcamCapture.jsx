import React, { Component } from 'react';
import Webcam from 'react-webcam';
import closeIconBlack from './../../../images/icons/ico-close-black.svg';
import cameraIconWhite from './../../../images/icons/ico-camera-white.svg';
import './WebcamCapture.css';
import { modalToggle } from '../../../lib/utilities';

class WebcamCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captureImage: null,
      captured: false
    }
  }

  componentWillMount() {

  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ captureImage: imageSrc, captured: true })
  }

  onCloseCameraCapture = () => {
    modalToggle.next({ status: false });
  }

  onCaptureConfirm = () => {
    modalToggle.next({ status: false });
  }

  render() {
    const { captured,captureImage} = this.state;
    return (
      <div className="webcam-capture-container">
        <div className="webcam-header">
          <div className="webcam-header__text">Ambil Foto</div>
          <div className="webcam-header__close-icon" onClick={this.onCloseCameraCapture.bind(this)}>
            <img src={closeIconBlack} alt="close-icon-black" />
          </div>
        </div>
        <div className="webcam-container">
          {!captured ?
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              className="webcam-capture"
            /> :
            <img src={captureImage} className="captured-preview" alt="" />}
        </div>


        <div className="capture-button-container">
          {!captured ?
            <div className="capture-button ripple" onClick={this.capture.bind(this)}>
              <img src={cameraIconWhite} alt="camera-icon" />
            </div>
            :
            <div className="capture-button ripple" onClick={this.onCaptureConfirm.bind(this)}>
              OK
            </div>}
        </div>
      </div>)
  }
}

export default WebcamCapture;