import React, {Component} from 'react';


import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";

import "./BalanceTopup.scss";

class BalanceTopup extends Component {

  render() {
    return (
      <div className={`balance-topup`}>
        <HeaderMobileGeneral headerTitle="Tambah Saldo"/>
      </div>
    );
  }

}

export default BalanceTopup;