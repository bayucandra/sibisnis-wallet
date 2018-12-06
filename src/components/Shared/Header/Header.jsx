import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {of} from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import appActions from "../../../redux/actions/global/appActions";

import { Button } from '../../Widgets/material-ui';

import HeaderMenuMobile from "../HeaderMenuMobile";

import biqHelper from "../../../lib/biqHelper";
import biqConfig from "../../../providers/biqConfig";

import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';

import './Header.scss';
import Modal from "@material-ui/core/Modal/Modal";
import ModalNotice from "../../Widgets/ModalNotice/ModalNotice";

class Header extends Component {

  state = {
    modal_is_open: false,
    modal_notice_text: {
      title: 'Error',
      notice: ''
    }
  };

  _modalClose = () => {
    this.setState( { modal_is_open: false } );
  };

  _modalOpen = () => {
    this.setState( { modal_is_open: true } );
  };

  _switchClick = () => {
    biqHelper.utils.clickTimeout( () => {
      window.location = biqConfig.agen.url_base;
    } );
  };

  _logoutClick = () => {
    let ajax$ = rxAjax({
      method: 'POST',
      url: `${biqConfig.api.url_base}/api/logout`,
      crossDomain: true,
      withCredentials: true,
      data: Object.assign( {}, biqConfig.api.data_auth )
    });

    let {dispatch} = this.props;

    dispatch(appActions.appLoadingIndicatorShow());

    ajax$
      .pipe(
        catchError( err => of(err.xhr) )
      )
      .subscribe( res => {

        if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {
          biqHelper.localStorage.clear();
          dispatch( appActions.appStatesReset() );
          dispatch( appActions.appRedirectToAgen() );
        } else {

          let response_status = biqHelper.JSON.pathValueGet( res.response, 'response_code.status' );
          let response_text = biqHelper.JSON.pathValueGet( res.response, 'response_code.message' );
          let notice = `${response_status}, ${ response_text }`;

          notice = biqHelper.utils.isNullSome( response_status, response_text ) ? 'Error logout tidak diketahui' : notice;
          this.setState( {
            modal_notice_text: {
              title: 'Gagal logout',
              notice: notice
            }
          });

          this._modalOpen();

        }

        dispatch(appActions.appLoadingIndicatorHide());

      } );
  };

  _goToDashboard = () =>{
    biqHelper.utils.clickTimeout( () =>{
      this.props.history.push('/');
    } );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if( this.props.should_redirect_to_agen ) window.location = biqConfig.agen.url_base + '/#/login/default';
  }

  render() {
    return (
      <div className={`biq-wrapper header-main${!this.props.header_mobile_show ? ' header-main--hidden-mobile' : ''}`}>

        <div className="biq-wrapper__inner header-main__inner">

          <div className="left">

            <Button className="switch-btn visible-md-up" onClick={this._switchClick}>
              <img src={switchIcon} alt="switch" />
            </Button>

            <Button className="brand" onClick={this._goToDashboard}>
               BantulPulsa
            </Button>

          </div>

          <div className="right">

            <Button className="logout-btn visible-md-up" onClick={this._logoutClick}>
              <img src={logoutIcon} className="logout-btn__icon" alt="switch" />
              <span className="logout-btn__text">Logout</span>
            </Button>

            <HeaderMenuMobile/>

          </div>

        </div>

        <Modal
          open={this.state.modal_is_open}
          onClose={this._modalClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalClose} title={this.state.modal_notice_text.title} notice={this.state.modal_notice_text.notice}/>
          </div>

        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    header_mobile_show: state.app.header_mobile_show,
    should_redirect_to_agen: state.app.should_redirect_to_agen
  }
};

export default withRouter( connect( mapStateToProps ) (Header) );