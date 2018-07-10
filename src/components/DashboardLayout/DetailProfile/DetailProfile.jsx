// Node Modules
import React, { Component } from 'react';

// React Material
import Card from '@material-ui/core/Card';

// Custom Components
import DetailProfileListItem from './DetailProfileListItem/DetailProfileListItem';
import NotificationBanner from './../../Shared/NotificationBanner/NotificationBanner';

// Custom Libraries
import { navigationStatus } from "./../../../lib/utilities";

// Local Images
import emailIcon from './../../../images/icons/profile-verification-icons/email.svg';
import phoneIcon from './../../../images/icons/profile-verification-icons/nomor-hp.svg';
import profileIcon from './../../../images/icons/profile-verification-icons/nama-lengkap.svg';
import locationIcon from './../../../images/icons/profile-verification-icons/ico-alamat.svg';
import cardIcon from './../../../images/icons/profile-verification-icons/ico-identitas.svg';
import passwordIcon from './../../../images/icons/profile-verification-icons/ico-password.svg';

// Custom CSS
import './DetailProfile.css';

class DetailProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemListingData: [
        {
          id: 'name',
          icon: profileIcon,
          title: 'Nama Lengkap',
          value: 'Bapak Dwinawan Hari Wijaya',
          status: true,
          description: 'Nama lengkap adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda',
          edit: false
        },
        {
          id: 'phone',
          icon: phoneIcon,
          title: 'Nomor Handphone',
          value: '',
          status: false,
          description: 'Nomor handphone sangat penting digunakan untuk proses pengiriman token, Saat Anda melakukan transaksi',
          edit: false
        },
        {
          id: 'email',
          icon: emailIcon,
          title: 'Email',
          status: true,
          value: "dwinaxxxxx@gmail.com",
          description: "Email sangat penting digunakan untuk proses pengiriman invoice dan cara pembayaran, Saat Anda melakukan transaksi",
          edit: false
        },
        {
          id: 'location',
          icon: locationIcon,
          title: "Alamat",
          value: "",
          status: false,
          description: "Alamat Anda adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda",
          edit: true
        },
        {
          id: 'identity',
          icon: cardIcon,
          title: "Identitas",
          value: "",
          status: false,
          description: "Data Identitas Anda sangat penting digunakan untuk melakukan verifikasi pembayaran dalam jumlah yang besar.",
          edit: true
        },
        {
          id: 'password',
          icon: passwordIcon,
          title: "Password",
          value: "",
          status: true,
          description: "Untuk keamanan akun anda lakukan penggantian password secara berkala, gunakan kombinasi huruf angka dan karakter.",
          edit: true
        }
      ],
      notificationBannerStatus: 0
    }
  }

  componentWillMount() {
    navigationStatus.next({ navigationState: 'Detail Profile' });
  }

  componentDidMount(){
    this.setNotificationBannerStatus();
  }

  setNotificationBannerStatus = () => {
    let warning = 0;
    this.state.itemListingData.forEach((item) => {
      if (!item.status) {
        warning++;
      }
    })
    this.setState({ notificationBannerStatus: warning });
  }

  onActionClick = (action,type) =>{
    console.log(`${action} ${type}`);
  }

  render() {
    const { itemListingData, notificationBannerStatus } = this.state;
    return (
      <div id="detail-profile">
        <Card className="custom-card-styles">
          <div className="detail-profile-container">
            <div className="detail-profile-header">
              <div className="detail-profile-header__title">Detail Profile</div>
              {notificationBannerStatus > 0 ?
                <NotificationBanner type="help" message="Untuk meningkat keamanan akun anda silahkan lengkapi profile yang bertanda warning" /> : null
              }
            </div>
            <div className="detail-profile-list">
              {itemListingData.map((item, index) => {
                return (
                  <DetailProfileListItem
                    key={index}
                    id={item.id}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    status={item.status}
                    description={item.description}
                    edit={item.edit}
                    onActionClick={this.onActionClick.bind(this)}
                  />
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default DetailProfile;