import $ from 'jquery';

class biqHelperUtilsClass {

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

}

export { biqHelperUtilsClass };

const biqHelperUtils = new biqHelperUtilsClass();//only for import at current dir
export default biqHelperUtils;