import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from "./../Shared/Header/Header";
import PageLayout from './../PageLayout/PageLayout';
import AppActions from "../../redux/actions/AppActions";
import UserActions from "../../redux/actions/UserActions";
import esProvider from "../../providers/esProvider";
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../providers/biqConfig";

import {fromEvent} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import $ from 'jquery';


class App extends Component {

  componentDidMount(){
    let {dispatch} = this.props;
    console.log('initializing app');
    dispatch(AppActions.appInit());
    dispatch(AppActions.appSseAgenInit());
    dispatch(UserActions.userProfileGet());

    esProvider.addEventListener( 'login', ( e ) => {
      if ( e.data === 'false' || !e.data ) {
        dispatch( AppActions.appLogout() );//TODO: enable this soon
      }
    } );


    let source$ = fromEvent(window, 'resize')
      .pipe( map( (e) => {
        let window_el = $(window);
        return { width: window_el.outerWidth(), height: window_el.outerHeight() };
      } ) )
      .pipe( debounceTime(100) );

    source$.subscribe((e) => {
      dispatch( AppActions.appWindowResize( e ) );
    });

  }

  render() {
    const {dispatch} = this.props;
    if ( this.props.is_app_initialized && !this.props.is_logged_in ) {
      biqHelper.localStorage.clear();
      dispatch( AppActions.appStatesReset() );
      window.location = biqConfig.agen.url_base + '/#/login/default';
    }

    return (
        <React.Fragment>
          <Header/>
          <PageLayout/>
        </React.Fragment>
    )
  }
}

const mapStateToProps = ( store ) => {
  return {
    is_app_initialized: store.app.is_app_initialized,
    is_logged_in: store.app.is_app_initialized,
    window_size: store.app.window_size
  }
};

export default withRouter(connect( mapStateToProps )(App) );