import biqHelperUtils from "./utils";
class biqHelperStringClass {

  capitalize( input ){
    let str = biqHelperUtils.isNull( input ) ? '' : input;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  toInt( str ){
    try {
      return typeof str === 'string' ? parseInt( str ) : str;
    } catch( e ) {
      return 0;
    }
  }

}

export { biqHelperStringClass };

const biqHelperString = new biqHelperStringClass();

export default biqHelperString;
