import React, {Component} from 'react';
import {connect} from 'react-redux';

import biqHelper from "lib/biqHelper";

import { Button } from "components/Widgets/material-ui";

import appActions from "redux/actions/global/appActions";
import balanceMutationActions from "redux/actions/pages/balanceMutationActions";

import SideNavMain from "components/Shared/SideNavMain/SideNavMain";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";
import ScrollPagination from "components/Widgets/ScrollPagination/ScrollPagination";

import "./BalanceMutation.scss";

class BalanceMutation extends Component {

  config = {
    limit: 15
  };

  state = {
    data_is_ready: false
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

    if ( !this.props.mutation_number_pagination.is_fetched ) {
      dispatch( balanceMutationActions.balanceMutationNumberPaginationFetch( { limit: this.config.limit, offset: 0 } ) );
    }

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

  _numberPaginationOnClick = page_number => {
    if ( page_number < 1 ) return;
    let {dispatch} = this.props;
    let offset = (page_number - 1) * this.config.limit;
    dispatch( balanceMutationActions.balanceMutationNumberPaginationFetch( { limit: this.config.limit, offset } ) );
  };

  render() {

    let data_scroll_pagination = this.props.mutation_scroll_pagination.data;

    let data_number_pagination = biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.data' );

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

                  ( !biqHelper.utils.isNull( data_scroll_pagination ) && data_scroll_pagination.length > 0 )

                    &&

                  data_scroll_pagination.map( ( el, idx ) => {

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

              <div className="mutation-table-desktop visible-md-up">

                <h1 className="mutation-table-desktop__title">Mutasi Saldo</h1>



                <div className="mutation-table-desktop__header">

                  <div className="biq-col biq-col--spacer-start"/>
                  <div className="biq-col biq-col--date">Tanggal</div>
                  <div className="biq-col biq-col--description">Keterangan</div>
                  <div className="biq-col biq-col--amount">Jumlah</div>
                  <div className="biq-col biq-col--balance">Saldo</div>

                </div>


                <div className="mutation-table-desktop__body">

                  {
                    ( !biqHelper.utils.isNull( data_number_pagination ) ) && ( data_number_pagination.length > 0 )

                      &&

                    data_number_pagination.map( ( el ) => {
                      return (
                        <div className="biq-row" key={el.id}>
                          <div className="biq-col biq-col--spacer-start"/>
                          <div className="biq-col biq-col--date">{ el.date }</div>
                          <div className="biq-col biq-col--description">{ el.description }</div>
                          <div className="biq-col biq-col--amount">{ biqHelper.utils.numberFormat( el.amount, 'Rp' ) }</div>
                          <div className="biq-col biq-col--balance">{ biqHelper.utils.numberFormat( el.balance, 'Rp' ) }</div>
                        </div>
                      );
                    } )
                  }

                </div>


                <div className="mutation-table-desktop__footer">

                  <div className="pagination">
                    <Button className="pagination__item pagination__item--nav-first">&lt;&lt;</Button>

                    {
                      this.props.mutation_number_pagination.is_fetched

                        ?

                      (() => {

                        let limit= biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.limit' );
                        let offset = biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.offset' );
                        let recordsTotal = biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.recordsTotal' );

                        if ( biqHelper.utils.isNullSome( limit, offset, recordsTotal ) ) return null;

                        limit = biqHelper.string.toInt( limit );
                        offset = biqHelper.string.toInt( offset );
                        recordsTotal = biqHelper.string.toInt( recordsTotal );

                        let page_number_current = offset / limit + 1;

                        let page_total = Math.ceil( recordsTotal / limit );

                        let page_numbers_arr = biqHelper.utils.arrayGen( page_total );

                        let pagination_jsx = [];

                        pagination_jsx.push(
                          <Button className="pagination__item" key={'prev_nav'} onClick={ () => this._numberPaginationOnClick( page_number_current - 1 ) }>
                            &lt;
                          </Button>
                        );

                        let page_numbers_jsx = page_numbers_arr.map( el => {

                          let page_number = el + 1;

                          return (
                            <Button className={`pagination__item${ page_number === page_number_current ? ' is-active' : '' }`} key={el} onClick={() => this._numberPaginationOnClick(page_number)}>
                              { page_number }
                            </Button>
                          )

                        } );

                        pagination_jsx.push(page_numbers_jsx);

                        return pagination_jsx;

                      })()

                        :

                      null

                    }

                    <Button className="pagination__item">&gt;</Button>
                    <Button className="pagination__item pagination__item--nav-last">&gt;&gt;</Button>
                  </div>

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
    mutation_scroll_pagination: state.balanceMutation.mutation_scroll_pagination,
    mutation_number_pagination: state.balanceMutation.mutation_number_pagination
  }
};

export default connect( mapStateToProps ) (BalanceMutation);