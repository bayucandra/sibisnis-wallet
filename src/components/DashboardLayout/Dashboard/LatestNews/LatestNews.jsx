import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NewsArticle from './NewsArticle/NewsArticle';

import './LatestNews.css';

class LatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="latest-news-container">
        <Card>
          <div className="latest-news-header">
            <div className="latest-news-header__left">Berita Terbaru</div>
            <div className="latest-news-header__right">Lihat Semua</div>
          </div>
          <div className="news-article-list">
            <NewsArticle
              title="BRI Gangguan"
              date="2 Agustus 2017 23:00:00"
              tags="Tips and Trik"
              readStatus={false}
              articleSummary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
            />
            <NewsArticle
              title="BRI Gangguan"
              date="2 Agustus 2017 23:00:00"
              tags="Tips and Trik"
              readStatus={false}
              articleSummary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
            />
            <NewsArticle
              title="BRI Gangguan"
              date="2 Agustus 2017 23:00:00"
              tags="Tips and Trik"
              readStatus={true}
              articleSummary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
            />
            <NewsArticle
              title="BRI Gangguan"
              date="2 Agustus 2017 23:00:00"
              tags="Tips and Trik"
              readStatus={true}
              articleSummary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default LatestNews;