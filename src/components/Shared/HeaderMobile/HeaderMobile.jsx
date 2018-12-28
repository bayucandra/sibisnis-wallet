import React, {Component} from 'react';

import {Button} from "components/Widgets/material-ui";
import HeaderMenuMobile from "components/Shared/HeaderMenuMobile/HeaderMenuMobile";
import biqHelper from "../../../lib/biqHelper";

import "./HeaderMobile.scss";

class HeaderMobile extends Component {

  _backBtnClick = () => {
    if ( typeof this.props.backBtnClick !== 'function' ) return;
    this.props.backBtnClick();
  };

  render() {
    let label = biqHelper.utils.isNull(this.props.label) ? '-' : this.props.label;
    return (
      <div className="c-header-mobile">
        <Button className="back-btn" onClick={this._backBtnClick}>&nbsp;</Button>
        <div className="label">{ label }</div>
        <HeaderMenuMobile forceVisible={true}/>
      </div>
    );
  }

}

export default HeaderMobile;