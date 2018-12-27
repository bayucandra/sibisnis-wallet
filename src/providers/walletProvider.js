import { Observable } from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import { map, share } from 'rxjs/operators'
import biqConfig from "./biqConfig";
import biqHelper from "../lib/biqHelper";

import icMandiriMain from "../images/icons/payment/mandiri-1@3x.png";
import icBniMain from "../images/icons/payment/bni-1@3x.png";
import icBcaMain from "../images/icons/payment/bca-1@3x.png";
import icBriMain from "../images/icons/payment/bri-1@3x.png";


class WalletProvider {

  paymentStatusFetch$ = rxAjax({
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

  paymentStatus$() {
    return Observable.create( observer => {
      let ls_key = biqConfig.local_storage_key.wallet_payment_status;
      let deposit_ls = biqHelper.localStorage.getObject( ls_key );

      if ( biqHelper.utils.isNull( deposit_ls ) ) {
        this.paymentStatusFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( ls_key, data.data );

            observer.next( data.data );
            observer.complete();
          }
        );
      } else {
        observer.next( deposit_ls )
        observer.complete();
      }

    } );
  }

  paymentStatusGet( id ) {

    id = typeof id === 'number' ? id.toString() : id;

    let ls_key = biqConfig.local_storage_key.wallet_payment_status;
    let deposit_ls = biqHelper.localStorage.getObject( ls_key );

    if ( biqHelper.utils.isNull(deposit_ls) ) return {};

    let ret = '-';
    for( let key in deposit_ls ){
      if ( key === id ) ret = deposit_ls[key];
    }

    return ret;


  }

  bankIcons = {
    'mandiri-1' : icMandiriMain,
    'bni-1' : icBniMain,
    'bca-1' : icBcaMain,
    'bri-1' : icBriMain
  };

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
            let bank_list_data = data.data.map( ( el )=>{
              let icons = {};
              switch( el.payment_method ) {
                case 'bank-tf-mandiri':
                  icons = {
                    main: { name: 'mandiri-1', size_default: [ 51, 27 ], size_topup_select: [51, 27] }
                  };
                  break;
                case 'bank-tf-bni':
                  icons = {
                    main: { name: 'bni-1', size_default: [43,13], size_topup_select: [43, 13] }
                  };
                  break;
                case 'bank-tf-bca':
                  icons = {
                    main: { name: 'bca-1', size_default: [41,13], size_topup_select: [41, 13] }
                  };
                  break;
                case 'bank-tf-bri':
                  icons = {
                    main: { name: 'bri-1', size_default: [60,14], size_topup_select: [60, 14] }
                  };
                  break;
                default:
              }

              el.icons = icons;
              return el;
            } );
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( ls_key, bank_list_data );

            observer.next( data.data );
            observer.complete();
          }
        );
      } else {
        observer.next( bank_list_ls );
        observer.complete();
      }

    } );
  }

  bankListGet() {
    let ls_key = biqConfig.local_storage_key.wallet_bank_list;
    let bank_list_ls = biqHelper.localStorage.getObject( ls_key );

    if ( biqHelper.utils.isNull(bank_list_ls) ) return [];

    return bank_list_ls;
  }

  bankByMethodAbreviation( abbreviation ) {

    let bank_list = this.bankListGet();

    let ret = bank_list.filter( el =>{
      if ( el.payment_method === abbreviation.trim() ) {
        return true;
      }
      return false;
    });
    return ret.length === 1 ? ret[0] : {};
  }

  bankIconGet( abbreviation, type ) {
    let bank_record = this.bankByMethodAbreviation( abbreviation );

    if ( biqHelper.JSON.pathIsNull( bank_record, `icons.${type}` ) ) return null;

    return this.bankIcons[ bank_record.icons[type].name ];
  }

}

const walletProvider = new WalletProvider();

export default walletProvider;