// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {Button} from 'components/Widgets/material-ui';

import { Observable, Subject, of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { merge, catchError, takeUntil } from 'rxjs/operators';

import PhotoCrop from '../PhotoCrop/PhotoCrop';

import biqConfig from "providers/biqConfig";
import biqHelper from "lib/biqHelper";

import userActions from 'redux/actions/global/userActions';
import { connect } from 'react-redux';

import uploadIconMobile from 'images/icons/ico-upload-mobile.svg';
import uploadIconDesktop from 'images/icons/ico-upload-desktop.svg';
import imgUploadSukses from 'images/icons/upload-sukses.svg';
import imgUploadGagal from 'images/icons/upload-gagal.svg';

import './PhotoUploadFile.scss';

class PhotoUploadFile extends Component {

  stop$ = new Subject();

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      src: null,
      img_file_name: '',
      img_mime: 'image/jpeg',
      img_is_set: false,
      img_is_uploading: false,
      server_response: null,
      img_upload_progress: 0
    };

    this.imageCropRef = null;
    this.dropzoneRef = React.createRef();
  }

  _setFileState( files, callback=null ) {

    if ( !biqHelper.utils.isNull(files) && files.length > 0) {

      const reader = new FileReader();

      reader.addEventListener(

        'loadend',

        (e) => {

          if (e.target.readyState === FileReader.DONE) {
            let result = e.target.result;

            this.setState({
              src: result,
              img_file_name: files[0].name,
              img_is_set: true,
              img_mime: files[0].type
            });

            if (typeof callback === 'function') callback();
          }

        },

        false

      );

      reader.readAsDataURL(files[0]);

    }

    this.setState({files});

  }

  onDrop( files ) {
    this._setFileState( files );
  }

  changeImage() {
    biqHelper.utils.clickTimeout({
      callback: ()=>{
        this.dropzoneRef.current.open();
      }
    });
  }

  imageCropRefSet( ref ) {
    if ( this.imageCropRef !== null ) return;

    this.imageCropRef = ref;
  }

  imageCropGet$() {
/*    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    });*/

    return Observable.create( ( observer ) => {

      this.imageCropRef.getCroppedCanvas().toBlob( blob => {
        // file.name = fileName;
        observer.next(blob);
        observer.complete();
      }, this.state.img_mime);

    })

  };

  _imageUpload = () => {
    biqHelper.utils.clickTimeout(() => {
        this._imageUploadActual();
    });
  };

  _imageUploadActual() {

    if ( !this.state.img_is_set ) return;
    if ( this._imgIsUploadedSuccess() ) {
      this._modalClose();
      return;
    }

    this.setState({ img_is_uploading: true });

    this.imageCropGet$()
      .subscribe(( blob )=>{

        let form_data = new FormData();
        form_data.append( 'column', 'image' );
        form_data.append( 'value', blob, this.state.img_file_name );
        form_data.append( '_csrf', biqHelper.utils.csrfGet()['_csrf'] );

        const progressSubscriber = new Subject();

        let request$ = rxAjax({
          url: biqConfig.api.url_base + '/api/wallet/profile_update',
          // url: 'http://newzonatik.com/agen/dev-api/preflight.php',
          method: 'POST',
          ...biqConfig.rxAjaxOptions,
          body: form_data,
          progressSubscriber
        });

        progressSubscriber

          .pipe(
            takeUntil( this.stop$ ),
            merge(request$),
            catchError( err => of(err.target) )
          )

          .subscribe(

            res =>{
              if ( res.type === 'progress' ) {
                let upload_progress = Math.floor(res.loaded / res.total * 100 );
                this.setState( { img_upload_progress: upload_progress } );
              }

              if ( !biqHelper.utils.isNull( res.status) ) {
                this.setState( { img_is_uploading: false, server_response: res.response, img_upload_progress: 0 } );

                if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {
                } else {
                  let response = res.status !== 0 ? res.response
                    : biqConfig.api.error_response_fake;
                  this.setState( { img_is_uploading: false, server_response: response, img_upload_progress: 0 });
                }
              }

            }

          );

      });

  };

  _onDoneClick = () => {
    let {dispatch} = this.props;
    dispatch( userActions.userProfileUpdate( { photo: this.state.server_response.data.path } ) );
  };

  _imgIsUploadedError() {
    if ( this.state.img_is_uploading ) return false;
    if ( biqHelper.utils.isNull( this.state.server_response )
      || biqHelper.JSON.pathIsNull(this.state.server_response, 'response_code.status') ) return false;

    if ( biqHelper.utils.httpResponseIsError( this.state.server_response.response_code.status ) ) {
      return true;
    }

    return false;

  }

  _imgIsUploadedSuccess() {
    if ( this.state.img_is_uploading ) return false;
    if ( biqHelper.utils.isNull( this.state.server_response )
      || biqHelper.JSON.pathIsNull(this.state.server_response, 'response_code.status') ) return false;


    if ( biqHelper.utils.httpResponseIsSuccess( this.state.server_response.response_code.status ) ) {
      return true;
    }

    return false;

  }

  _buttonUploadInner() {

    if ( this.state.img_is_uploading ) {
      return <div className="text">Proses Upload</div>;
    } else if( this._imgIsUploadedError() ){
      return <>
          <div className="icon" style={{ backgroundImage: `url( ${imgUploadGagal} )`} } />
          <div>Kirim ulang</div>
        </>
    } else if ( this._imgIsUploadedSuccess() ){
      return <>
          <div className="icon" style={{ backgroundImage: `url( ${imgUploadSukses} )` }}/>
          <div>Tutup</div>
        </>
    } else {
      return <div className="text">Upload Foto</div>;
    }

  }

  _canChangePhoto() {
    return !this.state.img_is_set || this.state.img_is_uploading || this._imgIsUploadedSuccess() || this._imgIsUploadedError();
  }

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.drop-photo-upload-container', top_space: 155, bottom_space: 317};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 30;
      ratio_opt.bottom_space = 30;
    }
    let top_pos = biqHelper.utils.modalTopRatio( ratio_opt );
    return top_pos;
  }

  _modalClose = ()=>{
    biqHelper.utils.clickTimeout(()=>this.props.modalClose() );
  };

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

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();

    if ( this._imgIsUploadedSuccess() ) {
      setTimeout( ()=>{
        this._onDoneClick();
      }, 300 );
    }
  }

  render() {

    return (
      <div className="drop-photo-upload-container" style={{ marginTop: this.state.modalPosTop }}>

        <Button className="modal-close-btn" onClick={this._modalClose} >&nbsp;</Button>

        <div className="drop-photo-upload-header">
          <div className="drop-photo-upload-header__title hidden-md-up hidden-md-up--block">Tambahkan foto dari galeri</div>
          <div className="drop-photo-upload-header__title visible-md-up visible-md-up--block">Tambahkan foto dari direktori</div>
          <div className="drop-photo-upload-header__description">Maksimum file berukuran 10 Mb, Untuk keperluan validasi pastikan upload foto profile terakhir anda</div>
        </div>

        <div className={"drop-zone-area-container" + (this.state.img_is_set ? ' hidden' : '' ) }>
          <Dropzone ref={this.dropzoneRef} activeClassName="drop-zone-active" accept="image/jpeg, image/png" className="drop-zone" onDrop={this.onDrop.bind(this)}>
            <div className="drop-zone-area">
              <img src={uploadIconMobile} className="drop-zone-area__icon upload-icon-mobile" alt="" />
              <img src={uploadIconDesktop} className="drop-zone-area__icon upload-icon-desktop" alt="" />
              <div className="drop-zone-area__description mobile-show__block">Klik untuk menuju ke direktori lokasi Foto</div>
              <div className="drop-zone-area__description visible-md-up visible-md-up--block">Tarik file anda kesini, atau klik untuk menuju ke direktori lokasi Foto</div>
            </div>
          </Dropzone>
        </div>

        <PhotoCrop imgIsSet={ this.state.img_is_set } src={this.state.src} imageCropRefSet={this.imageCropRefSet.bind(this)} />

        <div className={ `notices${ this._imgIsUploadedSuccess() ? ' notices--success' : this._imgIsUploadedError() ? ' notices--error' : '' }` }
          dangerouslySetInnerHTML={ { __html: this._imgIsUploadedSuccess() || this._imgIsUploadedError() ? this.state.server_response.response_code.message : '' } }>
        </div>

        <div className="image-actions-container">

          <Button className={ `upload-photo-btn${ !this.state.img_is_set ? ' is-disabled' : '' }` } onClick={this._imageUpload}>
            <div className={"progress-bar" + (this.state.img_is_uploading ? ' is-visible' : '')} style={{ "width" : `${ this.state.img_upload_progress }%` }}/>
            <div className="upload-photo-btn__inner">
              {this._buttonUploadInner()}
            </div>
          </Button>

          <Button className={`change-photo-btn${ this._canChangePhoto()  ? ' hidden' : '' }`} onClick={this.changeImage.bind(this)}>
            Ganti Foto
          </Button>

        </div>

      </div>
    )
  }
}


export default withRouter( connect( null)(PhotoUploadFile) );
