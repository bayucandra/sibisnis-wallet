import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import { Subject, of } from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {catchError, takeUntil} from 'rxjs/operators';

import appActions from "redux/actions/global/appActions";

import biqHelper from "../../../lib/biqHelper";

import "./ScrollPagination.scss";

class ScrollPagination extends Component{

  state = {
    is_loading: false,
    has_scroll: false
  };

  _scroll_state_default = {
    page_current: 0,
    end_of_page: false
  };

  _scroll_state = {};

  dom_scroller = React.createRef();

  _stop$ = new Subject();
  _is_prop_valid = true;

  _data = [];

  _ajax_subscribe = null;

  constructor( props ) {
    super(props);
    this._scrollStateReset();
    biqHelper.jquery.init($);
  }

  _scrollStateReset = () => Object.assign( this._scroll_state, this._scroll_state_default );

  _onScroll = e => {
    if ( !this._is_prop_valid ) {
      console.error( 'Error: missing required props' );
      return;
    }

    if ( this.state.is_loading ) return;

    let wrapper_el = $(e.target);
    let should_load_more = wrapper_el.scrollTop() + wrapper_el.height() >= (wrapper_el[0].scrollHeight - this.props.biqScrollBottomSpace);

    if ( should_load_more ) this.loadMore();

  };

  loadInit = ( p_obj ) => {
    this._scrollStateReset();
    this.loadMore(p_obj);
  };

  loadMore = ( p_obj ) => {

    let params = {
      force_load: false
    };
    Object.assign( params, p_obj );

    if (
      ( this.state.is_loading && !params.force_load )
      || this.state.end_of_page
    ) return;

    if ( params.force_load ) this._ajax_subscribe.unsubscribe();

    this._scroll_state.page_current++;

    let data = {};
    let url = this.props.biqUrl;

    if ( this.props.biqMethod === 'POST' ) {
      data[this.props.biqQueryParams.limit] = this.props.biqLimit;
      data[this.props.biqQueryParams.offset] = (this._scroll_state.page_current - 1) * this.props.biqLimit;

      Object.assign(data, this.props.biqData);
    } else if( this.props.biqMethod === 'GET' ) {
      url += `?${this.props.biqQueryParams.limit}=${this.props.biqLimit}&${this.props.biqQueryParams.offset}=${(this._scroll_state.page_current - 1) * this.props.biqLimit}`;
    }

    let ajax$ = rxAjax({
      url: url,
      method: this.props.biqMethod,
      crossDomain: true,
      withCredentials: true,
      body: data
    });

    this.setState({ is_loading: true }, () => {
      if ( typeof this.props.onFetch === 'function' ) this.props.onFetch();
    });

    this._ajax_subscribe = ajax$
      .pipe(
        takeUntil(this._stop$),
        catchError(err => of(err.xhr))
      )
      .subscribe(res=>{

        if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {

          let res_data = res.response[ this.props.responseField ];

          if ( res_data.length === 0 ) this.setState( {end_of_page: true} );

          this.setState( { is_loading: false }, () => {
            this._data = this._data.concat( res_data );

            if ( typeof this.props.onFetched === 'function' )
              this.props.onFetched( {
                data_all: this._data,
                data_current: res_data,
                status_current: res.status
              } );

          } );

        }

        else if ( biqHelper.utils.httpResponseIsError( res.status ) ) {
          this._scroll_state.page_current--;
          this.setState( { is_loading: false } );

          let error_msg = biqHelper.JSON.pathValueGet( res.response, 'response_code.message' );
          error_msg = biqHelper.utils.isNull(error_msg) ? `Error: ${res.status}` : error_msg;
          let {dispatch} = this.props;
          dispatch( appActions.appDialogNoticeOpen( { title: 'Error', notice: error_msg } ) );
        }

        else {
          this._scroll_state.page_current--;
          this.setState( { is_loading: false } );

          let {dispatch} = this.props;
          dispatch( appActions.appDialogNoticeOpen( { title: 'Error', notice: 'Terjadi masalah saat menghubungkan ke server, harap periksa koneksi anda' } ) );
        }

      });
  };

  stop = () => {
    this._stop$.next();
    this._stop$.complete();
  };

  _loadMoreTpl = () => {
    return (
      <div className="c-loading-indicator" style={{height: '50px', marginBottom: '-50px', position: 'relative', padding: '15px 0'}}>
        <div className="c-loading-indicator__circle"/>
      </div>
    )
  };

  componentDidMount() {
    const required_props = [ 'biqUrl' ];

    let is_valid = true;

    for( let i=0; i < required_props.length; i++ ) {
      let required_prop = required_props[i];
      if ( !this.props.hasOwnProperty( required_prop ) ) is_valid = false;
    }

    if ( !is_valid ) {
      this._is_prop_valid = false;
      console.error( 'Error: Missing required props!!!' );
    } else {
      this.loadInit();
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if ( prevState.is_loading && !this.props.is_loading ) {
      let has_scroll = $(this.dom_scroller.current).biqHasScroll();

      if ( has_scroll.y === true && this.state.has_scroll === false ) {
        this.setState( { has_scroll: true } );
      }

      if ( has_scroll.y === false && this.state.has_scroll === true ) {
        this.setState( { has_scroll: false } );
      }
    }

  }

  componentWillUnmount() {
    this.stop();
  }

  render() {

    return (
      <div className={`${this.props.className}${ this.state.has_scroll ? ' has-scroll' : '' }`} onScroll={this._onScroll} ref={this.dom_scroller}>
        {this.props.children}
        { this.state.is_loading && this._loadMoreTpl() }
        <div className="scroll-pagination__spacer"/>
      </div>
    );

  }

}

ScrollPagination.defaultProps = {

  biqMethod: 'GET',
  biqScrollBottomSpace: 50,
  biqQueryParams: { limit: 'limit', offset: 'offset' },
  biqData: {},//Data to be post or get
  biqLimit: 10,
  responseField: 'data',
  onFetch: null,
  onFetched: null

};

export default connect(null) (ScrollPagination);