import biqHelperUtil from "./util";
class biqHelperJSONClass {

  parse(val) {
    let ret = {};

    if (!biqHelperUtil.isNull(val)) {

      switch (typeof val) {

        case 'object':
          ret = Object.assign({}, val);
          break;

        case 'string':
          try {
            ret = JSON.parse(val);
          } catch (e) {
            console.error(e.message);
          }
          break;
        default:
          ret = {};

      }

    }

    return ret;

  }//parse()

}

export { biqHelperJSONClass }

const biqHelperJSON = new biqHelperJSONClass();
export default biqHelperJSON;