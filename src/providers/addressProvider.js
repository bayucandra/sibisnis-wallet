import { Observable } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { map, share, publishReplay, refCount } from 'rxjs/operators';
import biqConfig from "./biqConfig";
import biqHelper from "../lib/biqHelper";

class AddressProvider {

  provinsiFetch$ = rxAjax({
      url: `${biqConfig.api.url_base}/api/address/provinsi`,
      method: 'POST',
    ...biqConfig.rxAjaxOptions,
      body: Object.assign(
        {},
        biqConfig.api.data_auth,
        biqHelper.utils.csrfGet()
      )
    })
      .pipe(
        map((e) => e.response),
        share()
      );//provinsiFetch$

  provinsi$(){
    return Observable.create( observer =>{
      let provinsi_ls = biqHelper.localStorage.getObject( biqConfig.local_storage_key.address_provinsi );

      if ( biqHelper.utils.isNull( provinsi_ls ) ) {
        this.provinsiFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') ) biqHelper.localStorage.set( biqConfig.local_storage_key.address_provinsi, data.data );

            observer.next( data.data );
            observer.complete();
          }
        );
      } else {
        observer.next( provinsi_ls );
        observer.complete();
      }


    } );
  }//provinsi$()

  kabupatenFetch$ = rxAjax({
    url: `${biqConfig.api.url_base}/api/address/kota_kab`,
    method: 'POST',
    ...biqConfig.rxAjaxOptions,
    body: Object.assign(
      { id_provinsi: 'all' },
      biqConfig.api.data_auth,
      biqHelper.utils.csrfGet()
    )
  })
    .pipe(
      map((e) => e.response),
      share()
    );//kabupatenFetch$

  kabupaten$(){
    return Observable.create( observer =>{
      let kabupaten_ls = biqHelper.localStorage.getObject( biqConfig.local_storage_key.address_kabupaten );

      if ( biqHelper.utils.isNull( kabupaten_ls ) ) {
        this.kabupatenFetch$.subscribe(
          data => {
            if ( data.hasOwnProperty('data') )  biqHelper.localStorage.set( biqConfig.local_storage_key.address_kabupaten, data.data );

            observer.next( data.data );
            observer.complete();
          }
        );
      } else {
        observer.next( kabupaten_ls );
        observer.complete();
      }

    } );
  }//kabupaten$()

  kecamatanFetch$ = rxAjax({
    url: biqConfig.api.url_base + '/api/address/kecamatan',
    method: 'POST',
    ...biqConfig.rxAjaxOptions,
    body: Object.assign(
      { id_kotakab: 'all' },
      biqConfig.api.data_auth,
      biqHelper.utils.csrfGet()
    )
  })
    .pipe(
      map((e) => e.response),
      publishReplay(1),
      refCount()
    );//kecamatanFetch$

  kecamatan$(){
    return Observable.create( observer =>{

      this.kecamatanFetch$.subscribe(
        data => {

          observer.next( data.data );
          observer.complete();
        }
      );

    } );
  }//kecamatan$()

  kelurahanFetch$ = id_kecamatan => {
    return rxAjax({
      url: biqConfig.api.url_base + '/api/address/kelurahan',
      method: 'POST',
      ...biqConfig.rxAjaxOptions,
      body: Object.assign(
        {id_kecamatan: id_kecamatan},
        biqConfig.api.data_auth,
        biqHelper.utils.csrfGet()
      )
    })
      .pipe(
        map( e => e.response),
        share()
      );//kelurahanFetch$
  }

}

const addressProvider = new AddressProvider();

export default addressProvider;
