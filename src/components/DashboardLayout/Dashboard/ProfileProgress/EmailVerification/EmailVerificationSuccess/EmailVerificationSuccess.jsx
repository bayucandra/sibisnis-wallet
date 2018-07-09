import React, { Component } from 'react';
import emailVerficationIcon from './../../../../../../images/icons/ico-verification-email.svg';

import './EmailVerificationSuccess.css';

const EmailVerificationSuccessMobile = (props) => {
  return (
    <div className="verification-success-mobile mobile-show__flex">
      <div className="verification-success-mobile__icon">
        <img src={emailVerficationIcon} alt="email-verification-icon" />
      </div>
      <div className="verification-success-mobile__title">Link Verifikasi Email telah terkirim</div>
      <div className="verification-success-mobile__description">
        Kami telah mengirim link verifikasi ke dwixxxxx@gmail.com , Silahkan mengklik link verifikasi tersebut untuk memverifikasi email Anda.
    </div>
      <div className="verification-success-mobile__actions">
        <div className="not-received-action">Belum menerima link verifikasi?</div>
        <div className="resend-action ripple action-btn">Kirim ulang link verifikasi</div>
      </div>
    </div>
  )
}

const EmailVerificationSuccessDesktop = (props) => {
  return (
    <div className="verification-success-desktop desktop-show__flex">
      <div className="email-verfication-success arrow_box">
        <div className="left-container">
          <div className="email-verification-icon">
            <img src={emailVerficationIcon} alt="" />
          </div>
        </div>
        <div className="right-container">
          <div className="email-verification-info">
            <div className="email-verification-info__title">Link Verifikasi Email telah terkirim</div>
            <div className="email-verification-info__description">
              Kami telah mengirim link verifikasi ke dwixxxxx@gmail.com , Silahkan mengklik link verifikasi tersebut untuk memverifikasi email Anda.
          </div>
          </div>
          <div className="email-verification-actions">
            <div className="not-received-action">Belum menerima link verifikasi?</div>
            <div className="resend-action action-btn">Kirim ulang link verifikasi</div>
          </div>
        </div>
      </div>
    </div>
  )
}

class EmailVerficationSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <EmailVerificationSuccessMobile />
        <EmailVerificationSuccessDesktop />
      </React.Fragment>
    )
  }
}

export default EmailVerficationSuccess;