import React, {Component} from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";
import balanceMutationActions from "redux/actions/pages/balanceMutationActions";

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";

import "./BalanceMutation.scss";
import HeaderMobileGeneral from "../../Shared/HeaderMobileGeneral/HeaderMobileGeneral";
import ScrollPagination from "../../Widgets/ScrollPagination/ScrollPagination";
import biqHelper from "../../../lib/biqHelper";

class BalanceMutation extends Component {

  state = {
    data_is_ready: false
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
  }

  _onFetch = () => {
    let {dispatch} = this.props;
    dispatch( balanceMutationActions.balanceMutationfetch() );
  };

  _onFetched = obj => {
    let {dispatch} = this.props;

    if ( !this.state.data_is_ready )
      this.setState( { data_is_ready: true }, ()=> {
        dispatch( balanceMutationActions.balanceMutationfetched( { data: obj.data_all } ) );
      } );

    else
      dispatch( balanceMutationActions.balanceMutationfetched( { data: obj.data_all } ) );

  };

  render() {

    let data = this.props.mutation_list.data;

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper biq-wrapper--md-narrow-side-padding l-balance-mutation">

        <div className="biq-wrapper__inner l-balance-mutation__inner">

          <SideNavMain cssClasses={"visible-md-up"}/>

          <div className="balance-mutation-panel">
            <HeaderMobileGeneral headerTitle="Mutasi Saldo"/>

            <div className="balance-mutation-panel__body">

              <ScrollPagination className="mutation-table-mobile hidden-md-up" biqLimit={15}
                biqUrl={`http://newzonatik.com:8080/sibisnis-wallet/public/api/balance-mutation.php`}
                biqMethod={'GET'}
                onFetch={this._onFetch} onFetched={this._onFetched}>
                {

                  ( !biqHelper.utils.isNull( data ) && data.length > 0 )

                    &&

                  data.map( ( el, idx ) => {

                    return (
                      <div className={`biq-row-mobile${ idx === 0 ? ' is-first' : '' }`} key={el.id}>

                        <div className="biq-col-left">
                          <div className="date">{ el.date }</div>
                          <div className="description">{el.description}</div>
                        </div>

                        <div className="biq-col-right">
                          <div className="balance">{ biqHelper.utils.numberFormat( el.balance ) }</div>
                          <div className="mutation-amount">{ biqHelper.utils.numberFormat( el.amount ) }</div>
                        </div>

                      </div>
                    );

                  } )

                }

              </ScrollPagination>

              <div className="mutation-table-desktop">

                <h1 className="mutation-table-desktop__title">Mutasi Saldo</h1>



                <div className="mutation-table-desktop__header">

                  <div className="biq-col biq-col--date">Tanggal</div>
                  <div className="biq-col biq-col--description">Keterangan</div>
                  <div className="biq-col biq-col--amount">Jumlah</div>
                  <div className="biq-col biq-col--balance">Saldo</div>

                </div>



              </div>

            </div>

          </div>

        </div>

      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    mutation_list: state.balanceMutation.mutation_list
  }
};

export default connect( mapStateToProps ) (BalanceMutation);