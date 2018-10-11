class biqHelperUtilClass {

  isNull(val) {
    try {
      return typeof val === 'undefined' || (typeof val === 'string' && val.trim() === '') || val === null || val.length === 0;
    } catch (e) {
      return true;
    }

  }

}

export { biqHelperUtilClass };

const biqHelperUtil = new biqHelperUtilClass();//only for import at current dir
export default biqHelperUtil;