import React, {Component} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import Button from '@material-ui/core/Button';
import NumberFormat from "react-number-format";

import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";
import Tab, {TabItem} from "../../../Widgets/Tab";

import AppActions from "../../../../redux/actions/AppActions";
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
    { number: 50000, text: "Limapuluh ribu rupiah" },
    { number: 100000, text: "Seratus ribu rupiah" },
    { number: 150000, text: "Seratus limapuluh ribu rupiah" },
    { number: 200000, text: "Duaratus ribu rupiah" },
    { number: 250000, text: "Duaratus limapuluh ribu rupiah" },
    { number: 500000, text: "Limaratus ribu rupiah" },
    { number: 1000000, text: "Satu juta rupiah" }
  ];

  constructor( props ) {
    super(props);
  }

  _tabChange = ( tab_state ) => {
    this.setState( { active_tab: tab_state } );
  };

  _historyBtn = <Button className="history-btn-mobile">History</Button>;


  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( AppActions.appRouterChange( { main_header_mobile_show : false } ) );

    // Redirect()
  }

  render() {

    let is_photo_set = !biqHelper.utils.isNull(this.props.user_profile.photo);
    let is_address_set = !biqHelper.utils.isNull(this.props.user_profile.alamat);

    return (
      <div className={`balance-topup`}>

        { !is_photo_set || !is_address_set ? <Redirect to={"/balance/profile-verification"}/> : '' }

        <HeaderMobileGeneral headerTitle="Tambah Saldo" headerButtonWidget={this._historyBtn}/>

        <div className="balance-topup__top-nav visible-md-up">

          <h3 className="title">Tambah Saldo</h3>

          <Button className="history-btn">History topup</Button>

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
                  <Button className={`nominal-item${ idx === ( arr.length-1 ) ? ' is-last' : '' }`} key={el.number}>
                    <div className="nominal-item__inner">
                      <NumberFormat displayType={'text'} value={el.number} prefix={'Rp '}
                                    renderText={value => <div className="nominal-item__number hidden-md-up">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
                      <NumberFormat displayType={'text'} value={el.number} prefix={''}
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
    user_profile: state.user.profile
  }
};

export default withRouter( connect(mapStateToProps) (BalanceTopup) );