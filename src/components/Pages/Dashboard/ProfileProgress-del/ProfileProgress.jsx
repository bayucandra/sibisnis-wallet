// Node Modules
import React, { Component } from 'react';

// React Material
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Custom Components
import Progressbar from '../../../Shared/Progressbar/Progressbar';
import ProfileActionButton from '../../../Shared/ProfileActionButton/ProfileActionButton';
import { ProfileProgressLoader, ProfileProgressListLoader } from '../../../Loaders/ProfileLoader/ProfileLoader';
import EmailVerification from './EmailVerification/EmailVerificiation';

// Custom Libraries
import { modalToggle } from '../../../../lib/utilities';
import { modalTypes } from '../../../../lib/constants';

// Redux
import {connect} from 'react-redux';

// Local Images
import verificationIcon from '../../../../images/icons/profile-verification-icons/ico-terverifikasi.svg';
import warningIcon from '../../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import emailIcon from '../../../../images/icons/profile-verification-icons/email.svg';
import phoneIcon from '../../../../images/icons/profile-verification-icons/nomor-hp.svg';
import profileIcon from '../../../../images/icons/profile-verification-icons/nama-lengkap.svg';
import locationIcon from '../../../../images/icons/profile-verification-icons/ico-alamat.svg';
import cardIcon from '../../../../images/icons/profile-verification-icons/ico-identitas.svg';

// Custom CSS
import './ProfileProgress.scss';

const ProgressBar = (props) => {
  const { value } = props;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-container__text">Tingkat Keamanan Akun Anda</div>
      <div className="progress-status-container">
        <Progressbar height="12px" value={value} color="#38bf0a" />
        <div className="progress-status">LEMAH</div>
      </div>
    </div>
  )
}

const ProfileVerificationList = (props) =>{
  const { user, onItemClick, emailVerificationStatus } = props;
  return(
    <React.Fragment>
      <div className="profile-verfication-list">

        <CardContent>
          <div className="profile-verfication-list__content">
            Silahkan melakukan hal dibawah ini meningkatkan keamanan akun Anda
          </div>
        </CardContent>
        <div className="profile-verfication-list__container">
          <VerificationListItem icon={phoneIcon}  type="text" name="phone" title="Verifikasi Nomor Handphone Anda" status={user.phoneVerfication} />
          <VerificationListItem icon={emailIcon}  type="text" name="email" title="Verifikasi Email Anda" status={user.emailVerification} emailVerificationStatus={emailVerificationStatus} itemClick={onItemClick} />
          {emailVerificationStatus ? <EmailVerification /> : null}
          <VerificationListItem icon={profileIcon} type="upload" name="profile" title="Upload foto profil Anda" status={false} />
          <VerificationListItem icon={locationIcon} type="text" name="location" title="Lengkapi Data Alamat Anda" status={false} />
          <VerificationListItem icon={cardIcon} type="text" name="card " title="Lengkapi Info Data Identitas Anda"  status={false} />
        </div>
      </div>
    </React.Fragment>
  )
}

const VerificationListItem = (props) => {
  const { icon, name, status, type, title, itemClick, emailVerificationStatus } = props;
  return (
    <React.Fragment>
      <ListItem className={"varification-list-item-container ripple-mobile "+(emailVerificationStatus ? 'border-0' : '' )}>
        <div className="list-item-mobile-action" onClick={itemClick ? itemClick.bind(this,name) : null}></div>
        <div className="varification-list-item">
          <ListItemIcon>
            <div className="varification-list-item__icon-contianer">
              <img className="varification-list-item__icon" src={icon} alt="list-icon" />
            </div>
          </ListItemIcon>
          <div className="varification-list-item__text">{title}</div>
          <div className="mobile-varification-status">
            {status === true ?
              <img className="varification-list-item__navicon verification-icon" src={verificationIcon} alt="verification-icon" />
              :
              <img className="varification-list-item__navicon warning-icon" src={warningIcon} alt="warning-icon" />
            }
          </div>
          <div className="desktop-verification-status">
            {status ?
              <div className="verification-icon-container">
                <img className="varification-list-item__navicon verification-icon" src={verificationIcon} alt="verification-icon" />
                <span className="verification-icon-container__text">Sudah Terverifikasi</span>
              </div>
              :
              <div className="verification-action-container">
                {emailVerificationStatus ?
                  <div className="close-email-verification-form-btn" onClick={itemClick ? itemClick.bind(this,name) : null}>Tutup</div> :
                  <React.Fragment>
                    {type === 'text' ?
                      <ProfileActionButton  onClick={itemClick ? itemClick.bind(this,name) : null} label="Lengkapi Sekarang" />
                      :
                      <ProfileActionButton label="Upload Sekarang" />
                    }
                  </React.Fragment>
                }
              </div>
            }
          </div>
        </div>
      </ListItem>
    </React.Fragment>
  )
}

class ProfileProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailVerificationStatus: false
    }
  }

  onVerificationItemClick = (clickedItem) =>{
    if (clickedItem === 'email') {
      if (window.innerWidth < 768) {
        modalToggle.next({ status: true, type: modalTypes.emailVerification });
      }else{
        this.emailVerificationToggle();
      }
    }
  }

  emailVerificationToggle = () =>{
    this.setState({ emailVerificationStatus: !this.state.emailVerificationStatus });
  }

  render() {
    const user = this.props.user_profile.nama;
    return (
      <div id="profile-progress-container">
        <Card className="custom-card-styles">
          <CardContent>
          {user ? <ProgressBar value={48} /> : <ProfileProgressLoader />}
          </CardContent>
          {user ?
            <ProfileVerificationList
              user={user}
              emailVerificationStatus={this.state.emailVerificationStatus}
              emailVerificationToggle={this.emailVerificationToggle}
              onItemClick={this.onVerificationItemClick} />
            : <ProfileProgressListLoader />}
        </Card>
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    user_profile: store.user.profile
  }
};


export default connect(mapStateToProps)(ProfileProgress);