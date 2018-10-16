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

    console.log( screen_height + ' ' + box_outer_height + ' ' + vertical_space_left + ' ' + top_ratio );

    let top_space = Math.ceil( top_ratio * vertical_space_left );
    return top_space;
  }

}

export { biqHelperUtilsClass };

const biqHelperUtils = new biqHelperUtilsClass();//only for import at current dir
export default biqHelperUtils;