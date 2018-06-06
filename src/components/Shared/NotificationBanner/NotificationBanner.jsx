import React, { Component } from 'react';
import HelpIcon from './../../../images/icons/ico-help.svg';
import './NotificationBanner.css';

const NotificationBanner = (props) => {
  const { message } = props;
  return (
    <div className="notification-banner-container">
      <div className="notification-banner-container__icon">
        <img src={HelpIcon} alt="help-icon" />
      </div>
      <div className="notification-banner-container__text">
        {message}
      </div>
    </div>
  )
}

export default NotificationBanner;