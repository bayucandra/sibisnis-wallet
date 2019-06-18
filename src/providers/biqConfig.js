// import biqHelper from "../lib/biqHelper";
let path_arr = window.location.pathname.replace(/^\/|\/$/g, '').split( "/" );
path_arr.pop();
let path = path_arr.length > 0 ? path_arr.join("/") : '';

/*if ( biqHelper.utils.isNull( path ) ) {
  path = "/" + path;
}*/

let biqConfig = {};

biqConfig.protocol = window.location.protocol;
biqConfig.host = window.location.host;
biqConfig.folder = window.location.pathname.split('/')[1];
biqConfig.subdomain = window.location.hostname.split('.')[0];

biqConfig.url_base = `${biqConfig.protocol}//${biqConfig.host}`;
biqConfig.subdomain = window.location.hostname.split('.')[0];

biqConfig.rxAjaxOptions = {
  withCredentials: true
};

biqConfig.api = {
  url_base: `${biqConfig.protocol}//${biqConfig.host + path}`,
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


if ( process.env.NODE_ENV === 'development' || localStorage.getItem('pengembangan') === 'benar' ) {//TODO: !!!!!For development only, remove this conditional block at production stage
  // biqConfig.api.url_base = 'http://dealer.sibisnis.ml';
  // biqConfig.api.url_base = 'https://delaerfree.kitaon.ga';
  biqConfig.host = 'bukopin.kitaon.co.id';
  biqConfig.folder = 'wallet';
  biqConfig.api.url_base = 'https://bukopin.kitaon.co.id';
  biqConfig.api.data_package_name = {
    // 'Package-Name' : 'COM.ZON32080288.PPOB'
    // 'Package-Name' : 'COM.ZON50470939.PPOB'
    'Package-Name' : 'COM.ZON54363534.PPOB'
  };

  biqConfig.rxAjaxOptions = {
    ...biqConfig.rxAjaxOptions,
    crossDomain: true
  }
}

biqConfig.api.data_auth = Object.assign( {}, biqConfig.api.data_package_name, { csrf_token: biqConfig.api.csrf_token } );

export default biqConfig;
