import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Modal} from '@material-ui/core';

import userActions from "redux/actions/global/userActions"

class DialogPasswordUpdate extends Component {

  _onClose = () => {
    let {dispatch} = this.props;
    dispatch( userActions.userUpdatePasswordDialogClose() );
  };

  render() {

    return (
      <Modal
        open={ this.password_update_dialog.is_open }
        onClose={this._modalClose}>

        <div className="modal-inner">

          <div className="dialog-password-update">

          </div>

        </div>

      </Modal>
    );
  }

}

const mapStateToProps = state => {

  return {
    password_update_dialog: state.user.password_update_dialog
  }

};

export default connect( mapStateToProps ) (DialogPasswordUpdate);