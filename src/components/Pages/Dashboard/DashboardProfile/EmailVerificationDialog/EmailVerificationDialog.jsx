import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from "components/Widgets/material-ui";

import biqHelper from "../../../../../lib/biqHelper";

import "./EmailVerificationDialog.scss";
import {TextField} from "@material-ui/core";

class EmailVerificationDialog extends Component {

  state = {
    modalPosTop : 0
  };

  _modalClose = () => {
    if ( typeof this.props.emailVerificationMobileClose !== 'function') return;

    biqHelper.utils.clickTimeout( () => {
      this.props.emailVerificationMobileClose();
    } );
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.email-verification-dialog', top_space: 161, bottom_space: 118};
    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  componentDidMount(){
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  componentDidUpdate(prevProp, prevState, snapshot){
    let top_pos = this._modalPosTopGen();
    if ( prevState.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
    }
  }

  render() {

    return (

      <div className={`email-verification-dialog`} style={ { marginTop: this.state.modalPosTop } }>

        <Button className="modal-close-btn" onClick={this._modalClose} >&nbsp;</Button>

        <div className={`input-form`}>

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

      </div>
    );

  }

}

const mapStateToProps = state => {

  return {
    user_profile : state.user.profile
  };

};

export default connect( mapStateToProps ) ( EmailVerificationDialog );
