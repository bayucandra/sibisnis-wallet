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

  clear() {
    return localStorage.clear();
  }

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