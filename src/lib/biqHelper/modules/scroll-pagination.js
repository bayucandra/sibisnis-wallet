class BiqHelperScrollPagination {

  constructor( p_obj ) {
    let mandatory_params = ['url', 'ng_scope_selector', 'scroll_container_selector'];
    let unmeet_mandatory_params = [];
    for ( let i = 0; i < mandatory_params.length; i++ ) {
      if (!p_obj.hasOwnProperty(mandatory_params[i])) {
        unmeet_mandatory_params.push(mandatory_params[i]);
      }
    }
    if (unmeet_mandatory_params.length > 0) {
      console.error('Mandatory params required are: ' + unmeet_mandatory_params.join(' '));
      return;
    }

    this.config = {
      url: '',
      type: 'GET',
      data: {},
      data_map: null,//Function of javascript array map
      server_params_name: {start: 'start', length: 'length'},//This is will be appended as 'GET' params to the 'url'
      buffer_next_page: 5,
      page_length: 12,
      render_first_page_immediately: true,
      scroll_bottom_space: 50, //To detect dinstance in px from the end of window ( scrolling area ). So it will do pagination before scroll reach end of window based on this distance
      response_key: 'data',//String or array
      ng_scope_selector: null, //jQuery selector to get Angular scope ( Based on DOM Element )
      // ng_model : null,//Angular variable scope to inject
      scroll_container_selector: '' // Scroller wrapper which has the scroll bar
      // , scroll_container_maintain: true // Maintain or not last scroll position when success loading
      // , loading_delay: 200//Delay timeout to show loading indicator (when visitor have slow connection )
    };
    this.angularServices = {};
    this.angularServices.$q = angular.element('html').injector().get('$q');
    Object.assign(this.config, p_obj);
    this.data = [];//Page Data shown on current page ( not buffered one )
    this.buffer = [];//contain page collection in format {"page_number":int, "data":JSON}
    this.state = {};

    this._eventHanldersBindScope();

  }//constructor()



  resetState() {
    let state_default = {
      last_scroll_top: 0,
      page_current: -1,//page start from 0
      end_of_page: false,
      initialized: false,
      rendering: -1,//Rendering page number, null when nothing
      buffering: -1,//Buffering page number, null when nothing
      pending_scroll: -1//When user scrolling but there is buffering or any loadMore() procedure then it will load one next at the last of loadMore()
    };

    Object.assign( this.state, state_default );
  }

  init(p_obj) {
    p_obj = typeof p_obj === 'undefined' ? {} : p_obj;
    Object.assign(this.config, p_obj);

    this.resetState();
    //BEGIN scroll event handling=========
    // scroll_container_el.on('scroll', this._onscrollPagination);
    this.bindOnScrollPagination();
    let load_more_params = {
      render_immediately: this.config.render_first_page_immediately,
      recursive: {page_current: this.state.page_current, left: this.config.buffer_next_page}
    };
    this.loadMore(load_more_params);
  }

  reInit(){
    this.data = [];
    this.buffer = [];
    this.init();
  }

  bindOnScrollPagination() {
    let scroll_container_selector = this.config.scroll_container_selector;
    let scroll_container_els = scroll_container_selector === 'window' ? $(window) : $(scroll_container_selector);

    for ( let i=0; i<scroll_container_els.length; i++ ) {
      scroll_container_els[i].addEventListener('scroll', this._onscrollPagination, {passive: true});
    }
  }

  _eventHanldersBindScope() {
    this._onscrollPagination = this._onscrollPagination.bind(this);
    this.eventHandlersClear = this.eventHandlersClear.bind(this);//Currently looks like not necessary yet
  }

  eventHandlersClear() {
    let scroll_container_selector = this.config.scroll_container_selector;
    let scroll_container_els = scroll_container_selector === 'window' ? $(window) : $(scroll_container_selector);
    // scroll_container_el.off('scroll', this._onscrollPagination);
    for( let i=0; i<scroll_container_els.length; i++ ) {
      scroll_container_els[i].removeEventListener('scroll', this._onscrollPagination, {passive: true});
    }
  }

  /*
  * @params: p_obj contain key pairs with detail below
  *   - "recursive" contain 2 pairs: {"page_current" : int, "left" : int}. This is for recursive function for buffering purpose. Initialize "page_current" with this.state.page_current
   */
  loadMore(p_obj) {
    p_obj = typeof p_obj === 'undefined' ? {} : p_obj;
    let params = {render_immediately: false};
    Object.assign(params, p_obj);
    let page_number = params.hasOwnProperty('recursive') ? params.recursive.page_current + 1 : (this.state.page_current + 1);


    if (this.isPageBuffered({page_number: page_number}) && params.render_immediately) {

      this.renderPage({page_number: page_number});
      return;
    }

    if (this.state.buffering === page_number) {
      return;
    }

    let data = {};
    data[this.config.server_params_name.start] = page_number * this.config.page_length;
    data[this.config.server_params_name.length] = this.config.page_length;

    Object.assign( data, this.config.data );

    this.state.buffering = page_number;

    let ajax_option = {
      type: this.config.type,
      url: this.config.url,
      data: data,//mean first page requested with page:0
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: response => {
        let data = [];

        if( typeof this.config.response_key === 'string' ) {
          data = response[this.config.response_key];
        } else {
          for( let i=0; i<this.config.response_key.length; i++ ){
            data = response[ this.config.response_key[i] ];
          }
        }

        if (data.length === 0) {
          this.state.pending_scroll = -1;
          this.state.end_of_page = true;
          this.state.initialized = true;
          return;
        }

        if ( typeof this.config.data_map === 'function' ) {
          data = data.map( this.config.data_map );
          this.angularServices.$q.all( data )//support promise map
            .then(  res => {

              this.requestParse({
                data: res,
                page_number: page_number,
                render_immediately: params.render_immediately
              });

            });
        } else {
          this.requestParse({
            data: data,
            page_number: page_number,
            render_immediately: params.render_immediately
          });

        }

        if (params.hasOwnProperty('recursive') && (params.recursive.left > 1)) {
          let page_current_recursive = params.recursive.page_current + 1;
          let recursive_left = params.recursive.left - 1;
          this.loadMore({
            recursive: {
              page_current: page_current_recursive,
              left: recursive_left
            }
          })
        } else {
          this.state.buffering = -1;
          if (this.state.pending_scroll !== -1) {

            this.state.pending_scroll = -1;

            this.loadMore({render_immediately: true});
          }
        }
      }
    };

    if( this.config.type === 'POST' ) {

      ajax_option.contentType = 'application/x-www-form-urlencoded';
    }

    $.ajax( ajax_option );
  }

  requestParse(p_obj) {

    // var page_number = parseInt( $.trim(p_obj.data.body.trash) );
    let page_number = p_obj.page_number;

    let data = p_obj.data;

    for (let i=0; i<data.length; i++) {
      data[i].biqState = {
        is_visible: true, //Used when filter show/hide necessary
        is_expanded: false //To switch between expand and collapse mode
      };
    }

    this.buffer.push({page_number: page_number, data: data});

    if (p_obj.render_immediately) {
      this.renderPage({page_number: page_number});
    }
  }

  renderPage(p_obj) {
    p_obj = typeof p_obj === 'undefined' ? {} : p_obj;
    let params = {page_number: null};
    Object.assign(params, p_obj);

    if (this.state.rendering !== -1) {
      return;
    }

    this.state.rendering = params.page_number;
    this.state.page_current = params.page_number;
    // var content_html = this.getCollection({page_number: params.page_number});
    // $(this.config.target_selector).append($(content_html));
    $.merge(this.data, this.getBuffer({page_number: params.page_number}));
    this.state.initialized = true;

    this.state.rendering = -1;
    this.bufferMaintain();
  }

  _onscrollPagination(e) {
    let scroll_container_el = $(e.target);

    let is_scroll_up = $(window).scrollTop() < this.state.last_scroll_top;
    if (is_scroll_up) {
      return;
    }
    this.state.last_scroll_top = $(window).scrollTop();

    if (scroll_container_el.scrollTop() + scroll_container_el.height() >= (scroll_container_el[0].scrollHeight - this.config.scroll_bottom_space)) {
      if (this.state.end_of_page && (this.bufferLeftCount() === 0)) {
        return;
      }
      let is_processing = this.state.rendering !== -1 || this.state.buffering !== -1;
      if (is_processing && !this.isPageBuffered({page_number: this.state.page_current + 1})) {
        this.state.pending_scroll = this.state.page_current + 1;
        return;
      }
      this.loadMore({render_immediately: true});
    }

  }

  getBuffer(p_obj) {
    p_obj = typeof p_obj === 'undefined' ? {} : p_obj;
    let ret_html = '';
    let params = {page_number: null};
    Object.assign(params, p_obj);
    let buffer = this.buffer;
    for (let i = 0; i < buffer.length; i++) {
      if (params.page_number === buffer[i].page_number) {
        ret_html = buffer[i].data;
      }
    }
    return ret_html;
  }

  bufferGetLastPage() {//get buffered last page number
    let buffer_last_page = 0;
    let page_collection = this.buffer;
    for ( let i = 0; i < page_collection.length; i++ ) {
      if (page_collection[i].page_number > buffer_last_page) {
        buffer_last_page = page_collection[i].page_number;
      }
    }
    return buffer_last_page;
  }

  bufferLeftCount() {
    let buffer_left_count = 0;
    let page_current = this.state.page_current;
    let page_collection = this.buffer;
    for ( let i = 0; i < page_collection.length; i++ ) {
      if (page_collection[i].page_number > page_current) {
        buffer_left_count++;
      }
    }
    return buffer_left_count;
  }

  bufferMaintain() {
    if (this.state.buffering !== -1) {
      return;
    }
    let buffer_left_diff = this.config.buffer_next_page - this.bufferLeftCount();
    if (buffer_left_diff > 0) {
      this.loadMore({
        recursive: {
          page_current: this.bufferGetLastPage(),
          left: buffer_left_diff
        }
      });
    }
  }

  isPageBuffered(p_obj) {
    p_obj = typeof p_obj === 'undefined' ? {} : p_obj;
    let params = {page_number: null};
    Object.assign(params, p_obj);

    let is_buffered = false;
    for (let i = 0; i < this.buffer.length; i++) {
      if (p_obj.page_number === this.buffer[i].page_number) {
        is_buffered = true;
        break;
      }
    }
    return is_buffered;
  };

}