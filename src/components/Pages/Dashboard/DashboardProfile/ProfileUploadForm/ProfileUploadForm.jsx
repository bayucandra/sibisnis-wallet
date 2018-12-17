import React, {Component} from 'react';
import {connect} from 'react-redux';

import biqHelper from "../../../../../lib/biqHelper";
import appActions from "../../../../../redux/actions/global/appActions";

import {Button} from "components/Widgets/material-ui";

import FormWrapper from "../FormWrapper/FormWrapper";

import "./ProfileUploadForm.scss";

class ProfileUploadForm extends Component {

  _uploadProfileClick = () => {
    let {dispatch} = this.props;
    biqHelper.utils.clickTimeout( () => {
      dispatch( appActions.appDialogProfilePhotoOpen('select-dialog') );
    } );
  };

  render() {
    return (
      <>

        <FormWrapper className="profile-upload-form" isVisible={this.props.isVisible}>

          <div className="profile-upload-form__title">
            Upload Foto Profil Anda
          </div>

          <div className="profile-upload-form__notice">
            File foto maksimal berukuran 5 MB. File harus bertipe JPEG, PNG atau GIF.
          </div>

          <Button className={`upload-btn`} onClick={this._uploadProfileClick}>
            Pilih Foto Anda
          </Button>

        </FormWrapper>

      </>
    );
  }

}

export default connect( null )(ProfileUploadForm);