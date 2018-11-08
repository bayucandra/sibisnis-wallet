import { Observable } from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import { map, share } from 'rxjs/operators'
import biqConfig from "./biqConfig";
import biqHelper from "../lib/biqHelper";


class WalletProvider {

  depositStatusFetch$ = rxAjax({
    url: `${biqConfig.api.url_base}/api/wallet/list_deposit_status`,
    method: 'POST',
    crossDomain: true,
    withCredentials: true,
    body: Object.assign( {}, biqConfig.api.data_auth )
  })
    .pipe(
      map(e => e.response),
      share()
    );

  depositStatus$() {
    return Observable.create( observer => {
      let ls_key = biqConfig.local_storage_key.wallet_deposit;
      let deposit_ls = biqHelper.localStorage.getObject( ls_key );

      if ( biqHelper.utils.isNull( deposit_ls ) ) {
        this.depositStatusFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( ls_key, data.data );

            observer.next( data.data );
          }
        );
      } else {
        observer.next( deposit_ls );
      }
      observer.complete();

    } );
  }

  depositStatusGet( id ) {

    id = typeof id === 'number' ? id.toString() : id;

    let ls_key = biqConfig.local_storage_key.wallet_deposit;
    let deposit_ls = biqHelper.localStorage.getObject( ls_key )

    if ( biqHelper.utils.isNull(deposit_ls) ) return {};

    let ret = '-';
    for( let key in deposit_ls ){
      if ( key === id ) ret = deposit_ls[key];
    }

    return ret;


  }

  bankListFetch$ = rxAjax({
    url: `${biqConfig.api.url_base}/api/wallet/list_bank`,
    method: 'POST',
    crossDomain: true,
    withCredentials: true,
    body: Object.assign( {}, biqConfig.api.data_auth )
  })
    .pipe(
      map(e => e.response),
      share()
    );

  bankList$() {
    return Observable.create( observer => {
      let ls_key = biqConfig.local_storage_key.wallet_bank_list;
      let bank_list_ls = biqHelper.localStorage.getObject( ls_key );

      if ( biqHelper.utils.isNull( bank_list_ls ) ) {
        this.bankListFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( ls_key, data.data );

            observer.next( data.data );
          }
        );
      } else {
        observer.next( bank_list_ls );
      }
      observer.complete();

    } );
  }

  bankByMethodAbreviation( abreviation ) {

    let ls_key = biqConfig.local_storage_key.wallet_bank_list;
    let bank_list_ls = biqHelper.localStorage.getObject( ls_key );

    if ( biqHelper.utils.isNull(bank_list_ls) ) return {};

    let ret = bank_list_ls.filter( el =>{
      if ( el.payment_method === abreviation ) {
        return true;
      }
      return false;
    });
    return ret.length === 1 ? ret [0] : {};
  }

}

const walletProvider = new WalletProvider();

export default walletProvider;