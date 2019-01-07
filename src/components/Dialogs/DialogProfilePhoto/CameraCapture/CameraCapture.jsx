import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactWebcam from 'react-webcam';

import { Subject, of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { takeUntil, catchError } from 'rxjs/operators';

import appActions from "redux/actions/global/appActions";
import userActions from "redux/actions/global/userActions";

import biqHelper from "lib/biqHelper";
import biqConfig from "../../../../providers/biqConfig";

import {Button} from "components/Widgets/material-ui";
import LoadingIndicatorBar from "components/Widgets/LoadingIndicatorBar";

import "./CameraCapture.scss";

class CameraCapture extends Component {

  stop$ = new Subject();

  refCamera = React.createRef();
  refImgCaptured = React.createRef();

  state = {
    modalPosTop: 0,
    camera: {
      is_captured: false,
      img_data: null
    },
    img_is_uploading: false
  };

  _modalClose = () => {
    biqHelper.utils.clickTimeout( () => this.props.modalClose() );
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.camera-capture-dialog', top_space: 252, bottom_space: 252};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 50;
      ratio_opt.bottom_space = 120;
    }
    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  _setRef = (camera) => {
    this.refCamera = camera;
  };

  _capture = () => {
    biqHelper.utils.clickTimeout( () => {
      this._captureActual()
    } );
  };

  _captureActual = () => {

    try {
      let img_captured = this.refCamera.getScreenshot();
      this.setState( {
          camera: {
            is_captured: true,
            img_data: img_captured
          }
        } );
    } catch( e ) {
      console.error( `Error when capturing from camera: ${e.message}` );
    }

  };

  _recapture = () => {
    biqHelper.utils.clickTimeout( () => {
      this._recaptureActual();
    } );
  };

  _recaptureActual = () => {
    this.setState( {
      camera: {
        is_captured: false,
        img_data: null
      }
    } );
  };

  _submitPhoto = () => {
    let {dispatch} = this.props;
    if ( !this.state.camera.is_captured || biqHelper.utils.isNull( this.state.camera.img_data ) ) {
      dispatch( appActions.appDialogNoticeOpen( { title: 'Error', notice: 'Terdapat masalah dengan proses capture kamera' } ) );
      return;
    }

    let img_el = this.refImgCaptured.current;

    let capture_height = biqHelper.mediaQuery.isMobile() ? 260 : 360;

    let img_canvas_el = document.createElement('canvas');
    img_canvas_el.width = img_el.width;
    img_canvas_el.height = capture_height;
    let ctx = img_canvas_el.getContext('2d');
    ctx.translate(img_el.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img_el, 0, 0 );

    img_canvas_el.toBlob( blob => {

      this.setState({ img_is_uploading: true });

      let form_data = new FormData();
      form_data.append( 'column', 'image' );
      form_data.append( 'value', blob, `Camera-${Math.round((new Date()).getTime() / 1000)}.png` );
      form_data.append( 'csrf_token', biqConfig.api.csrf_token );

      let ajax$ = rxAjax({
        url: biqConfig.api.url_base + '/api/wallet/profile_update',
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: form_data,
      })
        .pipe(
          takeUntil( this.stop$ ),
          catchError( err => of(err) )
        );

      ajax$.subscribe(
        res => {

          let {dispatch} = this.props;

          this.setState({ img_is_uploading: false });

          if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {

            this._modalClose();

            setTimeout(
              () => dispatch( userActions.userProfileUpdate( { photo: res.response.data.value } ) ),
              300
            );

          } else {
            let response = biqHelper.JSON.pathValueGet( res, 'response' );
            response = !biqHelper.utils.isNull(response) ? response : {};
            Object.assign( {}, biqConfig.api.error_response_fake, response );
            dispatch( appActions.appDialogNoticeOpen( { title: `Error ${res.status}`, notice: response.response_code.message } ) );
          }

          img_canvas_el.remove();

        }
      );

    } );


  };

  componentDidMount(){
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  componentWillUnmount() {

    this.stop$.next();
    this.stop$.complete();

  }

  render() {

    return (
      <div className="camera-capture-dialog" style={{ marginTop: this.state.modalPosTop }}>

        <div className="camera-capture-dialog__header">

          <div className="title">Ambil Foto</div>

          <Button className="close-btn" onClick={ this._modalClose }>&nbsp;</Button>

        </div>



        <div className="camera-capture-dialog__body">

          {
            !this.state.camera.is_captured ?
              <ReactWebcam audio={false} screenshotFormat="image/png" ref={this._setRef} />
                :
              <img src={ this.state.camera.img_data } ref={this.refImgCaptured} alt={'Captured'}/>
          }

        </div>

        <div className="camera-capture-dialog__footer">
          {
            !this.state.camera.is_captured ?
              <Button className="capture-btn" onClick={this._capture}>&nbsp;</Button>
                :
              <>
                <Button className="recapture-btn" onClick={this._recapture}>
                  <div className="recapture-btn__inner">
                    <div className="icon"/>
                    <div className="label">Ambil ulang</div>
                  </div>
                </Button>

                <Button className="submit-btn" onClick={this._submitPhoto}>&nbsp;</Button>
              </>
          }
          <LoadingIndicatorBar isVisible={this.state.img_is_uploading}/>
        </div>

      </div>
    );
  }

}

export default connect( null ) (CameraCapture);