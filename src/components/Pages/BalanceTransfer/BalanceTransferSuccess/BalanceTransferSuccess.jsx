import React, {Component} from 'react';
import { connect } from 'react-redux';

import biqHelper from "lib/biqHelper";

import { Button } from "components/Widgets/material-ui";

import "./BalanceTransferSuccess.scss";

class BalanceTransferSuccess extends Component {

  _mutationBtnClick = () => {
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push( '/balance-mutation' );
    } );
  };

  componentDidMount() {

    if ( !biqHelper.utils.httpResponseIsSuccess( this.props.nominal_submit.server_response.status ) ) {
      this.props.history.goBack();
    }

  }

  render() {
    return (
      <div className="l-balance-transfer-success">

        <h1 className="l-balance-transfer-success__title visible-md-up">Transfer Saldo</h1>

        <div className="l-balance-transfer-success__info-block">

          <div className="icon"/>

          <div className="title">Proses Transfer Selesai</div>

          <div className="notice">
            Anda berhasil transfer saldo. Anda bisa melihat laporan transfer ini di mutasi saldo Anda.
          </div>

          <Button className="check-mutation-btn" onClick={this._mutationBtnClick}>Lihat Mutasi</Button>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    nominal_submit: state.balanceTransfer.nominal_submit
  };
};

export default connect(mapStateToProps) (BalanceTransferSuccess);