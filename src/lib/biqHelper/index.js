import {BiqHelperStringClass} from "./modules/string";
import {BiqHelperLocalStorageClass} from "./modules/localStorage";
import {BiqHelperJSONClass} from "./modules/json";
import {BiqHelperUtilsClass} from "./modules/utils";
import {BiqHelperMediaQueryClass} from "./modules/mediaQuery";
import {BiqHelperMomentClass} from "./modules/moment";
import {BiqHelperImageClass} from "./modules/image";

class biqHelperClass {

  constructor() {
    this.string = new BiqHelperStringClass();
    this.localStorage = new BiqHelperLocalStorageClass();
    this.JSON = new BiqHelperJSONClass();
    this.utils = new BiqHelperUtilsClass();
    this.mediaQuery = new BiqHelperMediaQueryClass();
    this.moment = new BiqHelperMomentClass();
    this.image = new BiqHelperImageClass();
  }

}

const biqHelper = new biqHelperClass();

export default biqHelper;