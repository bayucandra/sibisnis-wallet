import biqHelperUtil from "./biqHelper/modules/util";
let path_arr = window.location.pathname.replace(/^\/|\/$/g, '').split( "/" );
path_arr.pop();
let path = path_arr.join("/");

if ( !biqHelperUtil.isNull( path ) ) {
  path = "/" + path;
}
let api_url_base = window.location.protocol + '//' + window.location.host + path ;
let data_package_name = {};

if ( window.location.hostname.search( 'newzonatik.com' ) !== -1
  || window.location.hostname === 'webagen-dev.sibisnis.com'
) {//TODO: For development only, remove this conditional block at production stage
  api_url_base = 'https://webagen.dev.sibisnis.com';
  data_package_name = {
    'Package-Name' : 'COM.ZON32080288.PPOB'
  };
}

let biqConfig = {};

biqConfig.api = {
  url_base: api_url_base,
  data_package_name: data_package_name
};

biqConfig.local_storage_key = {
  user_data : 'user_data', //Store user data got from API login
  is_logged_in : 'is_logged_in',
  product_all: 'product_all',
  page_last_state: 'page_last_state'// contain JSON { state: '', data:{ json: data} }
};

export default biqConfig;