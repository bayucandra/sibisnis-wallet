import React, {Component} from 'react';
import Button from '@material-ui/core/Button';


import HeaderMobileGeneral from "../../../Shared/HeaderMobileGeneral";
import Tab, {TabItem} from "../../../Widgets/Tab";
import NumberFormat from "react-number-format";

import "./BalanceTopup.scss";

class BalanceTopup extends Component {

  state = {
    active_tab: 'pick_nominal'
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
    console.log(tab_state);
    this.setState( { active_tab: tab_state } );
  };

  _historyBtn = <Button className="history-btn-mobile">History</Button>;

  render() {
    return (
      <div className={`balance-topup`}>
        <HeaderMobileGeneral headerTitle="Tambah Saldo" headerButtonWidget={this._historyBtn}/>

        <div className="balance-topup__top-nav visible-md-up">

          <h3 className="title">Tambah Saldo</h3>

          <Button className="history-btn">History topup</Button>

        </div>

        <div className="tab-nav">
          <Tab tabChangeCallback={ this._tabChange }>
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

            </section>

          }
        </div>

      </div>
    );
  }

}

export default BalanceTopup;