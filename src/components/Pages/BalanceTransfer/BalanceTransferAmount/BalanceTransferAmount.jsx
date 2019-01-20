import React, {Component} from 'react';
import {connect} from 'react-redux';

import biqHelper from "lib/biqHelper";

import balanceTransferActions from "redux/actions/pages/balanceTransferActions";
import appActions from "redux/actions/global/appActions";

import {Button, PasswordField} from "components/Widgets/material-ui";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";

import "./BalanceTransferAmount.scss";
import {TextField} from "@material-ui/core";
import Modal from "@material-ui/core/es/Modal";

class BalanceTransferAmount extends Component {

  state = {
    nominal: {
      value: '',
      error: false,
      error_message: null
    },

    description: '',

    password_input: false,
    password_value: '',
    passwordInputTop: 0
  };

  _passwordModalPosTopGen() {
    let ratio_opt = { box_selector: '.balance-transfer-password-input .password-input-panel', top_space: 218, bottom_space: 323};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 90;
      ratio_opt.bottom_space = 170;
    }

    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  _passwordModalOpen = () => {
    this.setState({ password_input: true });
  };

  _passwordModalClose = () => {
    biqHelper.utils.clickTimeout( () => {
      this._passwordModalCloseActual();
    } );
  };

  _passwordModalCloseActual = () => {
    this.setState({ password_input: false });
  };

  _backBtnClick = () => {

    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( balanceTransferActions.memberInfoReset() );

      this.props.history.push( '/balance-transfer' );
    } );

  };

  _submit = () => {

    biqHelper.utils.clickTimeout( () => {

      let {dispatch} = this.props;

      if ( biqHelper.utils.isNull(this.state.nominal.value) ) {
        this.setState({
          nominal: Object.assign({}, this.state.nominal, {
            error: true,
            error_message: 'Harap mengisi nominal transfer'
          })
        });
        dispatch(appActions.appDialogNoticeOpen({ title: 'Periksa Input', notice: 'Harap mengisikan nominal transfer' }));
        return;
      }

      this._passwordModalOpen();

    });

  };

  componentDidMount() {

    let {dispatch} = this.props;

    let nama = biqHelper.JSON.pathValueGet( this.props.member_info.server_response, "response.data.nama" );
    let nomor_hp = biqHelper.JSON.pathValueGet( this.props.member_info.server_response, "response.data.nomor_hp" );

    if ( biqHelper.utils.isNullSome( nama, nomor_hp ) ) {
      this.props.history.goBack();
      return;
    }

    dispatch( appActions.appRouterChange( { header_mobile_show: false } ) );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if( !prevState.password_input && this.state.password_input ) {

      setTimeout( ()=> {

        let top_pos = this._passwordModalPosTopGen();
        if (this.state.passwordInputTop !== top_pos) {
          this.setState({passwordInputTop: top_pos});
        }

      });

    }

  }

  render() {

    return (
      <div className="l-balance-transfer-amount">
        <HeaderMobileGeneral backBtnClick={this._backBtnClick} headerTitle="Transfer saldo"/>

        <h1 className="l-balance-transfer-amount__title visible-md-up">Transfer Saldo</h1>

        <div className="l-balance-transfer-amount__body">

          <div className="destination">

            <div className="destination__title">Tujuan transfer</div>

            <div className="destination__detail">

              <div className="record record--first">
                <div className="record__label">Nama penerima</div>
                <div className="record__value">{ biqHelper.JSON.pathValueGet( this.props.member_info.server_response, "response.data.nama" ) }</div>
              </div>

              <div className="record">
                <div className="record__label">Nomor tujuan</div>
                <div className="record__value">{ biqHelper.JSON.pathValueGet( this.props.member_info.server_response, "response.data.nomor_hp" ) }</div>
              </div>

            </div>

          </div>


          <TextField
            error={ this.state.nominal.error }
            className="nominal mui-number-field mui-number-field--no-spinner"
            type="number"
            label="Nominal transfer"
            value={this.state.nominal.value}
            onChange={ e =>this.setState( { nominal: Object.assign({}, this.state.nominal, { value: e.target.value }) } )}
            helperText={ this.state.nominal.error_message }
          />

          <TextField
            className="description"
            label="Keterangan (Opsional)"
            value={this.state.description}
            onChange={(e)=>this.setState( { description: e.target.value } )}
            helperText={""}
          />

          <div className="action">

            <Button className="submit-btn" onClick={this._submit}>PROSES</Button>

            <Button className="cancel-btn" onClick={this._backBtnClick}>BATAL</Button>

          </div>

        </div>


        <Modal
          open={this.state.password_input}
          onClose={this._passwordModalCloseActual}>

          <div className="modal-inner balance-transfer-password-input">

            <div className="password-input-panel" style={ { marginTop: this.state.passwordInputTop } }>

              <h3 className="title">Masukkan password</h3>

              <PasswordField
                className="password-input"
                label=""
                value={this.state.password_value}
                onChange={
                  e => this.setState( { password_value: e.target.value } )
                }
                helperText={""}/>

              <div className="action">

                <Button className="submit-btn">KIRIM</Button>
                <Button className="cancel-btn" onClick={this._passwordModalClose}>BATAL</Button>

              </div>

            </div>

          </div>

        </Modal>

      </div>

    );//return()

  }//render()

}

const mapStateToProps = state => {

  return {
    member_info: state.balanceTransfer.member_info
  }

};

export default connect( mapStateToProps ) ( BalanceTransferAmount );