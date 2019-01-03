import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';

import dashboardActions from "redux/actions/pages/dashboardActions";

import biqHelper from "lib/biqHelper";

import {Button} from "components/Widgets/material-ui";
import LatestNewsLoader from "components/Loaders/LatestNewsLoader/LatestNewsLoader";

import "./DashboardNews.scss";

class DashboardNews extends Component {

  _onAllNewsClick = () => {
    biqHelper.utils.clickTimeout( () => this.props.history.push('/news') );
  };

  _newsOnClick = id => {
    biqHelper.utils.clickTimeout( () => {
      let referrer = encodeURIComponent( btoa( this.props.location.pathname ) );
      this.props.history.push( `/news/${id}/${referrer}` );
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( dashboardActions.dashboardNewsFetch() );
  }

  render() {

    const is_fetched = this.props.news.is_fetched;
    const is_success = biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet( this.props.news.server_response, 'status' ) );

    const data = biqHelper.JSON.pathValueGet( this.props.news.server_response, 'response.data' );

    return (
      <div className="dashboard-news">

        <div className="dashboard-news__header">
          <div className="title">Berita Terbaru</div>
          <Button className="all-news-btn" onClick={this._onAllNewsClick}>Lihat Semua</Button>
        </div>

        <div className="dashboard-news__body">

          {

            is_fetched && is_success ?

              data.map( (el) => {
                return (
                  <Button className={`news-record${ el.status === 1 ? ' is-unread' : '' }`} key={el.id} onClick={ () => this._newsOnClick( el.id ) }>
                    <div className="news-record__inner">

                      <div className="news-record__top">

                        <div className="info">
                          <div className="info__title">{ el.title }</div>
                          <div className="info__date">{ moment(el.date_create).format( 'D MMMM YYYY' ) }</div>
                        </div>

                        <div className="type-tag">{  biqHelper.string.capitalize(el.tipe) }</div>

                      </div>

                      <div className="news-record__content">{ el.summary.substring( 0, 145 ) }...</div>

                    </div>
                  </Button>
                );
              } )

              :

            <LatestNewsLoader/>
          }



        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {

  return {
    news: state.dashboard.news
  }

};

export default withRouter( connect( mapStateToProps ) (DashboardNews) );