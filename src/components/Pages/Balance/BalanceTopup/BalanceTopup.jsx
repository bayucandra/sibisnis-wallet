import React, {Component} from 'react';
import Button from '@material-ui/core/Button';


import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";

import "./BalanceTopup.scss";

function historyBtn() {
  return (
    <div>Test</div>
  );
}

class BalanceTopup extends Component {

  _historyBtn = <Button className="history-btn-mobile">History</Button>;

  render() {
    return (
      <div className={`balance-topup`}>
        <HeaderMobileGeneral headerTitle="Tambah Saldo" headerButtonWidget={this._historyBtn}/>
      </div>
    );
  }

}

export default BalanceTopup;