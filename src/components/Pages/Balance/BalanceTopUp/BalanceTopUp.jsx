import React, {Component} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import { Button } from '../../../Widgets/material-ui';
import NumberFormat from "react-number-format";

import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";
import Tab, {TabItem} from "../../../Widgets/Tab";

import appActions from "../../../../redux/actions/global/appActions";
import balanceActions from "../../../../redux/actions/pages/balanceActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopUp.scss";
import Modal from "@material-ui/core/Modal/Modal";
import ModalNotice from "../../../Widgets/ModalNotice/ModalNotice";

class BalanceTopUp extends Component {

  state = {
    active_tab: 'pick_nominal',
    pick_nominal: {},
    custom_nominal: {
      input_value: 0
    },
    modal_err_is_open: false
  };

  nominal_list = [
    { amount: 50000, text: "Limapuluh ribu rupiah" },
    { amount: 100000, text: "Seratus ribu rupiah" },
    { amount: 150000, text: "Seratus limapuluh ribu rupiah" },
    { amount: 200000, text: "Duaratus ribu rupiah" },
    { amount: 250000, text: "Duaratus limapuluh ribu rupiah" },
    { amount: 500000, text: "Limaratus ribu rupiah" },
    { amount: 1000000, text: "Satu juta rupiah" }
  ];

  _tabChange = ( tab_state ) => {
    this.setState( { active_tab: tab_state } );
  };

  _historyBtnClick = ()=>{
    biqHelper.utils.clickTimeout( ()=>{
      this.props.history.push('/balance/topup-history');
    } );
  };

  _historyBtn = <Button className="history-btn-mobile" onClick={this._historyBtnClick}>History</Button>;

  _nominalSelect = nominal => {
    let {dispatch} = this.props;
    biqHelper.utils.clickTimeout( () => {
      dispatch( balanceActions.balanceNominalSet( nominal ) );
      dispatch( balanceActions.balanceMethodReset() );
      dispatch( balanceActions.balanceMethodSet('manual_transfer') );
      this.props.history.push('/balance/payment');
    } );
  };

  _customNominalSet = () => {

    let nominal = biqHelper.string.toInt( this.state.custom_nominal.input_value );
    if ( nominal < 10000 ) {
      this._modalErrorOpen();
      return;
    }

    this._nominalSelect( nominal );

  };

  _modalErrorClose = () => {
    this.setState( { modal_err_is_open: false } );
  };

  _modalErrorOpen = () => {
    this.setState( {modal_err_is_open: true} );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
  }

  render() {

    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);

    return (
      <div className={`balance-topup`}>

        { this.props.is_profile_parsed && ( !is_photo_set || !is_address_set ) ? <Redirect to={"/balance/profile-verification"}/> : '' }

        <HeaderMobileGeneral headerTitle="Tambah Saldo" headerButtonWidget={this._historyBtn}/>

        <div className="balance-topup__top-nav visible-md-up">

          <h3 className="title">Tambah Saldo</h3>

          <Button className="history-btn" onClick={ this._historyBtnClick }>
            History topup
          </Button>

        </div>

        <div className="tab-nav">
          <Tab tabChange={ this._tabChange }>
            <TabItem label="Pilih nominal" tabState="pick_nominal"/>
            <TabItem label="Nominal lainnya" tabState="custom_nominal"/>
          </Tab>
        </div>

        <div className="tab-panel">
          {this.state.active_tab === 'pick_nominal' ?

            <section className="tab-panel__pick-nominal">
              { this.nominal_list.map( ( el, idx, arr ) => {
                return (
                  <Button className={`nominal-item${ idx === ( arr.length-1 ) ? ' is-last' : '' }`} onClick={ () => this._nominalSelect( el.amount )} key={el.amount}>
                    <div className="nominal-item__inner">
                      <NumberFormat displayType={'text'} value={el.amount} prefix={'Rp '}
                                    renderText={value => <div className="nominal-item__number hidden-md-up">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
                      <NumberFormat displayType={'text'} value={el.amount} prefix={''}
                                    renderText={value => <div className="nominal-item__number visible-md-up">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
                      <div className="nominal-item__text hidden-md-up">{ el.text }</div>
                    </div>
                  </Button>
                );
              } ) }
            </section>

            :

            <section className="tab-panel__custom-nominal">

              <div className="input-wrapper">
                <div className="input-nominal">
                  <input type="number" className="no-spinner" step="10000" min="10000" value={this.state.custom_nominal.input_value}
                         onChange={ e => this.setState(  {custom_nominal: Object.assign( {}, this.state.custom_nominal, { input_value: e.target.value } ) } ) }  />
                </div>

                <Button className="submit-btn visible-md-up" onClick={this._customNominalSet}>Lanjutkan</Button>
              </div>

              <div className="input-notice">
                Minimal pengisian saldo Rp 10.000 , Isi hanya dengan angka
              </div>

              <Button className="submit-btn hidden-md-up">Lanjutkan</Button>

            </section>

          }
        </div>


        <Modal
          open={this.state.modal_err_is_open}
          onClose={this._modalErrorClose}>

          <div className="modal-inner">
            <ModalNotice modalClose={this._modalErrorClose} title="Nominal tidak valid" notice="Pengisian saldo minimal adalah Rp 10.000."/>
          </div>

        </Modal>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    is_profile_parsed: state.user.is_profile_parsed,
    user_profile: state.user.profile,
    balance: state.balance
  }
};

export default withRouter( connect(mapStateToProps) (BalanceTopUp) );
