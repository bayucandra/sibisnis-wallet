import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

/**
 * React Material Compoenents
 */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

/**
 * Custom Icons
 */
import dashboardIcon from './../../../images/icons/ico-dashboard.svg';
import mutasiIcon from './../../../images/icons/ico-mutasi.svg';
import transferIcon from './../../../images/icons/transfer-saldo.svg';
import rightArrow from './../../../images/icons/litle-right.svg';
import profileSettings from './../../../images/icons/profile-settings.svg';
import avatarPlacerholderBlank from './../../../images/avatar-placeholder-blank.svg';

/**
 * Custom Components
 */
import ProfileButton from './../../Shared/ProfileButton/ProfileButton';
/**
 * Custom Libraries
 */

import { navigationStatus, modalToggle } from "./../../../lib/utilities";

import './Profile.css';

const ProfileInfo = (props) => {
  const { name, email, image, imageAction } = props;
  return (
    <div className="profile-info">
      <div className="profile-info__img">
        <img src={image ? image : avatarPlacerholderBlank} alt="profile-avatar" onClick={imageAction} />
      </div>
      <div className="profile-info__name">{name ? name : 'N/A'}</div>
      <div className="profile-info__email">{email ? email : 'N/A'}</div>
      <div className="divider"></div>
    </div>
  )
}

// Saldo Anda Means Your Balance
const Balance = (props) => {
  const { balance } = props;
  return (
    <div className="balance-info">
      <div className="balance-info__text">Saldo Anda</div>
      <div className="balance-info__amount">Rp {balance}</div>
    </div>
  )
}

const ProfileNavButton = (props) => {
  const { icon, name, onClick, active } = props;
  return (
    <React.Fragment>
      {/* <div className="custom-divider"></div> */}
      <ListItem button className={(active ? "profile-nav-list-item profile-nav-btn-active" : "profile-nav-list-item")} onClick={onClick}>
        <div className="profile-nav-btn">
          <ListItemIcon>
            <img className="profile-nav-btn__icon" src={icon} alt="list-icon" />
          </ListItemIcon>
          <div className="profile-nav-btn__text">{name}</div>
          <img className="profile-nav-btn__navicon" src={rightArrow} alt="right-arrow" />
        </div>
      </ListItem>
    </React.Fragment>
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

  onProfileSettingClick = () => {
    this.props.history.push('/dashboard/detail-profile');
  }

  onProfileImageClick = () => {
    modalToggle.next({status:true});
  }

  onLinkClick = (name) => {
    navigationStatus.next({ navigationState: name});
  }

  render() {
    return (
      <div id="profile-card">
        <Card className="custom-card-styles profile-card-container">
          <CardContent className="profile-card-content-container">
            <div className="profile-container">
              <ReactTooltip className="custom-tooltip-profile" place="left" type="dark" effect="solid" />
              <div data-tip='Profile anda' className="profile-settings-icon-container icon-touch-area-container-50 ripple icon-background" onClick={this.onProfileSettingClick.bind(this)}>
                <img src={profileSettings} alt="profile-settings-icon" className="profile-settings-icon" />
              </div>
              <ProfileInfo
                name='Arziky Yusya'
                email="arzikyyu@gmail.com"
                image={null}
                imageAction={this.onProfileImageClick.bind(this)}
              />
              <Balance balance={'100.750.565'} />
              <div className="profile-buttons-container text-center">
                <ProfileButton value={'Tambah'} />
                <span className="dot-desktop"></span>
                <ProfileButton value={'Tarik'} style={{'marginBottom':'0px'}}/>
              </div>
            </div>
          </CardContent>
          <div className="profile-nav-container">
            <List className="profile-nav-list-container">
              <ProfileNavButton icon={dashboardIcon} name="Dashboard" onClick={this.onLinkClick.bind(this,'Dashboard','Profile')} active={true}/>
              <ProfileNavButton icon={mutasiIcon} name="Mutasi Saldo" onClick={this.onBtnClick.bind(this)} active={false}/>
              <ProfileNavButton icon={transferIcon} name="Transfer Saldo" onClick={this.onBtnClick.bind(this)} active={false} />
            </List>
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(Profile);