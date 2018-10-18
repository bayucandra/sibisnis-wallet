import {biqHelperStringClass} from "./modules/string";
import {biqHelperLocalStorageClass} from "./modules/localStorage";
import {biqHelperJSONClass} from "./modules/json";
import {biqHelperUtilsClass} from "./modules/utils";
import {biqHelperMediaQueryClass} from "./modules/mediaQuery";

class biqHelperClass {

  constructor() {
    this.string = new biqHelperStringClass();
    this.localStorage = new biqHelperLocalStorageClass();
    this.JSON = new biqHelperJSONClass();
    this.utils = new biqHelperUtilsClass();
    this.mediaQuery = new biqHelperMediaQueryClass();
  }

}

const biqHelper = new biqHelperClass();

export default biqHelper;