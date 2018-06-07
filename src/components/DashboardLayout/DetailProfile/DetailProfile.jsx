import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import DetailProfileListItem from './DetailProfileListItem/DetailProfileListItem';
import NotificationBanner from './../../Shared/NotificationBanner/NotificationBanner';

import verificationIcon from './../../../images/icons/profile-verification-icons/ico-terverifikasi.svg';
import warningIcon from './../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import emailIcon from './../../../images/icons/profile-verification-icons/email.svg';
import phoneIcon from './../../../images/icons/profile-verification-icons/nomor-hp.svg';
import profileIcon from './../../../images/icons/profile-verification-icons/nama-lengkap.svg';
import locationIcon from './../../../images/icons/profile-verification-icons/ico-alamat.svg';
import cardIcon from './../../../images/icons/profile-verification-icons/ico-identitas.svg';
import passwordIcon from './../../../images/icons/profile-verification-icons/ico-password.svg';
import { navigationStatus } from "./../../../lib/utilities";

import './DetailProfile.css';

class DetailProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({ navigationState: 'Dashboard' });
  }

  render() {
    return (
      <div id="detail-profile">
        <Card className="custom-card-styles">
          <div className="detail-profile-container">
            <div className="detail-profile-header">
              <div className="detail-profile-header__title">Detail Profile</div>
              <NotificationBanner type="help" message="Untuk meningkat keamanan akun anda silahkan lengkapi profile yang bertanda warning" />
            </div>

            <div className="detail-profile-list">

              <DetailProfileListItem
              icon={profileIcon}
              title="Nama Lengkap"
              value="Bapak Dwinawan Hari Wijaya"
              status={true}
              description="Nama lengkap adalah info yang penting untuk memperlancar proses
              verifikasi untuk setiap transaksi saldo Anda"
              />
              <DetailProfileListItem
              icon={phoneIcon}
              title="Nomor Handphone"
              value=""
              status={false}
              description="Nomor handphone sangat penting digunakan untuk proses pengiriman
              token, Saat Anda melakukan transaksi"
              />
              <DetailProfileListItem
              icon={emailIcon}
              title="Email"
              status={true}
              value="dwinaxxxxx@gmail.com"
              description="Email sangat penting digunakan untuk proses pengiriman invoice dan cara pembayaran, Saat Anda melakukan transaksi"
              />
              <DetailProfileListItem
              icon={locationIcon}
              title="Alamat"
              value=""
              status={false}
              description="Alamat Anda adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda"
              />
              <DetailProfileListItem
              icon={cardIcon}
              title="Identitas"
              value=""
              status={false}
              description="Data Identitas Anda sangat penting digunakan untuk melakukan verifikasi pembayaran dalam jumlah yang besar."
              />
              <DetailProfileListItem
              icon={passwordIcon}
              title="Password"
              value=""
              status={true}
              description="Untuk keamanan akun anda lakukan penggantian password secara berkala, gunakan kombinasi huruf angka dan karakter."
              />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default DetailProfile;