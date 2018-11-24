import $ from 'jquery';
import biqHelper from "../../../lib/biqHelper";

class AlertBoxes {

  config = {};
  className = 'biq-alert-box';
  wrapperId = null;
  data = [];

  constructor( p_obj ) {

    let params = {
      config: {
        parent_selector: 'body',
        align_selector: 'body',
        align_vertical: 'top',
        align_horizontal: 'right'
      }
    };

    Object.assign( params, p_obj );

    this.config = params.config;

  }

  add( p_obj ) {
    let params = {
      data: {
        type: 'error',
        title: 'Gagal',
        notice: ''
      }
    };

    this.data.push( params.data );

  }

  _nextId() {
    let wrapper_els = $(this.className);
    let max_idx = -1;
    for( let i=0; i<wrapper_els.length; i++ ) {
      let wrapper_el = $(wrapper_els[i]);
      let idx = wrapper_el.data( 'idx' );
      max_idx = idx > max_idx ? idx : max_idx;
    }

    return max_idx + 1;
  }

  render() {
    if ( biqHelper.utils.isNull(this.wrapperId) ) {

    }
  }

}

export default AlertBoxes;