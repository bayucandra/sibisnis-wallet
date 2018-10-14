import biqHelperJSON from "./json";

class biqHelperLocalStorageClass {

  set(key, value, prefix = '') {
    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    localStorage[key] = value;
    return localStorage[key];
  }

  get(key, defaultValue, prefix = '') {
    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    return localStorage[key] || defaultValue;
  }

  setObject(key, value, prefix = '') {
    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
  }

  getObject(key, value = {}, prefix = '') {
    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;

    return biqHelperJSON.parse(localStorage[key] || value);
  }

  clear( prefix = '') {
    try {

      if (prefix !== '') {

        for (var key in localStorage) {

          let key_split = key.split('.');
          let key_is_match = key === prefix + '.' + key_split[1];
          if (!key_is_match) continue;

          localStorage.removeItem(key);

        }//for key in localStorage

      } else {
        return localStorage.clear();
      }

    } catch( e ) {
      console.error( 'ERROR:: biqHelper.localStorange:' + e.message );
    }

  }//clear()

  remove(key, prefix='') {
    key = prefix !== ''
      ? prefix + '.' + key
      : '' + key;
    return localStorage.removeItem(key);
  }

}

export { biqHelperLocalStorageClass };

const biqHelperLocalStorage = new biqHelperLocalStorageClass();

export default biqHelperLocalStorage;