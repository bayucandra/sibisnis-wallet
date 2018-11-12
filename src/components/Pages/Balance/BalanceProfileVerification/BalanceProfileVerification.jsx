import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import PhotoUpload from "../../../Shared/PhotoUpload/PhotoUpload";
import AddressInputDialog from "../../../Shared/AddressInputDialog/AddressInputDialog";

import biqHelper from "../../../../lib/biqHelper";

import "./BalanceProfileVerification.scss";
import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";
import AppActions from "../../../../redux/actions/global/appActions";



class BalanceProfileVerification extends Component {

  stop = false;

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
    if ( !biqHelper.utils.isNull( this.props.user_profile.photo ) ) {
      this.forceUpdate();
      return;
    }
    biqHelper.utils.clickTimeout({
      callback: this._onPhotoSetActual
    });
  };

  _onPhotoSetActual = () => {
    this._modalSetActiveComponent(PhotoUpload);
    this._modalOpen();
  };

  _onAddressSet = () => {
    biqHelper.utils.clickTimeout({
      callback: ()=>{
        this._modalSetActiveComponent(AddressInputDialog);
        this._modalOpen();
      }
    });
  };

  _modalOpen = () => {
    this.setState({ modal_is_open: true });
  };

  _modalClose = () => {
    this.setState({ modal_is_open: false });
  };

  _continueTopupBalance = () => {
    biqHelper.utils.clickTimeout({
      callback: () => {
        this.props.history.push('/balance');
      }
    });
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );

    setTimeout( ()=> {
      if ( this.stop ) return;
      this.setState( { is_ready: true });
    }, 300 );
  }

  componentWillUnmount() {
    this.stop = true;
  }

  render() {
    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);
    let ModalActiveComponent = this.state.modal_active_component;

    return (
      <div className="balance-profile-verification">

        <HeaderMobileGeneral headerTitle="Tambah Saldo"/>

        <div className={"balance-profile-verification__notice"}>Anda belum bisa melakukan penambahan saldo, silahkan penuhi langkah berikut</div>

        <div className={"balance-profile-verification__steps"}>


          <div className={"step-row step-row--photo"}>

            <div className="col-number">
              <div className={`number-item is-active${ is_photo_set ? ' is-done' : '' }`}>{is_photo_set? "": "1"}</div>
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
              <div className={`number-item${is_address_set ? ' is-active is-done' : '' }`}>{is_address_set? "": "2"}</div>
            </div>

            <div className={"col-action"}>

              <div className={"title"}>Data Alamat</div>

              <div className={`action-body${ is_photo_set && !is_address_set ? ' is-expanded' : '' }`}>
                <div className={"action-body__inner"}>
                  <div className={"notice"}>Data alamat juga digunakan sebagai syarat untuk melakukan penambahan deposit dan aktifitas lainnya</div>
                  <Button className="action-btn" onClick={this._onAddressSet}>Lengkapi alamat</Button>
                </div>
              </div>

              <div className={`action-body${ is_photo_set && is_address_set ? ' is-expanded' : '' }`}>
                <div className={"action-body__inner"}>
                  <div className={"notice"}>
                    Selamat anda saat ini sudah bisa melakukan penambahan saldo, namun demi kenyamanan anda silahkan isi data identitas anda dan dapatkan banyak manfaat serta keuntungannya
                  </div>

                  <div className={"notice"}>
                    Anda bisa melewati langkah ini dan sewaktu-waktu anda bisa meningkatkan status akun dengan mengisi data identitas
                  </div>

                  <div className={"action-btn-group"}>
                    <Button className={"balance-topup-btn"} onClick={this._continueTopupBalance}>Tambah deposit sekarang</Button>
                    <Button className={"complete-identity-btn"}>Lengkapi identitas</Button>
                  </div>

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

export default withRouter( connect( mapStateToProps )(BalanceProfileVerification) );