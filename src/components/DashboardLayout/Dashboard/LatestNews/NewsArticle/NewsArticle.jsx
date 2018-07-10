// Node Modules
import React from 'react';

// Custom CSS
import './NewsArticle.css';

const NewsArticle = (props) => {
  const { title, date, tags, articleSummary, readStatus } = props;
  return (
    <div className="news-article-container ripple opacity-background">
      {!readStatus ? <div className="news-read-pending"></div> : null}
      <div className="news-article-inner-container">
        <div className="news-article-header">
          <div className="news-article-header-top">
            <div className={"news-article-header-top__title " + (readStatus ? "news-read-font-weight" : "")}>{title}</div>
            <div className="news-article-header-top__tags">{tags}</div>
          </div>
          <div className="news-article-header-bottom">
            <div className="news-article-header-bottom__date">{date}</div>
          </div>
        </div>
        <div className={"news-article-body " + (readStatus ? "news-read-font-weight" : "")}>
          {articleSummary}
        </div>
      </div>
    </div>
  )
}

export default NewsArticle;