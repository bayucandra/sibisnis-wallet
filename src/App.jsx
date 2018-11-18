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
      this.setState( { initialized: true }, ()=>{
        this.forceUpdate();
      } );
    });
    //END INITIALIZE LOCAL DATA************

  }

  shouldComponentUpdate(nextProps, nextState) {
    let {dispatch} = this.props;
    if ( this.props.location !== nextProps.location ) {
      dispatch( appActions.appRouterChange( { header_mobile_show : true, header_menu_mobile_show: true } ) );//default should always true, it will be overridden at page/component part if it should be false
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    // window.scrollTo(0,0);
    let body = $('html, body');
    body.stop().animate({scrollTop:0}, 500, 'swing');
  }

  render() {
    const {dispatch} = this.props;
    if ( this.props.is_app_initialized && !this.props.is_logged_in ) {
      biqHelper.localStorage.clear();
      dispatch( appActions.appStatesReset() );
      window.location = biqConfig.agen.url_base + '/#/login/default';
    }

    return (
        <React.Fragment>

          <Header/>

          {
            this.props.loading_indicator_show ?
              <LoadingIndicatorBar className={"loading-indicator-main"} barStyle={{background: '#1c94fc'}}/>
              :
              ''
          }

          <Switch>
            <Redirect from="/" exact={true} to="/dashboard" />
            <Route path="/balance/payment" component={BalancePayment}/>
            <Route path="/balance" component={Balance}/>
            <Route path="/dashboard" component={DashboardLayout} />
            <Route path="/all-news" component={AllNews} />
            <Route path="/all-history-logins" component={AllHistorLogins} />
          </Switch>

        </React.Fragment>
    )
  }
}

const mapStateToProps = ( store ) => {
  return {
    is_app_initialized: store.app.is_app_initialized,
    is_logged_in: store.app.is_logged_in,
    window_size: store.app.window_size,
    loading_indicator_show: store.app.loading_indicator_show
  }
};

export default withRouter(connect( mapStateToProps )(App) );