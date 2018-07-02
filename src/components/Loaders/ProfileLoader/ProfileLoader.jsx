import React from 'react';
import './ProfileLoader.css';

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