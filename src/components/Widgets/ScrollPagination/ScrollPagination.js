import React, {Component} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Subject, of } from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {catchError, takeUntil} from 'rxjs/operators';
import biqHelper from "../../../lib/biqHelper";

class ScrollPagination extends Component{

  state = {
    is_loading: false,
    has_scroll: false
  };

  _scroll_state = {
    page_current: 0,
    end_of_page: false
  };

  dom_scroller = React.createRef();

  _stop$ = new Subject();
  _is_prop_valid = true;

  _config = {
    method: 'GET',
    scroll_bottom_space: 50,
    query_params: { limit: 'limit', offset: 'offset' },
    data: {},//Data to be post or get
    null_check_reinit: {},//reinitializing on value changes to the props attached
    limit: 10,
    response_field: 'data'
  };

  _data = [];

  _onScroll = e => {
    if ( !this._is_prop_valid ) {
      console.error( 'Error: missing required props' );
      return;
    }

    if ( this.state.is_loading ) return;

    let wrapper_el = $(e.target);
    let should_load_more = wrapper_el.scrollTop() + wrapper_el.height() >= (wrapper_el[0].scrollHeight - this._config.scroll_bottom_space);

    if ( should_load_more ) this.loadMore();

  };

  loadMore = () => {

    if ( this.state.is_loading || this.state.end_of_page ) return;

    this._scroll_state.page_current++;

    let data = {};
    data[this._config.query_params.limit] = this._config.limit;
    data[this._config.query_params.offset] = (this._scroll_state.page_current - 1) * this._config.limit;

    Object.assign(data, this._config.data);

    let ajax$ = rxAjax({
      url: this._config.url,
      method: this._config.method,
      crossDomain: true,
      withCredentials: true,
      body: data
    });

    this.setState({ is_loading: true }, () => {
      if ( typeof this.props.onFetch === 'function' ) this.props.onFetch();
    });

    ajax$
      .pipe(
        takeUntil(this._stop$),
        catchError(err => of(err.xhr))
      )
      .subscribe(res=>{

        if ( biqHelper.utils.httpResponseIsSuccess( res.status ) ) {

          let res_data = res.response[ this._config.response_field ];

          if ( res_data.length === 0 ) this.setState( {end_of_page: true} );

          this.setState( { is_loading: false }, () => {
            this._data = this._data.concat( res_data );
            if ( typeof this.props.onFetched === 'function' ) this.props.onFetched( {
              data_all: this._data,
              data_current: res_data,
              status_current: res.status
            } );
          } );

        }

        if ( biqHelper.utils.httpResponseIsError( res.status ) ) {
          this._scroll_state.page_current--;
          this.setState( { is_loading: false } );
        }

      });
  };

  stop = () => {
    this._stop$.next();
    this._stop$.complete();
  };

  _loadMoreTpl = () => {
    return (
      <div className="c-loading-indicator" style={{marginBottom: '-50px', position: 'relative', padding: '15px 0'}}>
        <div className="c-loading-indicator__circle"/>
      </div>
    )
  };

  componentDidMount() {
    const required_props = [ 'url' ];

    let is_valid = true;

    if ( biqHelper.utils.isNull( this.props.biqConfig ) ) {
      is_valid = false;
      console.error('Error: Config not found');
    }

    for( let i=0; i < required_props.length; i++ ) {
      let required_prop = required_props[i];
      if ( !this.props.biqConfig.hasOwnProperty( required_prop ) ) is_valid = false;
    }

    if ( !is_valid ) {

      this._is_prop_valid = false;
      console.error( 'Error: Missing required props!!!' );

    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if( this._is_prop_valid ){

      Object.assign(this._config, this.props.biqConfig);

      // if ( this.props.hasOwnProperty( 'biqApi' ) ) this.props.biqApi
    }

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

  render() {

    return (
      <div className={`${this.props.className}${ this.state.has_scroll ? ' has-scroll' : '' }`} onScroll={this._onScroll} ref={this.dom_scroller}>
        {this.props.children}
        { this.state.is_loading && this._loadMoreTpl() }
        <div style={{height:'50px', width: '100%'}}/>
      </div>
    );

  }

}

export default ScrollPagination;