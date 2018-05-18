import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import verificationIcon from './../../../../images/icons/profile-verification-icons/ico-terverifikasi.svg';
import warningIcon from './../../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import emailIcon from './../../../../images/icons/profile-verification-icons/email.svg';
import phoneIcon from './../../../../images/icons/profile-verification-icons/nomor-hp.svg';
import profileIcon from './../../../../images/icons/profile-verification-icons/nama-lengkap.svg';
import locationIcon from './../../../../images/icons/profile-verification-icons/ico-alamat.svg';
import cardIcon from './../../../../images/icons/profile-verification-icons/ico-identitas.svg';

import Progressbar from './../../../Shared/Progressbar/Progressbar';
import './ProfileProgress.css';


const ProgressBar = (props) => {
  const { value } = props;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-container__text">Tingkat Keamanan Akun Anda</div>
      <div className="progress-status-container">
        <Progressbar height="10px" value={value} color="#38bf0a" />
        <div className="progress-status">LEMAH</div>
      </div>
    </div>
  )
}

const ProfileVerificationList = (props) =>{
  return(
    <React.Fragment>
      <div className="profile-verfication-list">

        <CardContent>
          <div className="profile-verfication-list__content">
            Silahkan melakukan hal dibawah ini meningkatkan keamanan akun Anda
          </div>
        </CardContent>
        <div className="profile-verfication-list__container">
          <VerificationListItem icon={phoneIcon} name="Verifikasi Nomor Handphone Anda" status={false} />
          <Divider />
          <VerificationListItem icon={emailIcon} name="Verifikasi Email Anda" status={true} />
          <Divider />
          <VerificationListItem icon={profileIcon} name="Upload foto profil Anda" status={false} />
          <Divider />
          <VerificationListItem icon={locationIcon} name="Lengkapi Data Alamat Anda" status={false} />
          <Divider />
          <VerificationListItem icon={cardIcon} name="Lengkapi Info Data Identitas Anda" status={false} />
        </div>
      </div>
    </React.Fragment>
  )
}

const VerificationListItem = (props) => {
  const { icon, name, status } = props;
    return (
    <React.Fragment>
      <ListItem>
          <div className="varification-list-item">
            <ListItemIcon>
              <div className="varification-list-item__icon-contianer">
                <img className="varification-list-item__icon" src={icon} alt="list-icon" />
              </div>
            </ListItemIcon>
          <div className="varification-list-item__text">{name}</div>
          {status === true ?
            <img className="varification-list-item__navicon verification-icon" src={verificationIcon} alt="verification-icon" />
            :
            <img className="varification-list-item__navicon" src={warningIcon} alt="verification-icon" />
          }
        </div>
      </ListItem>
    </React.Fragment>
  )
}

class ProfileProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="profile-progress-container">
        <Card>
          <CardContent>
            <ProgressBar value={48} />
          </CardContent>
          <Divider />
            <ProfileVerificationList />
        </Card>
      </div>
    )
  }
}

export default ProfileProgress;