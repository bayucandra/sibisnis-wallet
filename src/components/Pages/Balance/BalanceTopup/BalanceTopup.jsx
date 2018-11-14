import React, {Component} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import { Button } from '../../../Widgets/material-ui';
import NumberFormat from "react-number-format";

import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";
import Tab, {TabItem} from "../../../Widgets/Tab";

import AppActions from "../../../../redux/actions/global/appActions";
import balanceActions from "../../../../redux/actions/pages/balanceActions";
import biqHelper from "../../../../lib/biqHelper";

import "./BalanceTopup.scss";

class BalanceTopup extends Component {

  state = {
    active_tab: 'pick_nominal',
    pick_nominal: {},
    custom_nominal: {
      input_value: 0
    }
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

  constructor( props ) {
    super(props);
  }

  _tabChange = ( tab_state ) => {
    this.setState( { active_tab: tab_state } );
  };

  _historyBtnClick = ()=>{
    biqHelper.utils.clickTimeout( ()=>{
      this.props.history.push('/balance/topup-history');
    } );
  };

  _historyBtn = <Button className="history-btn-mobile" onClick={this._historyBtnClick}>History</Button>;

  _nominalClick = nominal => {
    let {dispatch} = this.props;
    biqHelper.utils.clickTimeout( () => {
      dispatch( balanceActions.balanceNominalSet( nominal ) );
      dispatch( balanceActions.balanceMethodReset() );
      this.props.history.push('/balance/payment');
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );
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
                  <Button className={`nominal-item${ idx === ( arr.length-1 ) ? ' is-last' : '' }`} onClick={ () => this._nominalClick( el.amount )} key={el.amount}>
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
                  <input type="text" value={this.state.custom_nominal.input_value}
                         onChange={ e => this.setState(  {custom_nominal: Object.assign( {}, this.state.custom_nominal, { input_value: e.target.value } ) } ) }  />
                </div>

                <Button className="submit-btn visible-md-up">Lanjutkan</Button>
              </div>

              <div className="input-notice">
                Minimal pengisian saldo Rp 10.000 , Isi hanya dengan angka
              </div>

              <Button className="submit-btn hidden-md-up">Lanjutkan</Button>

            </section>

          }
        </div>

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

export default withRouter( connect(mapStateToProps) (BalanceTopup) );