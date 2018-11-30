import {BiqHelperString} from "./modules/string";
import {BiqHelperLocalStorage} from "./modules/localStorage";
import {BiqHelperJSON} from "./modules/json";
import {BiqHelperUtils} from "./modules/utils";
import {BiqHelperMediaQuery} from "./modules/mediaQuery";
import {BiqHelperMoment} from "./modules/moment";
import {BiqHelperImage} from "./modules/image";
import {BiqHelperNumber} from "./modules/number";
import {BiqHelperJQuery} from "./modules/jquery";

class biqHelperClass {

  constructor() {
    this.string = new BiqHelperString();
    this.localStorage = new BiqHelperLocalStorage();
    this.JSON = new BiqHelperJSON();
    this.utils = new BiqHelperUtils();
    this.mediaQuery = new BiqHelperMediaQuery();
    this.moment = new BiqHelperMoment();
    this.image = new BiqHelperImage();
    this.number = new BiqHelperNumber();
    this.jquery = new BiqHelperJQuery();
  }

}

const biqHelper = new biqHelperClass();

export default biqHelper;