/**
 * Event source Provider
 */

import biqConfig from "../providers/biqConfig";
import biqHelper from "../lib/biqHelper";
// import 'event-source-polyfill';//TODO: Decide to implement later with backend or use pure eventSource

class EsProvider {

  constructor() {
    this.state = {
      es: null,
      pending_listeners: []
    };
  }

  init(){
    let url = biqConfig.api.url_base + '/api/SSE';
    this.state.es = new EventSource( url, { withCredentials: biqConfig.rxAjaxOptions.withCredentials } );

    if ( this.state.pending_listeners.length > 0 ) {
      this.state.pending_listeners.forEach( function( e ){
        this.state.es.addEventListener( e.type, e.handler );
      } );
      this.state.pending_listeners = [];
    }
  }

  addEventListener( type, handler ) {
    if ( biqHelper.utils.isNull( this.state.es ) ) {
      this.pendingListenerAdd( type, handler );
    } else {
      this.state.es.addEventListener( type, handler );
    }
  }

  pendingListenerAdd( type, handler ) {
    this.state.pending_listeners.push( { type: type, handler: handler } );
  }

}

const esProvider = new EsProvider();

export default esProvider;
