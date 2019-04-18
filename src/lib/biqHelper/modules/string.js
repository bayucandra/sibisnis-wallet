import biqHelperUtils from "./utils";
class BiqHelperString {

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

  toFloat( str ){
    try {
      return typeof str === 'string' ? parseFloat( str ) : str;
    } catch( e ) {
      return 0;
    }
  }

}

export { BiqHelperString };

const biqHelperString = new BiqHelperString();

export default biqHelperString;
