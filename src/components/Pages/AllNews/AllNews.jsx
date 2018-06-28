import React, { Component } from 'react';

// Custom Components
import LatestNews from './../../DashboardLayout/Dashboard/LatestNews/LatestNews';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Redux
import { getNewsList } from './../../../redux/actions/NewsActions';
import {connect} from 'react-redux';

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

    this.props.getNewsList();
  }

  render() {
    const { newsList } = this.props;
    return (
      <div id="all-news-container">
        <PageBackButton />
        {newsList ? <LatestNews newsList={newsList} viewAll={true} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    newsList: store.NewsReducer.newsList
  }
}

const mapDispatchToProps = {
  getNewsList
}


export default connect(mapStateToProps, mapDispatchToProps)(AllNews);