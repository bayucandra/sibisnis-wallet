import {biqHelperLocalStorageClass} from "./modules/localStorage";
import {biqHelperJSONClass} from "./modules/json";
import {biqHelperUtilClass} from "./modules/util";

class biqHelperClass {

  constructor() {
    this.localStorage = new biqHelperLocalStorageClass();
    this.JSON = new biqHelperJSONClass();
    this.util = new biqHelperUtilClass();
  }

}

const biqHelper = new biqHelperClass();

export default biqHelper;