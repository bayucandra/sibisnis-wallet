import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NewsArticle from './NewsArticle/NewsArticle';
import { withRouter } from 'react-router-dom';

import './LatestNews.css';

class LatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: "BRI Gangguan",
          date: "2 Agustus 2017 23:00:00",
          tags: "Tips and Trik",
          readStatus: false,
          articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15…"
        },
        {
          title: "BRI Gangguan",
          date: "2 Agustus 2017 23:00:00",
          tags: "Tips and Trik",
          readStatus: false,
          articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15…"
        },
        {
          title: "BRI Gangguan",
          date: "2 Agustus 2017 23:00:00",
          tags: "Tips and Trik",
          readStatus: true,
          articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
        },
        {
          title: "BRI Gangguan",
          date: "2 Agustus 2017 23:00:00",
          tags: "Tips and Trik",
          readStatus:  true,
          articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
        },
        {
          title: "BRI Gangguan",
          date: "2 Agustus 2017 23:00:00",
          tags: "Tips and Trik",
          readStatus: true,
          articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
        }
      ]
    }
  }
  onViewAllNews = () =>{
    this.props.history.push('/all-news');
  }
  render() {
    return (
      <div className={this.props.viewAll ? "latest-news-container all-news" : 'latest-news-container'}>
        <Card className="custom-card-styles">
          <div className="latest-news-header">
            <div className="latest-news-header__left">Berita Terbaru</div>
            <div className="latest-news-header__right ripple opacity-background" onClick={this.onViewAllNews.bind(this)}>Lihat Semua</div>
          </div>
          <div className="news-article-list">
            {this.state.data.map((article,index)=>{
             return( <NewsArticle
                title={article.title}
                date={article.date}
                tags={article.tags}
                key={index}
                readStatus={article.readStatus}
                articleSummary={article.articleSummary}
              />)
            })}
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(LatestNews);