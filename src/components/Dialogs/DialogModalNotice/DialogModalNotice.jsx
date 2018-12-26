import React, {Component} from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";

import Modal from "@material-ui/core/Modal";
import ModalNotice from "components/Widgets/ModalNotice/ModalNotice";

class DialogModalNotice extends Component {

  _modalClose = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appDialogNoticeClose() );
  };

  render() {
    return (

      <Modal
        open={this.props.dialog_notice.is_open}
        onClose={this._modalClose}>

        <div className="modal-inner">
          <ModalNotice modalClose={this._modalClose}
               title={this.props.dialog_notice.content.title}
               notice={this.props.dialog_notice.content.notice}/>
        </div>

      </Modal>

    );
  }

}

const mapStateToProps = state => {
  return {
    dialog_notice : state.app.dialog_notice
  }
};

export default connect( mapStateToProps ) (DialogModalNotice);