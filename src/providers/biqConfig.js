import biqHelperUtils from "../lib/biqHelper/modules/utils";
let path_arr = window.location.pathname.replace(/^\/|\/$/g, '').split( "/" );
path_arr.pop();
let path = path_arr.join("/");

if ( !biqHelperUtils.isNull( path ) ) {
  path = "/" + path;
}

let biqConfig = {};

biqConfig.url_base = `${window.location.protocol}//${window.location.host}`;

biqConfig.api = {
  url_base: `${window.location.protocol}//${window.location.host + path}`,
  data_package_name: {}
};

biqConfig.local_storage_key = {
  user_data : 'user_data', //Store user data got from API login
  is_logged_in : 'is_logged_in',
  product_all: 'product_all',
  page_last_state: 'page_last_state',// contain JSON { state: '', data:{ json: data} }
  address_provinsi: 'address_provinsi',
  address_kabupaten: 'address_kabupaten',
  address_kecamatan: 'address_kecamatan'
};

biqConfig.agen = {
  url_base:  `${biqConfig.url_base}/agen`
};

biqConfig.profile_photo_url_base = `${biqConfig.url_base}/assets/user_profile`;


if ( window.location.hostname === 'newzonatik.com' && window.location.protocol.search('https') === -1
  || window.location.hostname === 'webagen-dev.sibisnis.com'
) {//TODO: For development only, remove this conditional block at production stage
  biqConfig.api.url_base = 'https://dealer.sibisnis.ml';
  biqConfig.api.data_package_name = {
    'Package-Name' : 'COM.ZON32080288.PPOB'
  };

  biqConfig.profile_photo_url_base = `${biqConfig.api.url_base}/assets/user_profile`;
}

export default biqConfig;