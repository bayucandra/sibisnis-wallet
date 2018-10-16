// Node Modules
import React, { Component } from 'react';
import Webcam from 'react-webcam';

// Local Images
import closeIconBlack from './../../../images/icons/ico-close-black.svg';
import cameraIconWhite from './../../../images/icons/ico-camera-white.svg';
import cameraFinishIcon from './../../../images/icons/ico-camera-finish.svg';
import cameraIconReset from './../../../images/icons/ico-upload-reset.svg';

// Redux
import { getUserWithUpdatedProfile } from './../../../redux/actions/UserActions';
import { connect } from 'react-redux';

// Custom Libraries
import { modalToggle } from '../../../lib/utilities';

// Custom CSS
import './WebcamCapture.scss';

const CameraResetButton = (props) => {
  const { onCameraReset } = props;
  return (
    <div className="camera-reset-button-container">
      <div className="camera-reset-button ripple" onClick={onCameraReset}>
        <img src={cameraIconReset} className="camera-reset-button__icon" alt="camera-reset-icon" />
        <span className="camera-reset-button__text">Ambil ulang</span>
      </div>
    </div>
  )
}
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
    this.props.getUserWithUpdatedProfile(this.state.captureImage);
    modalToggle.next({ status: false });
  }

  onCameraReset = () => {
    this.setState({ captureImage: null, captured: false });
  }

  render() {
    const { captured, captureImage } = this.state;
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
            <div  className="captured-preview" style={{'backgroundImage':"url("+captureImage+")"}}></div>
            // <img src={captureImage} className="captured-preview" alt="" />

            }
        </div>


        <div className={"capture-button-container " + (captured ? 'capture-button-finish-container' : '')}>
          {!captured ?
            <div className="capture-button ripple" onClick={this.capture.bind(this)}>
              <img src={cameraIconWhite} alt="camera-icon" />
            </div>
            :
            <div className="capture-button capture-button-finish ripple" onClick={this.onCaptureConfirm.bind(this)}>
              <img src={cameraFinishIcon} alt="camera-icon-finish" />
            </div>}
        </div>

        {captured ?
          <CameraResetButton onCameraReset={this.onCameraReset.bind(this)} />
          : null}
      </div>)
  }
}

const mapStateToProps = (store) => {
  return {}
}

const mapDispatchToProps = {
  getUserWithUpdatedProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(WebcamCapture);