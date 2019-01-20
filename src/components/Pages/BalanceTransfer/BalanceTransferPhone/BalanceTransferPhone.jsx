import React, { Component } from 'react';
import {connect} from 'react-redux';

import biqHelper from "../../../../lib/biqHelper";

import appActions from "../../../../redux/actions/global/appActions";
import balanceTransferActions from "../../../../redux/actions/pages/balanceTransferActions";

import {Button} from "components/Widgets/material-ui";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";
import PhoneInput from "components/Widgets/PhoneInput";

import "./BalanceTransferPhone.scss";

class BalanceTransferPhone extends Component {

  state = {
    input: {
      is_valid: false,
      value: ''
    }
  };

  _inputChange = ( p_obj ) => {
    this.setState( { input: Object.assign( this.state.input, p_obj ) } );
  };

  _onSubmit = () => {
    biqHelper.utils.clickTimeout( () => {

      let {dispatch} = this.props;

      if (biqHelper.utils.isNull(this.state.input.value) || !this.state.input.is_valid) {
        dispatch(appActions.appDialogNoticeOpen({
          title: 'Periksa input',
          notice: 'Harap masukkan nomor HP yang valid'
        }));
        return;
      }

      dispatch(balanceTransferActions.memberInfoFetch(this.state.input.value));

    });
  };

  componentDidMount() {
    let {dispatch} = this.props;

    dispatch( appActions.appRouterChange( { header_mobile_show: false } ) );

    if( this.props.member_info.is_fetched ) {

      let server_status = this.props.member_info.server_response.status;
      let is_success = biqHelper.utils.httpResponseIsSuccess( server_status );

      if ( !is_success ) {

        let error_message = `Error: ${server_status}`;
        let server_error = biqHelper.JSON.pathValueGet( this.props.member_info.server_response, 'response.response_code.message' );
        error_message = !biqHelper.utils.isNull(server_error) ? server_error : error_message;

        dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal', notice: error_message } ) );

      } else {

        this.props.history.push( '/balance-transfer/amount' );

      }

    }
  }

  render() {

    return (

      <div className="l-balance-transfer-phone">

        <HeaderMobileGeneral headerTitle="Transfer saldo"/>

        <h1 className="l-balance-transfer-phone__title visible-md-up">Transfer Saldo</h1>

        <div className="l-balance-transfer-phone__body">
          <PhoneInput label="Nomor Hp Tujuan" onChange={this._inputChange}/>

          <div className="footer">
            <Button className={`submit-btn${ this.state.input.is_valid ? ' is-ready' : '' }`} onClick={this._onSubmit}>
              Lanjutkan
            </Button>
          </div>

        </div>

      </div>

    );

  }

}

const mapStateToProps = state => {
  return {
    member_info: state.balanceTransfer.member_info
  }
};

export default connect(mapStateToProps) (BalanceTransferPhone);