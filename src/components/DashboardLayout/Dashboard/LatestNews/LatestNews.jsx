import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NewsArticle from './NewsArticle/NewsArticle';
import { withRouter } from 'react-router-dom';
import { LatestNewsLoader } from './../../../Loaders/LatestNewsLoader/LatestNewsLoader';

import './LatestNews.css';

class LatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount() {
    this.setState({articles:this.props.newsList});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({articles:nextProps.newsList});
  }

  onViewAllNews = () =>{
    this.props.history.push('/all-news');
  }
  render() {
    const { viewAll } = this.props;
    const { articles } = this.state;
    return (
      <div className={viewAll ? "latest-news-container all-news" : 'latest-news-container'}>
        <Card className="custom-card-styles">
          <div className="latest-news-header">
            <div className="latest-news-header__left">Berita Terbaru</div>
            <div className="latest-news-header__right ripple opacity-background" onClick={this.onViewAllNews.bind(this)}>Lihat Semua</div>
          </div>
          <div className="news-article-list">
            {articles ?
              articles.map((article, index) => {
                return (<NewsArticle
                  title={article.title}
                  date={article.date}
                  tags={article.tags}
                  key={index}
                  readStatus={article.readStatus}
                  articleSummary={article.articleSummary}
                />)
              })
              :
              <LatestNewsLoader />
            }
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(LatestNews);