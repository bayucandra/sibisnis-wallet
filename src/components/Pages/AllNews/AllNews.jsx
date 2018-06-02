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
      navigationLink: 'Dashboard'
    })
  }

  render() {
    return (
      <div id="all-news-container">
        <PageBackButton />
        <LatestNews />
      </div>
    )
  }
}

export default AllNews;