import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PhotoUpload from "./../../Upload/PhotoUpload/PhotoUpload";
import closeIconBlack from './../../../images/icons/ico-close-black.svg';
import { modalToggle } from './../../../lib/utilities';

import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentWillMount() {
    modalToggle.subscribe(
      (data)=>{
        if(data.status){
          this.handleClickOpen();
        }
      }
    )
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          className="custom-modal"
        >
          <div className="close-icon-container">
            <div className="close-icon icon-touch-area-container-50 ripple" onClick={this.handleClose.bind(this)}>
              <img src={closeIconBlack} alt="close-icon-black" />
            </div>
          </div>
          <PhotoUpload />
        </Dialog>
      </div>
    )
  }
}

export default Modal;