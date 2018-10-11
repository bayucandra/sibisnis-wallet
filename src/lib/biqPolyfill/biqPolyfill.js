import biqPolyfillObject from './modules/Object';
import biqPolyfillString from './modules/String';

class biqPolyfill {

    constructor(){
        this.Object = new biqPolyfillObject();
        this.String = new biqPolyfillString();
    }

}

export default biqPolyfill;