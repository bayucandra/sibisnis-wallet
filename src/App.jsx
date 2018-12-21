import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import {fromEvent, forkJoin} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import $ from 'jquery';

import Header from "./components/Shared/Header/Header";
import appActions from "./redux/actions/global/appActions";
import userActions from "./redux/actions/global/userActions";
import esProvider from "./providers/esProvider";
import biqHelper from "./lib/biqHelper/index";
import biqConfig from "./providers/biqConfig";
import addressProvider from "./providers/addressProvider";
import walletProvider from "./providers/walletProvider";

import Modal from "@material-ui/core/Modal/Modal";

import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Profile from "./components/Pages/Profile";
import Balance from "./components/Pages/Balance";
import BalancePayment from "./components/Pages/BalancePayment/BalancePayment";
import AllNews from "./components/Pages/AllNews/AllNews";
import AllHistorLogins from "./components/Pages/AllHistoryLogins/AllHistoryLogins";
import LoadingIndicatorBar from "./components/Widgets/LoadingIndicatorBar/LoadingIndicatorBar";

import ModalNotice from "./components/Widgets/ModalNotice/ModalNotice";
import DialogProfilePhoto from "./components/Dialogs/DialogProfilePhoto";
import DialogAddressInput from "components/Dialogs/DialogAddressInput";
import DialogEmailVerification from "./components/Dialogs/DialogEmailVerification";

import "./App.scss";

class App extends Component {

  state = {
    initialized: false,
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

  componentDidMount(){
    let {dispatch} = this.props;
    if ( process.env.NODE_ENV === 'development' ) console.log('initializing app');

    dispatch(appActions.appInit());
    dispatch(appActions.appSseAgenInit());
    dispatch(userActions.userProfileGet());

    if ( process.env.NODE_ENV === 'production' ) {
      esProvider.addEventListener('login', (e) => {
        if (e.data === 'false' || !e.data) {
          dispatch(appActions.appLogout());
        }
      });
    }


    let source$ = fromEvent(window, 'resize')
      .pipe( map( (e) => {
        let window_el = $(window);
        return { width: window_el.outerWidth(), height: window_el.outerHeight() };
      } ) )
      .pipe( debounceTime(100) );

    source$.subscribe((e) => {
      dispatch( appActions.appWindowResize( e ) );
    });

    //BEGIN INITIALIZE LOCAL DATA===========
    // addressProvider.provinsi$().subscribe();
    // addressProvider.kabupaten$().subscribe();

      forkJoin(
        addressProvider.provinsi$(),
        addressProvider.kabupaten$(),
        walletProvider.paymentStatus$(),
        walletProvider.bankList$()
      ).subscribe( res =>{
        this.setState( { initialized: true } );
      });
    //END INITIALIZE LOCAL DATA************

  }

  shouldComponentUpdate(nextProps, nextState) {
    let {dispatch} = this.props;
    if ( this.props.location !== nextProps.location ) {
      dispatch( appActions.appRouterChange( { header_mobile_show : true, header_menu_mobile_show: true } ) );//default should always true, it will be overridden at page/component part if it should be false
    }

    if ( nextProps.app.is_app_initialized && this.props.app.is_logged_in && !nextProps.app.is_logged_in ) {
      biqHelper.localStorage.clear();
      dispatch( appActions.appStatesReset() );
      dispatch( appActions.appRedirectToAgen() );
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // window.scrollTo(0,0);
    let {dispatch} = this.props;
    let body = $('html, body');
    if (prevProps.location.pathname !== this.props.location.pathname)
      body.stop().animate({scrollTop:0}, 500, 'swing');

    if( this.props.app.should_redirect_to_agen ) window.location = biqConfig.agen.url_base + '/#/login/default';

    if( this.props.app.is_logging_out ) {

      if (
        biqHelper.utils.httpResponseIsSuccess(
          biqHelper.JSON.pathValueGet( this.props.app.logout_response, 'status' )
        )
      ) {
        dispatch( appActions.appLoggedOut() );
      }

      else if (
        biqHelper.utils.httpResponseIsError(
          biqHelper.JSON.pathValueGet( this.props.app.logout_response, 'status' )
        )
        && !this.state.modal_is_open
      ) {
        let response_status = biqHelper.JSON.pathValueGet( this.props.app.logout_response, 'response.response_code.status' );
        let response_text = biqHelper.JSON.pathValueGet( this.props.app.logout_response, 'response.response_code.message' );
        let notice = `${response_status}, ${ response_text }`;

        notice = biqHelper.utils.isNullSome( response_status, response_text ) ? 'Error logout tidak diketahui' : notice;
        this.setState({
          modal_notice_text: {
            title: 'Gagal logout',
            notice: notice
          }
        });

        this._modalOpen();
      }

    }

  }

  render() {
    if ( !this.state.initialized ) return <LoadingIndicatorBar className={"loading-indicator-main"} style={{ top: 0 }} barStyle={{background: '#1c94fc'}}/>;

    if ( this.props.app.is_logging_out || !this.props.app.is_logged_in ) return (
      <>
        <Header/>
        <LoadingIndicatorBar className={"loading-indicator-main"} barStyle={{background: '#1c94fc'}}/>
      </>
    );

    return (
        <React.Fragment>

          <Header/>

          {
            this.props.app.loading_indicator_show && <LoadingIndicatorBar className={"loading-indicator-main"} barStyle={{background: '#1c94fc'}}/>
          }

          <Switch>
            <Route path="/balance/payment" component={BalancePayment}/>
            <Route path="/balance" component={Balance}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/all-news" component={AllNews} />
            <Route path="/all-history-logins" component={AllHistorLogins} />
            <Redirect from="/" to="/dashboard" />
          </Switch>


          <Modal
            open={this.state.modal_is_open}
            onClose={this._modalClose}>

            <div className="modal-inner">
              <ModalNotice modalClose={this._modalClose} title={this.state.modal_notice_text.title} notice={this.state.modal_notice_text.notice}/>
            </div>

          </Modal>


          <DialogEmailVerification/>
          <DialogProfilePhoto/>
          <DialogAddressInput/>


        </React.Fragment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    app: state.app
  }
};

export default withRouter(connect( mapStateToProps )(App) );