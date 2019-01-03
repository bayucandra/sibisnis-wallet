import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as moment from 'moment';

import appActions from "redux/actions/global/appActions";
import newsDetailActions from "redux/actions/pages/newsDetailActions";

import biqHelper from "../../../../lib/biqHelper";

import {Button} from "components/Widgets/material-ui";

import "./NewsDetail.scss";

class NewsDetail extends Component {

  _backBtnClick = () => {
    biqHelper.utils.clickTimeout( () => {
      let referrer = atob(  decodeURIComponent( biqHelper.JSON.pathValueGet( this.props.match.params, 'referrer' ) ) );
      this.props.history.push( referrer );
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show: false } ) );

    let news_id = biqHelper.JSON.pathValueGet( this.props.match.params, 'news_id' );
    dispatch( newsDetailActions.newsDetailFetch( news_id ) );
  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch( newsDetailActions.newsDetailCanceled() );
  }

  render() {
    let data = biqHelper.JSON.pathValueGet( this.props.news_data.server_response, 'response.data' );
    data = biqHelper.utils.isNull( data ) ? {} : data;

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper l-news-detail">

        <div className="biq-wrapper__inner l-news-detail__inner">

          <div className="l-news-detail__nav">
            <Button className="back-btn" onClick={this._backBtnClick}>Kembali</Button>
          </div>

          <div className="l-news-detail__panel">

            <div className="l-news-detail__panel__header">

              <div className="heading">
                <div className="heading__title-and-tag">
                  <div className="title">{ data.title }</div>
                  <div className="tag visible-md-up">{ biqHelper.string.capitalize(data.tipe) }</div>
                </div>
                <div className="heading__date-and-tag">
                  <span className="date">{moment(data.date_create).format('D MMMM YYYY')}</span>
                  <span className="tag hidden-md-up"> | { biqHelper.string.capitalize(data.tipe) }</span>
                </div>
              </div>

              <div className="image"/>

            </div>

            <div className="l-news-detail__panel__body">
              { data.detail_berita }
            </div>

          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    news_data : state.newsDetail.news_data
  };
};

export default connect( mapStateToProps ) (NewsDetail);