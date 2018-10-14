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

}

export { biqHelperUtilsClass };

const biqHelperUtils = new biqHelperUtilsClass();//only for import at current dir
export default biqHelperUtils;