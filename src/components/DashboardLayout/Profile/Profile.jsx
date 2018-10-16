import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

/**React Material Compoenents*/
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

/**External libraries*/
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';
import $ from 'jquery';

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
import { modalTypes } from './../../../lib/constants';
import biqHelper from '../../../lib/biqHelper';

// Redux
import { connect } from 'react-redux';

// Loaders
import { ProfileInfoLoader, BalanceLoader } from './../../Loaders/ProfileLoader/ProfileLoader';

import './Profile.scss';
import '../../../components/Shared/Modal/Modal.scss';
import profileTestImage from './../../../images/test.jpg';
import PhotoUpload from "../../Upload/PhotoUpload/PhotoUpload";
import closeIconBlack from "../../../images/icons/ico-close-black.svg";

const ProfileInfo = (props) => {
  let { name, email, image, imageAction } = props;
  name = biqHelper.utils.isNull( name ) ? 'N/A': name;
  biqHelper.utils.assignDefault( email, 'N/A' );
  return (
    <div className="profile-info">
      <div className="profile-info__img" style={{ 'backgroundImage': "url(" + (image ? image : avatarPlacerholderBlank) + ")" }} onClick={imageAction.bind(this, image ? image : null)}>
      </div>
      <div className="profile-info__name">{name ? name : 'N/A'}</div>
      <div className="profile-info__email">{email ? email : 'N/A'}</div>
      <div className="divider"></div>
    </div>
  )
};

// Saldo Anda Means Your Balance
const Balance = (props) => {
  let { balance } = props;
  biqHelper.utils.assignDefault( balance, 'N/A' );
  return (
    <div className="balance-info">
      <div className="balance-info__text">Saldo Anda</div>
      <NumberFormat displayType={'text'} value={balance} prefix={'Rp '} renderText={value => <div className="balance-info__amount">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
    </div>
  )
};

const ProfileNavButton = (props) => {
  const { icon, name, onClick, active } = props;

  return (
    <React.Fragment>
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
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_is_open: true,
      modal_active_component: PhotoUpload
    };
  }

  modalSetActiveComponent = ( component ) => {
    this.setState({ modal_active_component: component });
  };

  onBtnClick = () => {
    alert('hello world');
  };

  onProfileSettingClick = () => {
    this.props.history.push('/dashboard/detail-profile');
  };

  // Will navigate to add balance pages
  onTambahClick = () => {
    this.props.history.push('/dashboard/deposit-requirements-check');
    // navigationStatus.next({ navigationState: 'Tambah Saldo'});
  };

  onProfileImageClick = (image) => {
    if ( biqHelper.utils.isNull( image )) {
      this.modalSetActiveComponent( PhotoUpload );
      this.setState({ modal_is_open: true });
    } else {
    }
  };

  modalClose = () => {
    this.setState({ modal_is_open: false });
  };

/*
  onProfileImageClick = (image) => {
    if (!image) {
      modalToggle.next({ status: true, type: modalTypes.imageUpload });
    } else {
      modalToggle.next({ status: true, type: modalTypes.profileImagePreview, payload: { image: image } });
    }
  };*/

  onLinkClick = (name) => {
    navigationStatus.next({ navigationState: name});
    if (window.innerWidth > 767) {
      this.props.history.replace('/');
    }
  };

  render() {
    const {user_profile} = this.props;
    let ModalActiveComponent = this.state.modal_active_component;
    return (
      <div id="profile-card">
        <Card className="custom-card-styles profile-card-container">
          <CardContent className="profile-card-content-container">
            <div className="profile-container">
              <ReactTooltip className="custom-tooltip-profile" place="left" type="dark" effect="solid" />
              <div data-tip='Profile anda' className="profile-settings-icon-container icon-touch-area-container-50 ripple icon-background" onClick={this.onProfileSettingClick.bind(this)}>
                <img src={profileSettings} alt="profile-settings-icon" className="profile-settings-icon" />
              </div>
              {!biqHelper.utils.isNull( user_profile ) ?
                <ProfileInfo
                  name={user_profile.nama}
                  email={user_profile.email}
                  image={user_profile.profilePicture ? user_profile.profilePicture : null}
                  imageAction={ this.onProfileImageClick }
                  // image={null}
                  // imageAction={this.onProfileImageClick}
                /> :
                <ProfileInfoLoader />
              }
              {!biqHelper.utils.isNull( user_profile )?
                <Balance balance={user_profile.saldo} />
                :
                <BalanceLoader />
              }
              <div className="profile-buttons-container text-center">
                <ProfileButton onClick={this.onTambahClick.bind(this)} value={'Tambah'} />
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

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal_is_open}
          onClose={this.modalClose}>

            <div className="photo-upload">
              <ModalActiveComponent modalSetActiveComponent={this.modalSetActiveComponent} modalClose={this.modalClose}/>
            </div>

        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    user_profile: store.app.profile
  }
};

export default withRouter( connect(mapStateToProps)(Profile) );