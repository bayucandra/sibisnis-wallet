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

  deposit$() {
    return Observable.create( observer => {
      let ls_key = biqConfig.local_storage_key.wallet_deposit;
      let deposit_ls = biqHelper.localStorage.getObject( ls_key );

      if ( biqHelper.utils.isNull( deposit_ls ) ) {
        this.depositStatusFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( ls_key, data.data );

            observer.next( data.data );
            observer.complete();
          }
        );
      } else {
        observer.next( deposit_ls );
      }

    } );
  }

}

const walletProvider = new WalletProvider();

export default walletProvider;