import React, {Component} from 'react';
import {connect} from 'react-redux';

import biqHelper from "lib/biqHelper";


import appActions from "redux/actions/global/appActions";
import balanceMutationActions from "redux/actions/pages/balanceMutationActions";

import { Button } from "components/Widgets/material-ui";

import SideNavMain from "components/Shared/SideNavMain/SideNavMain";
import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";
import ScrollPagination from "components/Widgets/ScrollPagination/ScrollPagination";

import "./BalanceMutation.scss";
import biqConfig from "../../../providers/biqConfig";

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

    let limit_current= biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.limit' );
    let offset_current = biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.offset' );
    let recordsTotal = biqHelper.JSON.pathValueGet( this.props.mutation_number_pagination.server_response, 'response.recordsTotal' );

    if ( biqHelper.utils.isNullSome( limit_current, offset_current, recordsTotal ) ) return null;

    limit_current = biqHelper.string.toInt( limit_current );
    offset_current = biqHelper.string.toInt( offset_current );
    recordsTotal = biqHelper.string.toInt( recordsTotal );

    let page_number_current = offset_current / limit_current + 1;

    let page_total = Math.ceil( recordsTotal / limit_current );

    if ( page_number_current === page_number || page_number > page_total ) return;

    let {dispatch} = this.props;
    let offset = (page_number - 1) * this.config.limit;
    dispatch( balanceMutationActions.balanceMutationNumberPaginationFetch( { limit: this.config.limit, offset } ) );
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let {dispatch} = this.props;

    if (
      !this.props.mutation_number_pagination.is_fetched
      && nextProps.mutation_number_pagination.is_fetched
      && biqHelper.utils.httpResponseIsError( nextProps.mutation_number_pagination.server_response.status )
    ) {

      let error_message = `Gagal mengambil data "Mutasi Saldo". Error: ${nextProps.mutation_number_pagination.server_response.status}`;
      let server_message = biqHelper.JSON.pathValueGet( nextProps.mutation_number_pagination.server_response, 'response.response_code.message' );
      error_message = !biqHelper.utils.isNull( server_message ) ? server_message : error_message;

      dispatch( appActions.appDialogNoticeOpen( { title: 'Gagal', notice: error_message } ) );

      return true;
    }

    return true;

  }

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
                biqUrl={`${biqConfig.api.url_base}/api/wallet/mutasi_saldo`}
                biqMethod={'POST'}
                onFetch={this._onFetch} onFetched={this._onFetched}>
                {

                  ( !biqHelper.utils.isNull( data_scroll_pagination ) && data_scroll_pagination.length > 0 )

                    &&

                  data_scroll_pagination.map( ( el, idx ) => {

                    return (
                      <div className={`biq-row-mobile${ idx === 0 ? ' is-first' : '' }`} key={el.id}>

                        <div className="biq-col-left">
                          <div className="date">{ el.tanggal }</div>
                          <div className="description">{el.ket}</div>
                        </div>

                        <div className="biq-col-right">
                          <div className="balance">{ biqHelper.utils.numberFormat( el.lastsaldo ) }</div>
                          <div className="mutation-amount">

                            { ( function() {
                              let debet = biqHelper.string.toInt( el.debet );
                              let kredit = biqHelper.string.toInt( el.kredit );

                              let sign = kredit === 0 ? '+' : '-';
                              let value = kredit === 0 ? debet : kredit;

                              return `${sign}${biqHelper.utils.numberFormat(value)}`;
                            } )() }

                          </div>
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
                          <div className="biq-col biq-col--date">{ el.tanggal }</div>
                          <div className="biq-col biq-col--description">{ el.ket }</div>
                          <div className="biq-col biq-col--amount">{ ( function() {
                            let debet = biqHelper.string.toInt( el.debet );
                            let kredit = biqHelper.string.toInt( el.kredit );

                            let sign = kredit === 0 ? '+' : '-';
                            let value = kredit === 0 ? debet : kredit;

                            return `${sign} ${biqHelper.utils.numberFormat(value)}`;
                          } )() }</div>
                          <div className="biq-col biq-col--balance">{ biqHelper.utils.numberFormat( el.lastsaldo, 'Rp ' ) }</div>
                        </div>
                      );
                    } )
                  }

                  {
                    this.props.mutation_number_pagination.is_fetching
                      &&
                    <div className="c-loading-indicator">
                      <div className="c-loading-indicator__circle"/>
                      <div className="c-loading-indicator__label">Loading...</div>
                    </div>
                  }


                </div>


                <div className="mutation-table-desktop__footer">

                  <div className="pagination">

                    {
                      this.props.mutation_number_pagination.is_fetched || !biqHelper.utils.isNull( this.props.mutation_number_pagination.server_response )

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

                        let pagination_shown = 7;
                        if ( page_numbers_arr.length > pagination_shown && page_number_current < pagination_shown ) {
                          page_numbers_arr.splice( -( page_numbers_arr.length - pagination_shown ) );

                        } else if( page_number_current >= pagination_shown && page_number_current <= (page_total-2) ) {

                          page_numbers_arr.splice( -( page_total - page_number_current - 1 ) );
                          page_numbers_arr.splice( 0, page_numbers_arr.length - pagination_shown );

                        } else if ( page_number_current >= (page_total-2) ) {

                          page_numbers_arr.splice( 0, page_numbers_arr.length - pagination_shown );
                        }

                        let pagination_jsx = [];

                        pagination_jsx.push(
                          <Button className="pagination__item pagination__item--nav-first" key={'nav_first'} onClick={ () => this._numberPaginationOnClick( 1 ) }>
                            &nbsp;
                          </Button>
                        );

                        pagination_jsx.push(
                          <Button className="pagination__item pagination__item--nav-prev" key={'nav_prev'} onClick={ () => this._numberPaginationOnClick( page_number_current - 1 ) }>
                            &nbsp;
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

                        pagination_jsx.push(
                          <Button className="pagination__item pagination__item--nav-next" key={"nav_next"} onClick={ () => this._numberPaginationOnClick( page_number_current + 1 ) }>
                            &nbsp;
                          </Button>
                        );

                        pagination_jsx.push(
                          <Button className="pagination__item pagination__item--nav-last" key={"nav_last"} onClick={ () => this._numberPaginationOnClick( page_total ) }>
                            &nbsp;
                          </Button>
                        );

                        return pagination_jsx;

                      })()

                        :

                      null

                    }

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
