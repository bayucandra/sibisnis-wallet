// Node Modules
import React, { Component } from 'react';

// Custom Components
import LatestNews from '../Dashboard/LatestNews/LatestNews';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Redux
import newsActions from '../../../redux/actions/pages/newsActions';
import {connect} from 'react-redux';

// Custom CSS
import './AllNews.scss';
class AllNews extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({
      navigationLink: 'Berita Terbaru'
    });

    let {dispatch} = this.props;
    dispatch( newsActions.getNewsList() );
  }

  render() {
    const { newsList } = this.props;
    return (
      <div id="all-news-container">
        <PageBackButton />
        <LatestNews newsList={newsList} viewAll={true} />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    newsList: store.news.newsList
  }
};


export default connect(mapStateToProps)(AllNews);