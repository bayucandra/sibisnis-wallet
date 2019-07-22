import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Subject, of} from 'rxjs';
import {takeUntil, catchError, merge} from 'rxjs/operators'
import {ajax as rxAjax} from 'rxjs/ajax'

import "./BalancePaymentConfirmation.scss";
import appActions from "../../../../redux/actions/global/appActions";
import {Modal} from "@material-ui/core";
import {Button} from "../../../Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";
import biqConfig from "../../../../providers/biqConfig";

import HeaderMenuMobile from "../../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import BalanceTransactionInfo from "../BalanceTransactionInfo/BalanceTransactionInfo";
import ModalNotice from "../../../Widgets/ModalNotice/ModalNotice";
import balanceActions from "../../../../redux/actions/pages/balanceActions";

class BalancePaymentConfirmation extends Component{

  inputRef = React.createRef();

  imageObj = [];

  state = {
    modal_failed_is_open: false,
    modal_failed_text: { title: '', notice: '' },
    duplicate_file_name: '',
    image_list: [],
    upload_errors: [],
    has_upload_progress: false
  };

  stop$ = new Subject();

  _backToHistory = ()=> {
    let back_url = '/balance/topup-history';
    biqHelper.utils.clickTimeout( () => this.props.history.push(back_url) );
  };

  _backToStatus = () => {
    let { type, id, referrer } = biqHelper.JSON.pathValueGetMulti( this.props.match.params, [ 'type', 'id', 'referrer' ] );
    let back_url = `/balance/payment/status/${type}/${id}/${referrer}`;
    biqHelper.utils.clickTimeout( () => this.props.history.push(back_url) );
  };

  _addPhotoUpload = ( e ) => {
    if ( e.target.files < 1 ) return;

    let current_image_count = Object.keys( this.imageObj ).length;

    let accepted_left = 4 - current_image_count;

    let accepted_count = e.target.files.length > accepted_left ? accepted_left : e.target.files.length;

    for( let i=0; i<accepted_count; i++ ) {

      let file = e.target.files[i];

      biqHelper.image.resize$({file: file, max_size: 800})
        .subscribe( data => {
          if ( this.imageObj.hasOwnProperty( file.name ) ) {
            // this.setState({duplicate_file_name: file.name});
            let failed_title = "Duplikasi file";
            let upload_status = biqHelper.utils.httpResponseIsSuccess( this.imageObj[file.name].status ) ? 'sudah terupload' : 'sedang diupload';
            let failed_notice = (<span>Gambar dengan nama: <b>"{ file.name }"</b> { upload_status }. Silahkan upload gambar yang lain</span>);
            this.setState( {modal_failed_text: { title: failed_title, notice: failed_notice }} );
            this.setState( { modal_failed_is_open : true } );
          } else {
            data.status = -1;//Initialize status => -1 mean new, 0 mean uploading, another one is HTTP standard response code
            data.progress = 0;

            this.imageObj[file.name] = data;

            this._uploadImageList();
            this._updateImageList();

          }

          this.inputRef.current.value = null;

        } );//resize$.subscribe

    }

    if ( e.target.files.length > accepted_left ) {
      let failed_title = "Upload melebihi batas";
      let failed_notice = (<span>Maksimal <b>4 (empat)</b> gambar untuk tiap transaksi</span>);
      this.setState( {modal_failed_text: { title: failed_title, notice: failed_notice }} );
      this.setState( { modal_failed_is_open : true } );
    }

  };

  _updateImageList() {
    let image_list = [];
    let has_upload_progress = false;
    for( let key in this.imageObj ) {
      let image_data = Object.assign( {}, this.imageObj[key] );
      image_data.upload$ = null;
      image_list.push( image_data );

      let status = image_data.status;
      if ( status === 0 || status === -1 ) has_upload_progress = true;
    }
    this.setState({ image_list: image_list });

    this.setState( { has_upload_progress: has_upload_progress } );
  }

  _uploadImageList() {

    for ( let key in this.imageObj ) {
      let image_data = this.imageObj[key];

      if ( image_data.status === -1 ) {
        this._uploadImageSubscribe( key );
      }
    }

  }

  _uploadImageSubscribe = ( key )=> {
    this.imageObj[key].status = 0;

    let image_data = this.imageObj[key];
    let form_data = new FormData();
    form_data.append('invoice_number', biqHelper.JSON.pathValueGet(this.props.balance.payment_transaction.server_response, 'response.data.invoice_number'));
    form_data.append('memberid', biqHelper.JSON.pathValueGet( this.props.user, 'profile.memberid' ));
    form_data.append( 'image', image_data.blob, image_data.name );
    form_data.append( '_csrf', biqHelper.utils.csrfGet()['_csrf'] );

    let progressSubscriber = new Subject();

    this.imageObj[key].rxAjax$ = rxAjax({
      url: `${biqConfig.api.url_base}/api/wallet/konfirmasi_pembayaran`,
      method: 'POST',
      ...biqConfig.rxAjaxOptions,
      body: form_data,
      progressSubscriber
    });

    this.imageObj[key].ajaxSubscribe = progressSubscriber.pipe(
      takeUntil( this.stop$ ),
      merge(this.imageObj[key].rxAjax$),
      catchError( err => of(err.target) )
    )
      .subscribe(
        res => {
          try {
            if ( res.type === 'progress' ) {
              this.imageObj[key].progress = Math.floor(res.loaded / res.total * 100 );
            }else if ( !biqHelper.utils.isNull( res.status) ) {
              this.imageObj[key].status = res.status;

              if ( !biqHelper.utils.httpResponseIsSuccess( res.status ) ) {
                let message = res.status === 0 ? `Upload file <b>"${key}"</b> Gagal, Harap periksa koneksi anda.` : biqHelper.JSON.pathValueGet(res.response, 'response_code.message');
                this._uploadErrorAdd( { title: 'Gagal', notice: message } );
                this.imageObj[key].progress = 0;
              }

            }

            this._updateImageList();
          } catch ( e ) {
            console.error( `Error on image upload subscriber: ${ e.message }` );
          }
        }
      );
  };

  _uploadImageUnsubscribe = ( name ) => {
    if ( !this.imageObj[name].hasOwnProperty( 'ajaxSubscribe' ) ) return;
    this.imageObj[name].ajaxSubscribe.unsubscribe();
  };

  _uploadImageAction = ( name ) => {
    let status = this.imageObj[name].status;

    if ( status === 0 ) {
      this._uploadImageUnsubscribe( name );
      this.imageObj[name].status = 400;
      this.imageObj[name].progress = 0;//reset progress

      this._updateImageList();

    } else if ( status !== 0 && !biqHelper.utils.httpResponseIsSuccess( status ) ) {

      this.imageObj[name].progress = 0;//reset progress
      this._uploadImageSubscribe( name );
    }

  };

  uploadErrors = [];

  _uploadErrorAdd = ( p_obj ) => {
    let params = {
      id: Date.now(),
      title: '',
      notice: '',
      state: -1// -1 : new / notvisible, 0: ready, 1: visible
    };

    Object.assign( params, p_obj );

    this.uploadErrors.push( params );

    this._uploadErrorRender();

    setTimeout( ()=>{

      for( let i=0; i<this.uploadErrors.length; i++ ) {
        let upload_error = this.uploadErrors[i];
        if ( upload_error.id === params.id ) {
          this.uploadErrors[i].state = 0;
        }
      }

      this._uploadErrorRender();

    }, 100 );

  };

  _uploadErrorClose = ( id ) => {
    biqHelper.utils.clickTimeout(()=> this._uploadErrorCloseActual( id ));
  };

  _uploadErrorCloseActual = ( id ) => {
    let upload_error_item = this.uploadErrors.filter( (el)=>{
      return el.id === id;
    } );
    let idx = this.uploadErrors.indexOf( upload_error_item );

    this.uploadErrors.splice( idx, 1 );
    this._uploadErrorRender();
  };

  _uploadErrorRender = () => {
    this.setState( { upload_errors: this.uploadErrors } );
  };

  _addPhotoClick = () => {
    if ( this.state.has_upload_progress || this.state.image_list.length >= 4 ) return;
    biqHelper.utils.clickTimeout( ()=>{
      this.inputRef.current.click();
    } );
  };

  _modalFailedClose = () => {
    this.setState( { modal_failed_is_open: false } );
  };

  _submitClick = () => {
    if( this.state.image_list.length < 1 || this.state.has_upload_progress ) return;

    let { type, id, referrer } = biqHelper.JSON.pathValueGetMulti( this.props.match.params, [ 'type', 'id', 'referrer' ] );
    let confirmed_url = `/balance/payment/status/${type}/${id}/${referrer}/confirmed`;
    biqHelper.utils.clickTimeout(()=> this.props.history.push( confirmed_url ));
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    let param_id_deposit = biqHelper.JSON.pathValueGet( this.props.match.params, 'id' );
    dispatch( balanceActions.balancePaymentTransactionFetch( param_id_deposit ) );
  }

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();

    let {dispatch} = this.props;

    dispatch( balanceActions.balancePaymentCancel() );
    dispatch( balanceActions.balancePaymentTransactionCancel() );

    dispatch( balanceActions.balancePaymentReset() );
    dispatch( balanceActions.balancePaymentTransactionReset() );
  }

  render() {
    let param_type = biqHelper.JSON.pathValueGet( this.props.match.params, 'type' );
    let is_submit = param_type === 'submit';

    let dummy_header= (
      <div className="balance-payment-status">

        <div className="balance-payment-status__header">
          <div className="title">Silahkan memproses pembayaran Anda</div>
          <HeaderMenuMobile forceVisible={true}/>
        </div>

      </div>
    );

    if ( this.props.balance.payment_transaction.is_fetching ) return dummy_header;

    return (
      <div className="balance-payment-confirmation">

        <div className="balance-payment-confirmation__header">

          <div className={`nav-back${ is_submit ? ' hidden-md-up' : '' }`}>
            <Button className="nav-back__btn" onClick={ this._backToHistory }>&nbsp;</Button>
            <div className="nav-back__text hidden-md-up">
              { is_submit ? 'Kembali' : 'Status pembayaran'}
            </div>
          </div>

          <div className="title visible-md-up">
            { is_submit ? 'Silahkan memproses pembayaran Anda' : 'Status pembayaran'}
          </div>

          <HeaderMenuMobile forceVisible={true}/>

        </div>

        <div className="balance-payment-confirmation__body">

          <div className="balance-payment-confirmation__main-panel">

            {
              this.state.upload_errors.length > 0 ?

                <div className="alert-box">
                  {
                    this.state.upload_errors.map((el) => {

                      return (
                        <div className={`alert-item${el.state === 0 ? ' is-visible' : ''}`} key={el.id}>
                          <div className="icon icon--failure"/>

                          <div className="info">
                            <div className="title">{el.title}</div>
                            <div className="notice" dangerouslySetInnerHTML={{__html: el.notice}}/>
                          </div>

                          <Button className="close-btn" onClick={() => this._uploadErrorClose(el.id)}>&nbsp;</Button>
                        </div>
                      );

                    })
                  }
                </div>

                :

                ''
            }

            <div className="top-nav visible-md-up">
              <Button className="back-btn" onClick={ this._backToStatus }>
                <div className="icon"/>
                <div className="label">Kembali</div>
              </Button>
            </div>

            <div className="upload-block">
              <div className="title">Upload Bukti Pembayaran</div>
              <div className="notice">
                Silahkan mengupload bukti pembayaran Anda untuk mempercepat proses pemesanan Anda.
              </div>

              {
                this.state.image_list.length > 0 ?
                  <div className="image-list">
                    {
                      this.state.image_list.map((el, idx) => {
                        let size = el.blob.size / 1000 <= 1000 ? `${Math.ceil(el.blob.size/1000)}KB` : `${biqHelper.number.roundFloat(el.blob.size/1000000, 3)}MB`;
                        let action_icon = '';

                        if ( el.status === 0 ) {
                          action_icon = ' action--cancel';
                        } else if ( biqHelper.utils.httpResponseIsSuccess( el.status ) ) {
                          action_icon = ' action--uploaded';
                        } else if ( biqHelper.utils.httpResponseIsError( el.status ) ) {
                          action_icon = ' action--retry';
                        }

                        return (
                          <div className={`image-list__item${ idx=== 0 ? ' is-first' : '' }`} key={el.name}>

                            <div className="icon"/>

                            <div className="info">
                              <div className="text">
                                <div className="text__inner">{ el.name }</div>
                              </div>

                              {
                                el.status === 0 ?
                                  <div className="progress-bar">
                                    <div className="indicator" style={{ width: `${el.progress}%` }}/>
                                  </div>
                                  :
                                  <div className="size">{size}</div>
                              }

                            </div>

                            <Button className={`action${ action_icon }`} onClick={ ()=> this._uploadImageAction( el.name ) }>&nbsp;</Button>

                          </div>
                        )
                      })
                    }
                  </div>

                  :

                  ''

              }

              <input type="file" multiple={true} accept="image/*" style={{display: 'none'}} ref={this.inputRef} onChange={this._addPhotoUpload}/>

              <Button className={`add-photo-btn${ this.state.image_list.length > 0 ? ' has-images' : '' }${ this.state.has_upload_progress || this.state.image_list.length >= 4 ? ' has-upload-progress' : '' }`} onClick={this._addPhotoClick}>Tambahkan Foto</Button>

              {
                this.state.image_list.length > 0 ?

                <Button className={`save-btn${ this.state.has_upload_progress ? ' has-upload-progress' : '' }`} onClick={this._submitClick}>
                  { this.state.has_upload_progress ? 'PROSES..' : 'SIMPAN' }
                </Button>

                  :

                ''
              }

            </div>

          </div>

          <div className="balance-payment-confirmation__spacer visible-md-up"/>

          <BalanceTransactionInfo/>

        </div>

        <Modal
          open={this.state.modal_failed_is_open}
          onClose={this._modalFailedClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalFailedClose} title={this.state.modal_failed_text.title} notice={this.state.modal_failed_text.notice}/>
          </div>

        </Modal>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    user: state.user
  }
};

export default connect( mapStateToProps ) (BalancePaymentConfirmation);
