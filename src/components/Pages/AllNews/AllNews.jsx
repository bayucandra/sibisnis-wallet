import React, { Component } from 'react';
import { navigationStatus } from './../../../lib/utilities';
import LatestNews from './../../DashboardLayout/Dashboard/LatestNews/LatestNews';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';

import './AllNews.css';
class AllNews extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({
      navigationLink: 'Berita Terbaru'
    })
  }

  render() {
    return (
      <div id="all-news-container">
        <PageBackButton />
        <LatestNews viewAll={true}/>
      </div>
    )
  }
}

export default AllNews;