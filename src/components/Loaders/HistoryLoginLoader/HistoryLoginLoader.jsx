import React from 'react';
import './HistoryLoginLoader.css';

const count = [1, 2, 3, 4, 5]

export const HistoryLoginMobileLoader = () => {
  return count.map((r, index) => {
    return (
      <div className="history-login-mobile-loader" key={index}>
        <div className="history-login-mobile-loader__name-placeholder"></div>
        <div className="history-login-mobile-loader__date-placeholder"></div>
      </div>
    )
  })
}

export const HistoryLoginDesktopLoader = () => {
  return (<React.Fragment>
    <div className="history-login-loader-container">
      <div className="history-login-loader-header">
        <div className="history-login-loader-header__date-placeholder header-text">Tanggal</div>
        <div className="history-login-loader-header__country-placeholder header-text">Negara</div>
        <div className="history-login-loader-header__ip-placeholder header-text">IP</div>
        <div className="history-login-loader-header__browser-placeholder header-text">Browser</div>
      </div>
      {count.map((r, index) => {
        return (
          <div className="history-login-desktop-loader" key={index}>
            <div className="history-login-desktop-loader__date-placeholder"></div>
            <div className="history-login-desktop-loader__country-placeholder"></div>
            <div className="history-login-desktop-loader__ip-placeholder"></div>
            <div className="history-login-desktop-loader__browser-placeholder"></div>
          </div>
        )
      })}
    </div>
  </React.Fragment>)
}