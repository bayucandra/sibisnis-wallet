import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Subject, of} from 'rxjs';
import {merge, takeUntil, catchError} from 'rxjs/operators'
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

class BalancePaymentConfirmation extends Component{

  inputRef = React.createRef();

  imageObj = [];

  state = {
    modal_failed_is_open: false,
    modal_failed_text: { title: '', notice: '' },
    duplicate_file_name: '',
    image_list: []
  };

  stop$ = new Subject();

  _backBtnClick = ()=> {
    let { type, id, referrer } = biqHelper.JSON.pathValueGetMulti( this.props.match.params, [ 'type', 'id', 'referrer' ] );
    let back_url = `/balance/payment/status/${type}/${id}/${referrer}`;
    biqHelper.utils.clickTimeout( () => this.props.history.push(back_url) )
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
    for( let key in this.imageObj ) {
      let image_data = Object.assign( {}, this.imageObj[key] );
      image_data.upload$ = null;
      image_data.stop$ = null;
      image_list.push( image_data );
    }
    this.setState({ image_list: image_list });
  }

  _uploadImageList() {

    for ( let key in this.imageObj ) {
      let image_data = this.imageObj[key];

      if ( image_data.status === -1 ) {
        let form_data = new FormData();
        form_data.append('invoice_number', 'Test-1234');
        form_data.append('memberid', '123456');
        form_data.append( 'image', image_data.blob, image_data.name );
        form_data.append( 'scrf_token', biqConfig.api.csrf_token );

        this.imageObj[key].stop$ = new Subject();
        const progressSubscriber = new Subject();
        this.imageObj[key].upload$ = rxAjax({
          url: 'https://www.biqdev.com/demo/wallet/upload.php',
          method: 'POST',
          crossDomain: true,
          withCredentials: true,
          body: form_data,
          progressSubscriber
        });

        this.imageObj[key].status = 0;

        progressSubscriber
          .pipe(
            takeUntil( this.imageObj[key].stop$.pipe( merge( this.stop$ ) ) ),
            merge(this.imageObj[key].upload$),
            catchError( err => of(err.currentTarget) )
          )
          .subscribe(
            data => {

              if ( data.type === 'progress' ) {
                let upload_progress = Math.floor(data.loaded / data.total * 100 );
                this.imageObj[key].progress = upload_progress;
              }else if ( !biqHelper.utils.isNull( data.status) ) {
                this.imageObj[key].status = data.status;
              }

              this._updateImageList();

            }
          );

      }
    }

  }

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

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();
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

                            <Button className={`action${ action_icon }`}>&nbsp;</Button>

                          </div>
                        )
                      })
                    }
                  </div>

                  :

                  ''

              }

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
            <ModalNotice modalClose={this._modalFailedClose} title={this.state.modal_failed_text.title} notice={this.state.modal_failed_text.notice}/>
          </div>

        </Modal>

      </div>
    );
  }

}

export default connect( null ) (BalancePaymentConfirmation);