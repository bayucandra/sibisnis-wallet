//TODO: Delete this very soon!!!!
// Node Modules
import React, { Component } from 'react';

// React Material
import Dialog from '@material-ui/core/Dialog';

// Local Images
import closeIconBlack from './../../../images/icons/ico-close-black.svg';

// Custom Components
import EmailVerification from '../../DashboardLayout/Dashboard/ProfileProgress/EmailVerification/EmailVerificiation';
import WebcamCapture from './../WebcamCapture/WebcamCapture';
import PhotoUpload from "../PhotoUpload/PhotoUpload";
import ProfileImagePreview from '../SideNavMain/ProfileImagePreview/ProfileImagePreview';
import AddressForm from './../../Forms/AddressForm/AddressForm';

// Custom Libraries
import { modalToggle } from './../../../lib/utilities';
import { modalTypes } from './../../../lib/constants';

// Custom CSS
import './Modal.scss';

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
        } else {
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
            <div className="modal-close-block">
              <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.handleClose.bind(this)}>
                <img src={closeIconBlack} alt="close-icon-black" />
              </div>
            </div>
          </React.Fragment>
        );

      case modalTypes.profileImagePreview:
        return (
          <ProfileImagePreview data={this.state.data} />
        );

      case modalTypes.webCameraCapture:
        return (
          <WebcamCapture />
        );

      case modalTypes.emailVerification:
        return (
          <React.Fragment>
            <div className="modal-close-block">
              <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.handleClose.bind(this)}>
                <img src={closeIconBlack} alt="close-icon-black" />
              </div>
            </div>
            <EmailVerification />
          </React.Fragment>
        );

      case modalTypes.addressForm:
        return (
          <AddressForm />
        );

      default:
        return <React.Fragment></React.Fragment>;
    }

  };

  render() {
    const { fullScreen, classes } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        maxWidth={false}
        aria-labelledby="responsive-dialog-title"
        className='custom-modal'
      >
        {this.getModal()}
      </Dialog>
    )
  }
}

export default Modal;