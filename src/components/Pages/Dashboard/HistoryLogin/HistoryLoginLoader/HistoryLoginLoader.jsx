import React from 'react';
import './HistoryLoginLoader.scss';
import biqHelper from "../../../../../lib/biqHelper";

const count = [1, 2, 3, 4, 5];

export const HistoryLoginMobileLoader = () => {
  return count.map((r, index) => {
    return (
      <div className="history-login-mobile-loader hidden-md-up" key={index}>
        <div className="history-login-mobile-loader__name-placeholder"/>
        <div className="history-login-mobile-loader__date-placeholder"/>
      </div>
    )
  })
};

export const HistoryLoginDesktopLoader = ( props ) => {

  const no_header = biqHelper.utils.isNull(props.noHeader) ? false : props.noHeader;

  return (
    <div className="history-login-loader-container">
      {
        !no_header &&
        <div className="history-login-loader-header">
          <div className="history-login-loader-header__date-placeholder header-text">Tanggal</div>
          <div className="history-login-loader-header__country-placeholder header-text">Negara</div>
          <div className="history-login-loader-header__ip-placeholder header-text">IP</div>
          <div className="history-login-loader-header__browser-placeholder header-text">Browser</div>
        </div>
      }

      {count.map((r, index) => {
        return (
          <div className="history-login-desktop-loader" key={index}>
            <div className="history-login-desktop-loader__date-placeholder"/>
            <div className="history-login-desktop-loader__country-placeholder"/>
            <div className="history-login-desktop-loader__ip-placeholder"/>
            <div className="history-login-desktop-loader__browser-placeholder"/>
          </div>
        )
      })}
    </div>
  );

};