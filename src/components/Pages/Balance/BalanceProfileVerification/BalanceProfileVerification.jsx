import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import PhotoUpload from "../../../Shared/PhotoUpload/PhotoUpload";

import biqHelper from "../../../../lib/biqHelper";

import "./BalanceProfileVerification.scss";



class BalanceProfileVerification extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      is_ready: false,
      modal_is_open: false,
      modal_active_component: PhotoUpload
    };

  }

  _modalSetActiveComponent = ( component ) => {
    this.setState({ modal_active_component: component });
  };

  _onPhotoSet = () => {
    biqHelper.utils.clickTimeout({
      callback: this._onPhotoSetActual
    });
  };

  _onPhotoSetActual = () => {
    this._modalSetActiveComponent(PhotoUpload);
    this.setState({ modal_is_open: true });
  }

  _modalClose = () => {
    this.setState({ modal_is_open: false });
  };

  componentDidMount() {
    setTimeout( ()=> {
      this.setState( { is_ready: true });
    }, 300 );
  }

  render() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    let ModalActiveComponent = this.state.modal_active_component;

    return (
      <div className="balance-profile-verification">

        <div className={"balance-profile-verification__notice"}>Anda belum bisa melakukan penambahan saldo, silahkan penuhi langkah berikut</div>

        <div className={"balance-profile-verification__steps"}>


          <div className={"step-row step-row--photo"}>

            <div className="col-number">
              <div className={`number-item is-active`}>{is_photo_set? "": "1"}</div>
            </div>

            <div className={"col-action"}>
              <div className={"title"}>Foto profile</div>

              <div className={`action-body${ !is_photo_set && this.state.is_ready ? ' is-expanded' : '' }`}>
                <div className={"action-body__inner"}>
                  <div className={"notice"}>Tambahkan foto profile anda untuk bisa melakukan aktifitas dasar yaitu topup deposit</div>
                  <Button className="action-btn" onClick={this._onPhotoSet}>Tambahkan foto</Button>
                </div>
              </div>
            </div>

          </div>


          <div className={"step-row step-row--address"}>

            <div className="col-number">
              <div className={`number-item`}>{is_address_set? "": "2"}</div>
            </div>

            <div className={"col-action"}>

              <div className={"title"}>Data Alamat</div>

              <div className={`action-body${ is_photo_set && !is_address_set ? ' is-expanded' : '' }`}>
                <div className={"action-body__inner"}>
                  <div className={"notice"}>Data alamat juga digunakan sebagai syarat untuk melakukan penambahan deposit dan aktifitas lainnya</div>
                  <Button className="action-btn">Lengkapi alamat</Button>
                </div>
              </div>

            </div>

          </div>


        </div>

        <Modal
          open={this.state.modal_is_open}
          onClose={this._modalClose}>

          <div className="modal-inner">
            <ModalActiveComponent modalSetActiveComponent={this._modalSetActiveComponent} modalClose={this._modalClose}/>
          </div>

        </Modal>

      </div>
    );

  }

}

const mapStateToProps = store => {
  return {
    user_profile: store.user.profile
  }
};

export default connect( mapStateToProps )(BalanceProfileVerification);