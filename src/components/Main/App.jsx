import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from "./../Shared/Header/Header";
import PageLayout from './../PageLayout/PageLayout';
import AppActions from "../../redux/actions/AppActions";
import esProvider from "../../providers/esProvider";
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../providers/biqConfig";

import {fromEvent} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import $ from 'jquery';


class App extends Component {

  componentDidMount(){
    this.props.appInit();
    this.props.appSetProfileData();
    this.props.appSseAgenInit();

    esProvider.addEventListener( 'login', ( e ) => {
      if ( e.data === 'false' || !e.data ) {
        this.props.appLogout();//TODO: enable this soon
      }
    } );


    let source$ = fromEvent(window, 'resize')
        .pipe( map( (e) => {
          let window_el = $(window);
          return { width: window_el.outerWidth(), height: window_el.outerHeight() };
        } ) )
        .pipe( debounceTime(100) );

    source$.subscribe((e) => {
      this.props.appWindowResize( e );
    });

  }

  render() {

    if ( this.props.app.is_app_initialized && !this.props.app.is_logged_in ) {
      biqHelper.localStorage.clear();
      this.props.appStatesReset();
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
    app: store.app
  }
};

export default withRouter(connect( mapStateToProps, AppActions)(App) );