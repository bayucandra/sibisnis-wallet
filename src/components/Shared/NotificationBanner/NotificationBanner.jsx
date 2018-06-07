import React, { Component } from 'react';
import HelpIconRed from './../../../images/icons/ico-help-red.svg';
import './NotificationBanner.css';

const NotificationBanner = (props) => {
  const { message } = props;
  return (
    <div className="notification-banner-container">
      <div className="notification-banner-container__icon">
        <img src={HelpIconRed} alt="help-icon" />
      </div>
      <div className="notification-banner-container__text">
        {message}
      </div>
    </div>
  )
}

export default NotificationBanner;