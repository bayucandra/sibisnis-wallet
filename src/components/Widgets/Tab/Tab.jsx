import React, {Component} from 'react';
import $ from 'jquery';
import { timer } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import "./Tab.scss";
import biqHelper from "../../../lib/biqHelper";

class Tab extends Component {

  tab_ref = React.createRef();

  tab_item_active = null;

  state = {
    active_label: ''
  };

  _tabItemOnClick = (tabItemActive) => {
    this.tab_item_active = tabItemActive;
    if ( typeof this.props.tabChange === 'function' ) this.props.tabChange( tabItemActive.props.tabState );
    this.setState({ active_label: tabItemActive.props.label });
    // console.log(tabItemActive.props.tabState);
    // this.forceUpdate();
  };

  _renderHighlight = () => {
    let tab_wrapper_el = $( this.tab_ref.current );
    if (!tab_wrapper_el.length) return;

    let tab_highlight_el = tab_wrapper_el.find('.widget-tab__highlight');
    let tab_item_active_el  = tab_wrapper_el.find( '.widget-tab-item.is-active' );

    if ( !tab_item_active_el.length || !tab_highlight_el.length ) return;

    let highlight$ = timer(0)
      .pipe(

        tap( ()=>{

          tab_highlight_el.css({
            left: tab_item_active_el.position().left,
            width: 5
          });

          tab_highlight_el.addClass('fast-anim');
        }),

        delay( 100 ),

        tap(()=>{
          tab_highlight_el.removeClass('fast-anim');
          tab_highlight_el.css({
            width: tab_item_active_el.outerWidth()
          });
        })

      );

    highlight$.subscribe( val => {

    });

  };

  componentDidMount() {
    this._renderHighlight();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ( prevState.active_label !== this.state.active_label ) {
      this._renderHighlight();
    }
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, (child, idx ) => {
        let is_active = ( this.tab_item_active !== null && child.props.label === this.tab_item_active.props.label) || ( biqHelper.utils.isNull(this.tab_item_active) && idx === 0 );

        return React.cloneElement(child, {
          _tabItemOnClick: () => { this._tabItemOnClick(child) },
          is_active: is_active
        });
      }
    );

    return (
      <div ref={this.tab_ref} className={`widget-tab${ !biqHelper.utils.isNull(this.props.classes) ? ' '+this.props.classes : '' }`}>
        {childrenWithProps}
        <div className="widget-tab__highlight"/>
      </div>
    );
  }

}

export default Tab;