import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import HeaderMenuMobile from "../HeaderMenuMobile";
import biqHelper from "../../../lib/biqHelper";

import "./HeaderMobileGeneral.scss";

class HeaderMobileGeneral extends Component {

  router_back_path = '/dashboard';

  constructor( props ) {
    super(props);
  }

  componentDidMount() {
    if ( !biqHelper.utils.isNull( this.props.headerRouterBack ) ) this.router_back_path = this.props.headerRouterBack;
    else this.router_back_path = '/dashboard';
  }

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( ()=>{
      this.props.history.push( this.router_back_path );
    } );
  };

  render() {
    return (
      <div className="header-mobile-general hidden-md-up">
        <div className="header-mobile-general__left">
          <Button className="back-btn" onClick={this._backBtnClick}>&nbsp;</Button>
          <div className="title">{this.props.headerTitle}</div>
        </div>

        {!biqHelper.utils.isNull( this.props.headerButtonWidget ) ? this.props.headerButtonWidget : ''}

        <div className="header-mobile-general__right">
          <HeaderMenuMobile/>
        </div>

      </div>
    );
  }

}

export default withRouter(HeaderMobileGeneral);