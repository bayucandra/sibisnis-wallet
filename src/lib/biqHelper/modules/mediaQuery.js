import $ from 'jquery';

const $bpMobileFirst = {sm: 576, md: 768, lg: 992, xl: 1200};

class biqHelperMediaQueryClass {

  query() {
    let result = 'xs';
    let screen_width = $(window).outerWidth();
    if(screen_width < $bpMobileFirst.sm){
      result = 'xs';
    }else if( screen_width < $bpMobileFirst.md ){
      result = 'sm';
    }else if( screen_width < $bpMobileFirst.lg ){
      result = 'md';
    }else if( screen_width < $bpMobileFirst.xl ){
      result = 'lg';
    }else if( screen_width >= $bpMobileFirst.xl ){
      result = 'xl';
    }
    return result;
  }//query()

  screenMatch(){
    if (arguments.length === 0) {
      console.error('Must supply at least 1 screen break point');
      return;
    }
    let breakpoints_arr = [];

    for ( let i=0; i<arguments.length; i++ ) {
      let argument = arguments[i].trim();
      breakpoints_arr.push(argument);
    }

    let breakpoint_curr = this.query();
    for ( let i=0; i < breakpoints_arr.length; i++ ) {
      if ( breakpoints_arr[i] === breakpoint_curr ) {
        return true;
      }
    }
    return false;
  }

  isMobile() {
    let screen_breakpoint = this.query();
    return (screen_breakpoint==='xs') || (screen_breakpoint==='sm');
  }

  isTablet() {
    let screen_breakpoint = this.query();
    return screen_breakpoint === 'md';
  }

  isDesktop() {
    let screen_breakpoint = this.query();

    return (screen_breakpoint==='lg') || (screen_breakpoint==='xl');
  }

}//class

export {biqHelperMediaQueryClass};

const biqHelperMediaQuery = new biqHelperMediaQueryClass();

export default  biqHelperMediaQuery;
