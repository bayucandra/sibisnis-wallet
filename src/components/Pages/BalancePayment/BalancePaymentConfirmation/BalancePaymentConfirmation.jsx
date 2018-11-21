import React, {Component} from 'react';
import {connect} from 'react-redux';

import "./BalancePaymentConfirmation.scss";
import appActions from "../../../../redux/actions/global/appActions";
import {Modal} from "@material-ui/core";
import {Button} from "../../../Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";
import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";
import ModalNotice from "../../../Widgets/ModalNotice/ModalNotice";

class BalancePaymentConfirmation extends Component{

  inputRef = React.createRef();

  imageArr = [];

  state = {
    modal_failed_is_open: false,
    duplicate_file_name: ''
  };

  _backBtnClick = ()=> {
    let { type, id, referrer } = biqHelper.JSON.pathValueGetMulti( this.props.match.params, [ 'type', 'id', 'referrer' ] );
    let back_url = `/balance/payment/status/${type}/${id}/${referrer}`;
    biqHelper.utils.clickTimeout( () => this.props.history.push(back_url) )
  };

  _addPhotoUpload = ( e ) => {
    console.log(e);
    console.log(e.target.files);
    if ( e.target.files < 1 ) return;
    let file = e.target.files[0];
    biqHelper.image.compress(file);
    let image_exist_arr = this.imageArr.filter(( el )=>{
      let is_name_match = file.name === el.name;

      console.log(file.name + ' - ' + el.name);

      return is_name_match;
    });
    console.log(image_exist_arr);
    if ( image_exist_arr.length > 0 ) {
      this.setState({duplicate_file_name: file.name});
      this.setState( { modal_failed_is_open : true } );
    } else {
      this.imageArr.push(file);

    }

  };

  _addPhotoClick = () => {
    biqHelper.utils.clickTimeout( ()=>{
      this.inputRef.current.click();
    } );
  };

  _modalFailedClose = () => {
    this.setState( { modal_failed_is_open: false } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
  }

  render() {
    return (
      <div className="balance-payment-confirmation">

        <div className="balance-payment-confirmation__header">

          <div className="nav-back hidden-md-up">
            <Button className="nav-back__btn" onClick={ this._backBtnClick }>&nbsp;</Button>
            <div className="nav-back__text">Kembali</div>
          </div>

          <div className="title visible-md-up">
            Silahkan memproses pembayaran Anda
          </div>

          <HeaderMenuMobile forceVisible={true}/>

        </div>

        <div className="balance-payment-confirmation__body">

          <div className="balance-payment-confirmation__main-panel">

            <div className="top-nav visible-md-up">
              <Button className="back-btn" onClick={ this._backBtnClick }>
                <div className="icon"/>
                <div className="label">Kembali</div>
              </Button>
            </div>

            <div className="upload-block">
              <div className="title">Upload Bukti Pembayaran</div>
              <div className="notice">
                Silahkan mengupload bukti pembayaran Anda untuk mempercepat proses pemesanan Anda.
              </div>
              <input type="file" multiple={true} accept="image/*" style={{display: 'none'}} ref={this.inputRef} onChange={this._addPhotoUpload}/>
              <Button className="add-photo-btn" onClick={this._addPhotoClick}>Tambahkan Foto</Button>
            </div>

          </div>

          <div className="balance-payment-confirmation__spacer visible-md-up"/>

          <BalanceTransactionInfo/>

        </div>

        <Modal
          open={this.state.modal_failed_is_open}
          onClose={this._modalFailedClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalFailedClose} title={"Duplikasi file"} notice={[`Gambar dengan nama: `, <b>{this.state.duplicate_file_name}</b>, ` sudah terupload/sedang diupload, sehingga tidak diproses. Silahkan upload gambar yang lain.`]}/>
          </div>

        </Modal>

      </div>
    );
  }

}

export default connect( null ) (BalancePaymentConfirmation);