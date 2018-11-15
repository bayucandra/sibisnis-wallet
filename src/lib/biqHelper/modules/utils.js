import $ from 'jquery';

import biqHelperString from "./string";

class biqHelperUtilsClass {

  click_timeout_list = {};//key is group name, default key is 'default' should clear on callback done ( whether error/success )

  isNull(val) {
    let json_is_empty = false;

    if ( typeof val === 'object' && !Array.isArray( val ) ) {
      try {
        json_is_empty = Object.keys(val).length === 0 && val.constructor === Object;
      } catch(e) {}
    }

    try {
      return typeof val === 'undefined' || (typeof val === 'string' && val.trim() === '') || val === null || val.length === 0 || json_is_empty;
    } catch (e) {
      return true;
    }

  }

  isNullAll( ...args ) {
    let is_null = false;
    for( let i =0; i< args.length; i++) {
      if ( this.isNull( args[i] ) ) {
        is_null = true;
        break;
      }
    }

    return is_null;
  }

  assignDefault( val, def = null ){
    val = !this.isNull(val) ? val : def;
    return val;
  }

  modalTopRatio( opt = { box_selector: '', top_space: 0, bottom_space: 0 } ) {

    if ( opt.box_selector === '' ) return 0;

    let screen_height = $(window).outerHeight();
    let box_el = $( opt.box_selector );

    if ( !box_el.length ) return 0;

    let box_outer_height = box_el.outerHeight();
    let vertical_space_left = screen_height - box_outer_height;

    let top_ratio = opt.top_space / ( opt.top_space + opt.bottom_space );

    let top_space = Math.ceil( top_ratio * vertical_space_left );
    return top_space;
  }

  urlParamsGet( sParam ) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  /**
   *
   * @param p_obj Can be object which will override `params` or just a function to call
   * @returns {{cancel: cancel}}
   */
  clickTimeout( p_obj ) {

    let params = {
      callback: null,
      bind: null,
      group: 'default',
      timeout: 250
    };

    if ( typeof p_obj === 'function' ) {
      params.callback = p_obj;
    } else {
      Object.assign( params, p_obj );
    }

    if ( typeof params.callback !== 'function') return;


    let timeout_obj = setTimeout( ()=> {
      try {
        if ( !this.isNull( params.bind ) ) params.callback.bind(params.bind)();
        else params.callback();
        clearTimeoutObj.bind(this)(timeout_obj);
      } catch (e) {
        console.error(`ERROR:: biqHelper.utils.clickTimeout(): ${e.message}`);
        clearTimeoutObj.bind(this)(timeout_obj);
      }
    }, params.timeout );

    if ( !this.click_timeout_list.hasOwnProperty(params.group) ) this.click_timeout_list[params.group] = [];
    this.click_timeout_list[params.group].push( timeout_obj );

    function clearTimeoutObj( p_timeout_ref ) {
      let idx = this.click_timeout_list[params.group].indexOf( p_timeout_ref );
      if ( idx !== -1 ) {
        this.click_timeout_list[params.group].splice( idx, 1 );
      }
    }

    function cancel() {
      clearTimeout( timeout_obj );
    }

    return {
      cancel: cancel
    };

  }

  clickTimeoutClear( group ) {
    if ( this.isNull(this.click_timeout_list) ) return;
    let click_timeout_list_arr = this.click_timeout_list[group];
    if ( this.isNull( click_timeout_list_arr ) ) return;

    for( let i=0; i<click_timeout_list_arr.length; i++ ) {
      let timeout_obj = click_timeout_list_arr[i];
      clearTimeout( timeout_obj );

      let idx = click_timeout_list_arr.indexOf( timeout_obj );
      if ( idx !== -1 ) {
        click_timeout_list_arr.splice( idx, 1 );
      }
    }
  }

  httpResponseIsError( key ){
    key = biqHelperString.toInt( key );
    return key >= 400 && key < 500;
  };

  httpResponseIsSuccess( key ){
    key = biqHelperString.toInt( key );
    return key >= 200 && key < 300;
  };

  numberFormat(input, prefix = '', opt = {}) {
    let params = {thousand_separator : '.', wrap_last_thousand: '' };

    Object.assign( params, opt );

    input = this.isNull( input ) ? 0 : input;
    let ret = prefix + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, params.thousand_separator);

    if ( params.wrap_last_thousand !== '' ) {
      let last_thousand_pos = ret.search( /(?:.(?!\d{3}))+$/ );
      let last_thousand = ret.substring( last_thousand_pos, ret.length );

      ret = [
        ret.replace( /(?:.(?!\d{3}))+$/,  '' ),
        last_thousand
      ]
    }

    return ret;
  }

  phoneDashFormat( input ) {

    if( typeof input === 'number') {
        input = input.toString();
    } else if( typeof input !== 'string') {
      return '';
    }

    let ret = '';

    let inc = 0;
    for ( let i=input.length - 1; i>=0; i-- ) {

      ret = input.substring( i, i+1 ) + ret;
      if( (inc + 1) % 4 === 0 && i !== 0 ) {
        ret = '-' + ret;
      }

      inc++;
    }

    return ret;

  }

}

export { biqHelperUtilsClass };

const biqHelperUtils = new biqHelperUtilsClass();//only for import at current dir
export default biqHelperUtils;