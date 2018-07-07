import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PhotoUpload from "./../../Upload/PhotoUpload/PhotoUpload";
import ProfileImagePreview from './../../DashboardLayout/Profile/ProfileImagePreview/ProfileImagePreview';
import closeIconBlack from './../../../images/icons/ico-close-black.svg';
import WebcamCapture from './../WebcamCapture/WebcamCapture';
import { modalToggle } from './../../../lib/utilities';
import { modalTypes } from './../../../lib/constants';

import './Modal.css';
import EmailVerification from '../../DashboardLayout/Dashboard/ProfileProgress/EmailVerification/EmailVerificiation';
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: null,
      data: null
    }
  }

  componentWillMount() {
    modalToggle.subscribe(
      (data) => {
        if (data.status) {
          this.handleClickOpen(data);
        }else{
          this.handleClose();
        }
      }
    )
  }

  handleClickOpen = (data) => {
    const { type, payload } = data;
    this.setState({ open: true, type: type, data: payload ? payload : null });
  }

  handleClose = () => {
    this.setState({ open: false, type: null, data: null });
  }


  getModal = () => {
    switch (this.state.type) {
      case modalTypes.imageUpload:
        return (
          <React.Fragment>
            <div className="close-icon-container">
              <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.handleClose.bind(this)}>
                <img src={closeIconBlack} alt="close-icon-black" />
              </div>
            </div>
            <PhotoUpload />
          </React.Fragment>
        )
        break;

      case modalTypes.profileImagePreview:
        return (
          <ProfileImagePreview data={this.state.data} />
        )
        break;
      case modalTypes.webCameraCapture:
        return (
          <WebcamCapture />
        )
        break;
      case modalTypes.emailVerification:
        return (
          <React.Fragment>
            <div className="close-icon-container">
              <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.handleClose.bind(this)}>
                <img src={closeIconBlack} alt="close-icon-black" />
              </div>
            </div>
            <EmailVerification />
          </React.Fragment>
        )
        break;

      default:
        return <React.Fragment></React.Fragment>
        break;
    }
  }

  render() {
    const { fullScreen, classes  } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          className='custom-modal'
        >
          {this.getModal()}
        </Dialog>
      </div>
    )
  }
}

export default Modal;