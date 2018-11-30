import biqHelperUtils from "./utils";

class BiqHelperJQuery {

  init( $ ) {
    if ( biqHelperUtils.isNull( $ ) ) {
      console.error( 'JQuery not set' );
      return;
    }

    $.fn.biqHasScroll = function ( p_obj = {} ) {

      let params = { v_padding: 0, h_padding: 0 };

      Object.assign( params, p_obj );

      let ret = {
        x: false,
        y: false
      };

      let first_el = $(this[0]);

      if (!first_el.length) {
        return ret;
      }

      if ( ( first_el.get(0).scrollWidth - params.h_padding ) > first_el.width()) {
        ret.x = true;
      }

      if ( ( first_el.get(0).scrollHeight - params.v_padding ) > first_el.height() ) {
        ret.y = true;
      }

      return ret;
    };

    $.expr[":"].containsi = $.expr.createPseudo(function (arg) {
      return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
    });

  }

}

export { BiqHelperJQuery };