import React from 'react';
import './ProfileLoader.css';

const count = [1, 2, 3, 4, 5];

export const ProfileInfoLoader = () => {
  return (
    <div className="profile-info-loader">
      <div className="profile-info-loader__image-placeholder"></div>
      <div className="profile-info-loader__name-placeholder"></div>
      <div className="profile-info-loader__email-placeholder"></div>
      <div className="divider"></div>
    </div>
  )
}

export const BalanceLoader = () => {
  return (
    <div className="balance-loader">
      <div className="balance-loader__text-placeholder">Saldo Anda</div>
      <div className="balance-loader__amount-placeholder"></div>
    </div>
  )
}

export const ProfileProgressLoader = () => {
  return (
    <div className="profile-progress-loader">
      <div className="profile-progress-loader__title-placeholder"></div>
      <div className="progress-status-container">
        <div className="progress-status-container__progressbar-placeholder"></div>
        <div className="progress-status-container__status-placeholder"></div>
      </div>
    </div>
  )
}

export const ProfileProgressListLoader = () => {
  return (
    <div className="profile-progress-list-loader-container">
      <div className="loader-title">
        <div className="loader-title__1-placeholder"></div>
        <div className="loader-title__2-placeholder"></div>
      </div>
      <div className="loader-list">
        {count.map((r, index) => {
          return (
            <div className="loader-list-item" key={index}>
              <div className="loader-list-item__icon-placeholder"></div>
              <div className="loader-list-item__title-placeholder"></div>
              <div className="loader-list-item__action-placeholder"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
