import biqHelperUtils from "./utils";
import biqHelperJSON from "./json";
import biqHelperString from "./string";

class biqHelperLocalStorageClass {

  setPrefixDefault( prefix ) {
    if ( biqHelperUtils.isNull( prefix ) ) return;
    localStorage.prefix = prefix;
  }

  getPrefixDefault(){
    let prefix = localStorage.prefix;
    return !biqHelperUtils.isNull( prefix ) ? prefix : '';
  }

  set(key, value, prefix = '') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    value = typeof value === 'object' ? JSON.stringify( value ) : value;
    localStorage[key] = value;
    return localStorage[key];
  }

  get(key, defaultValue = '', prefix = '') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    return localStorage[key] || defaultValue;
  }

  setObject(key, value, prefix = '') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
  }

  getObject(key, value = {}, prefix = '') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;

    return biqHelperJSON.parse(localStorage[key] || value);
  }

  clear( prefix = '') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    try {

      if (prefix !== '') {

        for (var key in localStorage) {

          let key_split = key.split('.');
          let key_is_match = key === prefix + '.' + key_split[1];
          if (!key_is_match) continue;

          localStorage.removeItem(key);

        }//for key in localStorage

        localStorage.removeItem('prefix');

      } else {
        return localStorage.clear();
      }

    } catch( e ) {
      console.error( 'ERROR:: biqHelper.localStorange:' + e.message );
    }

  }//clear()

  remove(key, prefix='') {
    let prefix_default = this.getPrefixDefault();
    prefix = !biqHelperUtils.isNull( prefix )
      ? prefix
      : prefix_default !== '' ? prefix_default : '';

    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    return localStorage.removeItem(key);
  }

}

export { biqHelperLocalStorageClass };

const biqHelperLocalStorage = new biqHelperLocalStorageClass();

export default biqHelperLocalStorage;