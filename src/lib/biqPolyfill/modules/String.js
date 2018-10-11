// eslint-disable-next-line
class biqPolyfillString {

    constructor() {
        this.trim();
    }

    trim() {
        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        }
    }

}

export default biqPolyfillString;