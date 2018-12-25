import React, {Component} from 'react';
import {connect} from 'react-redux';

import Modal from "@material-ui/core/Modal/Modal";
import biqHelper from "../../../lib/biqHelper";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import ProfileImagePreview from "../../Shared/SideNavMain/ProfileImagePreview/ProfileImagePreview";
import PhotoUploadFile from "./PhotoUploadFile/PhotoUploadFile";
import appActions from "../../../redux/actions/global/appActions";
import CameraCapture from "./CameraCapture/CameraCapture";


class DialogProfilePhoto extends Component {

  modalClose = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appDialogProfilePhotoClose() );
  };

  render() {
    return (


      <Modal
        aria-labelledby="modal-upload"
        aria-describedby="modal-upload-desc"
        open={this.props.dialog_profile_photo.is_open}
        onClose={this.modalClose}>

        <div className="modal-inner tst">
          {

            this.props.dialog_profile_photo.mode === 'select-dialog' ?

              (
                biqHelper.utils.isNull( this.props.user_profile.photo ) ?

                  <PhotoUpload modalClose={this.modalClose}/>
                  :
                  <ProfileImagePreview modalClose={this.modalClose}/>
              )

              :

              (
                this.props.dialog_profile_photo.mode === 'upload-dialog'?
                  <PhotoUploadFile modalClose={this.modalClose}/>
                    :
                  (
                    this.props.dialog_profile_photo.mode === 'camera-dialog' ?
                      <CameraCapture modalClose={this.modalClose}/>
                        :
                      null
                  )
              )

          }
        </div>

      </Modal>
    );
  }

}

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    dialog_profile_photo: state.app.dialog_profile_photo
  }
};

export default connect(mapStateToProps) (DialogProfilePhoto);