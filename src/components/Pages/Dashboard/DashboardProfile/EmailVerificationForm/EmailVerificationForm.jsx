import React, { Component } from 'react';

import {connect} from 'react-redux';

import { TextField } from '@material-ui/core';
import { Button } from "components/Widgets/material-ui";

import "./EmailVerificationForm.scss";

class EmailVerificationForm extends Component {

  render() {

    return (
      <div className={`email-verification-form visible-md-up${ this.props.isVisible ? ' is-visible' : '' }`}>

        <TextField
          disabled
          className="email-input"
          label="Email"
          value={this.props.user_profile.email}
          helperText="Cek email anda sebelumnya dan klik link verifikasi, atau klik Kirim Link jika data email anda sebelumnya terhapus"
          margin="normal"
        />

        <Button className="send-btn">
          Kirim Link
        </Button>

      </div>
    );

  }

}

const mapStateToProps = state => {

  return {
    user_profile : state.user.profile
  };

};

export default connect(mapStateToProps) (EmailVerificationForm);