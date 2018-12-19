import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import biqHelper from "lib/biqHelper";

import appActions from "redux/actions/global/appActions";

import {Button} from "components/Widgets/material-ui";
import Modal from "@material-ui/core/Modal";

import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral";
import PhotoUpload from "components/Dialogs/DialogProfilePhoto/PhotoUpload/PhotoUpload";
import AddressInputDialog from "components/Dialogs/DialogAddressInput/DialogAddressInput";

import "./BalanceProfileVerification.scss";

class BalanceProfileVerification extends Component {

  stop = false;

  constructor( props ) {
    super(props);

    this.state = {
      is_ready: false
    };

  }

  _onPhotoSet = () => {

    biqHelper.utils.clickTimeout(()=>{
      let {dispatch} = this.props;
      dispatch( appActions.appDialogProfilePhotoOpen('select-dialog') );
    });
  };

  _onAddressSet = () => {
    biqHelper.utils.clickTimeout(()=>{
      let {dispatch} = this.props;
      dispatch( appActions.appDialogAddressOpen() );
    });
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
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

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
                    {/*<Button className={"complete-identity-btn"}>Lengkapi identitas</Button>*/}
                  </div>

                </div>
              </div>

            </div>

          </div>


        </div>

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