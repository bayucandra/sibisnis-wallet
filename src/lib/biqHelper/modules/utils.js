import {interval} from 'rxjs';

import $ from 'jquery';

import biqHelperString from "./string";

class BiqHelperUtils {

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

  isNullSome( ...args ) {
    let is_null = false;
    for( let i =0; i< args.length; i++) {
      if ( this.isNull( args[i] ) ) {
        is_null = true;
        break;
      }
    }

    return is_null;
  }

  isNullAll( ...args ) {
    let is_null = true;
    for( let i =0; i< args.length; i++) {
      if ( !this.isNull( args[i] ) ) {
        is_null = false;
        break;
      }
    }

    return is_null;
  }

  untillNotNull( p_obj ) {
    let params = {
      val: null,
      callback: null,
      callback_params: null,
      limit: 100
    };

    params = p_obj;//Pass by reference not using Object.assign
    if ( !params.hasOwnProperty('limit') ) params.limit = 100;

    let interval$ = interval( 100 );
    let repeat = 0;
    let interval_subscribe = interval$.subscribe( () => {
      if ( !this.isNull( params.val ) || repeat === params.limit ) {
        params.callback( params.callback_params );
        interval_subscribe.unsubscribe();
      }
      repeat++;
    } );

  }

  assignDefault( val, def = null ){
    val = !this.isNull(val) ? val : def;
    return val;
  }

  modalTopRatio( opt = { box_selector: '', box_el: null, top_space: 0, bottom_space: 0 } ) {

    if ( opt.box_selector === '' && !opt.box_el instanceof $ ) return 0;

    let screen_height = $(window).outerHeight();
    let box_el = null;

    if ( opt.box_el !== null && opt.box_el instanceof $) {
      box_el = opt.box_el;
    } else {
      box_el = $( opt.box_selector );
    }

    if ( !box_el.length ) return 0;

    let box_outer_height = box_el.outerHeight();
    let vertical_space_left = screen_height - box_outer_height;

    let top_ratio = opt.top_space / ( opt.top_space + opt.bottom_space );

    let top_space = Math.ceil( top_ratio * vertical_space_left );
    return top_space;
  }

  browserDetect( ua_str ) {
    let browser = 'Unknown';

    try {
      let ua = ua_str.match(/(opera|chrome|safari|firefox|msie|postmanruntime)\/?\s*(\.?\d+(\.\d+)*)/i);

      if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        browser = "msie";
      } else {
        browser = ua[1];
      }
    } catch( e ) {
      console.error( `There was error when detecting browser: ${e.message}` );
      console.warn( `User-Agent: : ${ua_str}` );
    }

    return browser;
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
    if ( this.isNull( key ) ) return false;

    key = biqHelperString.toInt( key );
    return key >= 400 && key < 600;
  };

  httpResponseIsSuccess( key ){
    if ( this.isNull( key ) ) return false;

    key = biqHelperString.toInt( key );
    return key >= 200 && key < 300;
  };

  numberFormat(input, prefix = '', opt = {}) {
    let params = {thousand_separator : '.', split_last_thousand: false };

    Object.assign( params, opt );

    input = this.isNull( input ) ? 0 : input;
    let ret = prefix + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, params.thousand_separator);

    if ( params.split_last_thousand === true ) {
      let last_thousand_pos = ret.search( /(?:.(?!\d{3}))+$/ );
      let last_thousand = ret.substring( last_thousand_pos, ret.length );

      ret = [
        ret.replace( /(?:.(?!\d{3}))+$/,  '' ),
        last_thousand
      ]
    }

    return ret;
  }

  dataURIToBlob(dataURI) {
    dataURI = dataURI.replace(/^data:/, '');

    const type = dataURI.match(/image\/[^;]+/);
    const base64 = dataURI.replace(/^[^,]+,/, '');
    const arrayBuffer = new ArrayBuffer(base64.length);
    const typedArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64.length; i++) {
      typedArray[i] = base64.charCodeAt(i);
    }

    return new Blob([arrayBuffer], {type});
  }

  objectIs(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      // eslint-disable-next-line
      return x !== x && y !== y;
    }
  };

  passwordTest( p_obj ){
    let ret = {
      has_number: { value: false, label: 'Angka' },
      has_lower_case: { value: false, label: 'Huruf Kecil' },
      has_upper_case: { value: false, label: 'Huruf Besar' },
      has_special_char: { value: false, label: 'Karakter' },
      is_valid_min_length: { value: false, label: 'Minimal 8 karakter' }
    };

    let params = {
      val: '',
      min_length: 8
    };

    Object.assign( params, p_obj );

    let password = params.val;

    ret.has_number.value = /\d/.test( password );
    ret.has_lower_case.value = /[a-z]/.test( password );
    ret.has_upper_case.value = /[A-Z]/.test( password );
    // eslint-disable-next-line
    ret.has_special_char.value = /[~!@#\$%\^&\*_\-\+=`\|\(\)\{\}\[\]:;"'<>,\.\?\/\\]/.test( password );
    ret.is_valid_min_length.value = password.length >= params.min_length;
    ret.is_valid_min_length.label = `Minimal ${params.min_length} karakter`;

    return ret;

  };

  arrayGen( number ) {

    let ret = [];

    for( let i = 0; i<number; i++ ) {
      ret.push( i );
    }

    return ret;

  }

}//class BiqHelperUtils

export { BiqHelperUtils };

const biqHelperUtils = new BiqHelperUtils();//only for import at current dir
export default biqHelperUtils;