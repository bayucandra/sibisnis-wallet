import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import AppActions from "../../../../redux/actions/AppActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopupHistory.scss";
import iconCloseWhite from "../../../../images/icons/close-white.svg";

class BalanceTopupHistory extends Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
  }

  _navBackClick = () => {
    biqHelper.utils.clickTimeout();
    this.props.history.push('/balance');
  };

  render() {
    return (
      <div className="balance-topup-history">

        <nav className="nav-mobile hidden-md-up">
          <div className="title">History Topup</div>
          <IconButton className="close-btn" onClick={this._navBackClick}>
            <img src={iconCloseWhite}/>
          </IconButton>
        </nav>

      </div>
    );
  }

}

export default withRouter( connect(null) (BalanceTopupHistory) );