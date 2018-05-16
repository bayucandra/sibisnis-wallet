
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import avatarPlacerholder from './../../../images/avatar-placeholder.png';
import profileSettings from './../../../images/icons/profile-settings.svg';
import ProfileButton from './../../Shared/ProfileButton/ProfileButton';

import './Profile.css';

const ProfileInfo = (props) => {
  const { name, email, image } = props;
  return (
    <div className="profile-info">
      <div className="profile-img">
        <img src={image} alt="profile-avatar" />
      </div>
      <div className="profile-name">{name ? name : 'N/A'}</div>
      <div className="profile-email">{email ? email : 'N/A'}</div>
      <div className="divider"></div>
    </div>
  )
}

// Saldo Anda Means Your Balance
const Balance = (props) => {
  const { balance } = props;
  return (
    <div className="balance-info">
      <div className="balance-text">Saldo Anda</div>
      <div className="balance-amount">Rp {balance}</div>
    </div>
  )
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  onBtnClick = () =>{
    alert('hello world');
  }

  render() {
    return (
      <div id="profile-card">
        <Card>
          <CardContent>
            <div className="profile-container">
              <img src={profileSettings} alt="profile-settings-icon" className="profile-settings-icon"/>
              <ProfileInfo
                name='Arziky Yusya'
                email="arzikyyu@gmail.com"
                image={avatarPlacerholder}
              />
              <Balance balance={'100.750.565'} />
              <div className="profile-buttons-container text-center">
                <ProfileButton value={'Tambah'} />
                <ProfileButton value={'Tarik'} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Profile;