// import biqHelper from "../lib/biqHelper";
let path_arr = window.location.pathname.replace(/^\/|\/$/g, '').split( "/" );
path_arr.pop();
let path = path_arr.length > 0 ? path_arr.join("/") : '';

/*if ( biqHelper.utils.isNull( path ) ) {
  path = "/" + path;
}*/

let biqConfig = {};

biqConfig.url_base = `${window.location.protocol}//${window.location.host}`;

biqConfig.api = {
  url_base: `${window.location.protocol}//${window.location.host + path}`,
  data_package_name: {},
  csrf_token: Date.now(),
  error_response_fake: {
    response_code: { status: 400, message: 'Ada masalah koneksi, harap periksa koneksi internet anda.'}
  }
};


biqConfig.local_storage_key = {
  user_data : 'user_data', //Store user data got from API login
  is_logged_in : 'is_logged_in',
  product_all: 'product_all',
  page_last_state: 'page_last_state',// contain JSON { state: '', data:{ json: data} }
  address_provinsi: 'address_provinsi',
  address_kabupaten: 'address_kabupaten',
  wallet_payment_status: 'wallet_payment_status',
  wallet_bank_list: 'wallet_bank_list'
};

biqConfig.agen = {
  url_base:  `${biqConfig.url_base}/agen`
};


if ( process.env.NODE_ENV === 'development' || localStorage.getItem('pengembangan') === 'benar' ) {//TODO: !!!!!For development only, remove this conditional block at production stage
  biqConfig.api.url_base = 'https://dealer.sibisnis.ml';
  biqConfig.api.data_package_name = {
    'Package-Name' : 'COM.ZON32080288.PPOB'
  };
}

biqConfig.api.data_auth = Object.assign( {}, biqConfig.api.data_package_name, { csrf_token: biqConfig.api.csrf_token } );

export default biqConfig;