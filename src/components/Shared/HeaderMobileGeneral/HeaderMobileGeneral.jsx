import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'components/Widgets/material-ui';

import HeaderMenuMobile from "../HeaderMenuMobile";
import biqHelper from "lib/biqHelper";

import "./HeaderMobileGeneral.scss";

class HeaderMobileGeneral extends Component {

  router_back_path = '/dashboard';

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
    let has_back_btn = biqHelper.utils.isNull( this.props.hasBackBtn ) || this.props.hasBackBtn === true;
    return (
      <div className="header-mobile-general hidden-md-up">

        <div className="header-mobile-general__left">
          { has_back_btn ? <Button className="back-btn" onClick={this._backBtnClick}>&nbsp;</Button> : '' }
          <div className={`title${ !has_back_btn ? ' title--no-back-btn' : '' }`}>{this.props.headerTitle}</div>
        </div>

        {this.props.headerButtonWidget}

        <div className="header-mobile-general__right">
          <HeaderMenuMobile/>
        </div>

      </div>
    );
  }

}

HeaderMobileGeneral.defaultProps = {
  hasBackBtn : true,
  headerTitle: '',
  headerButtonWidget: null
};

export default withRouter(HeaderMobileGeneral);