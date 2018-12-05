import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Header from "./components/Shared/Header/Header";
import appActions from "./redux/actions/global/appActions";
import UserActions from "./redux/actions/global/userActions";
import esProvider from "./providers/esProvider";
import biqHelper from "./lib/biqHelper/index";
import biqConfig from "./providers/biqConfig";
import addressProvider from "./providers/addressProvider";
import walletProvider from "./providers/walletProvider";

import {fromEvent, forkJoin} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import $ from 'jquery';
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Balance from "./components/Pages/Balance";
import BalancePayment from "./components/Pages/BalancePayment/BalancePayment";
import AllNews from "./components/Pages/AllNews/AllNews";
import AllHistorLogins from "./components/Pages/AllHistoryLogins/AllHistoryLogins";
import LoadingIndicatorBar from "./components/Widgets/LoadingIndicatorBar/LoadingIndicatorBar";

import "./App.scss";


class App extends Component {

  state = {
    initialized: false
  };

  componentDidMount(){
    let {dispatch} = this.props;
    if ( process.env.NODE_ENV === 'development' ) console.log('initializing app');

    dispatch(appActions.appInit());
    dispatch(appActions.appSseAgenInit());
    dispatch(UserActions.userProfileGet());

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

    if ( nextProps.is_app_initialized && !nextProps.is_logged_in ) {
      biqHelper.localStorage.clear();
      dispatch( appActions.appStatesReset() );
      dispatch( appActions.appRedirectToAgen() );
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    // window.scrollTo(0,0);
    let body = $('html, body');
    body.stop().animate({scrollTop:0}, 500, 'swing');
    if( this.props.should_redirect_to_agen ) window.location = biqConfig.agen.url_base + '/#/login/default';
  }

  render() {
    if ( !this.state.initialized ) return <LoadingIndicatorBar className={"loading-indicator-main"} style={{ top: '5px' }} barStyle={{background: '#1c94fc'}}/>;

    return (
        <React.Fragment>

          <Header/>

          {
            this.props.loading_indicator_show && <LoadingIndicatorBar className={"loading-indicator-main"} barStyle={{background: '#1c94fc'}}/>
          }

          <Switch>
            <Route path="/balance/payment" component={BalancePayment}/>
            <Route path="/balance" component={Balance}/>
            <Route path="/dashboard" component={DashboardLayout} />
            <Route path="/all-news" component={AllNews} />
            <Route path="/all-history-logins" component={AllHistorLogins} />
            <Redirect from="/" to="/dashboard" />
          </Switch>

        </React.Fragment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    is_app_initialized: state.app.is_app_initialized,
    should_redirect_to_agen: state.app.should_redirect_to_agen,
    is_logged_in: state.app.is_logged_in,
    window_size: state.app.window_size,
    loading_indicator_show: state.app.loading_indicator_show
  }
};

export default withRouter(connect( mapStateToProps )(App) );