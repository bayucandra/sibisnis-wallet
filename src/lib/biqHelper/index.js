import {biqHelperLocalStorageClass} from "./modules/localStorage";
import {biqHelperJSONClass} from "./modules/json";
import {biqHelperUtilsClass} from "./modules/utils";

class biqHelperClass {

  constructor() {
    this.localStorage = new biqHelperLocalStorageClass();
    this.JSON = new biqHelperJSONClass();
    this.utils = new biqHelperUtilsClass();
  }

}

const biqHelper = new biqHelperClass();

export default biqHelper;