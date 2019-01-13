import React, {Component} from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";
import newsActions from "redux/actions/pages/newsActions";

import biqHelper from "lib/biqHelper";
import biqConfig from "providers/biqConfig";

import {Button} from "components/Widgets/material-ui";
import HeaderMobile from "components/Shared/HeaderMobile/HeaderMobile";

import "./News.scss";
import * as moment from "moment";
import ScrollPagination from "components/Widgets/ScrollPagination/ScrollPagination";
import LatestNewsLoader from "components/Loaders/LatestNewsLoader/LatestNewsLoader";

class News extends Component {

  state = {
    data_is_ready: false
  };

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( ()=>{
      this.props.history.push('/dashboard');
    } );
  };

  _newsOnClick = id => {
    biqHelper.utils.clickTimeout( () => {
      let referrer = encodeURIComponent( btoa(this.props.location.pathname) );
      this.props.history.push( `/news/${id}/${referrer}` );
    } );
  };

  _onFetch = () => {
    let {dispatch} = this.props;
    dispatch( newsActions.newsFetch() );
  };

  _onFetched = obj => {

    let {dispatch} = this.props;

    if ( !this.state.is_ready )
      this.setState({data_is_ready: true}, ()=> {
        dispatch(newsActions.newsFetched({data: obj.data_all}));
      } );

    else
      dispatch(newsActions.newsFetched({data: obj.data_all}));

  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );

  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch( newsActions.newsReset() );
  }

  render() {

    let data = this.props.news.data;

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper l-news">

        <div className="biq-wrapper__inner l-news__inner">

          <HeaderMobile backBtnClick={this._backBtnClick} label={'Berita Terbaru'}/>

          <div className="l-news__nav visible-md-up">
            <Button className="back-btn" onClick={this._backBtnClick}>Kembali</Button>
          </div>

          <div className="l-news__panel">

            <div className="l-news__panel__header visible-md-up">
              <div className="title">Berita Terbaru</div>
            </div>

            <ScrollPagination className={ `l-news__panel__body` } biqLimit={15}
                biqUrl={`${biqConfig.api.url_base}/api/wallet/list_berita`}
                biqMethod={'GET'}
                onFetch={this._onFetch} onFetched={ this._onFetched }>

              {
                (!biqHelper.utils.isNull(data) && data.length > 0) || (this.state.data_is_ready && data.length === 0) ?

                  data.map( ( el, idx ) => {

                    return (
                      <Button className={`news-record${idx === 0 ? ' is-first' : ''}`} key={el.id} onClick={ () => this._newsOnClick( el.id ) }>
                        <div className="news-record__inner">

                          <div className="news-record__top">

                            <div className="info">
                              <div className="info__title">{el.title}</div>
                              <div className="info__date">{moment(el.date_create).format('D MMMM YYYY')}</div>
                            </div>

                            <div className="type-tag">{biqHelper.string.capitalize(el.tipe)}</div>

                          </div>

                          <div className="news-record__content">{el.summary.substring(0, 145)}...</div>

                        </div>
                      </Button>
                    );

                  })

                    :

                  <LatestNewsLoader/>

              }

            </ScrollPagination>

          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    news: state.news.news_list
  };
};

export default connect(mapStateToProps) (News);