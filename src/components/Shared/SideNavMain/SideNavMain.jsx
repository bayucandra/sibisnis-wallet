import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

/**React Material Compoenents*/
import {List, ListItem, ListItemIcon} from '@material-ui/core';
import {Button} from "../../Widgets/material-ui";

/**External libraries*/
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';

/**
 * Custom Icons
 */
import dashboardIcon from '../../../images/icons/ico-dashboard.svg';
import mutasiIcon from '../../../images/icons/ico-mutasi.svg';
import transferIcon from '../../../images/icons/transfer-saldo.svg';
import rightArrow from '../../../images/icons/litle-right.svg';
import profileSettings from '../../../images/icons/profile-settings.svg';
import avatarPlacerholderBlank from '../../../images/avatar-placeholder-blank.svg';

/**
 * Custom Components
 */
import ProfileImagePreview from './ProfileImagePreview/ProfileImagePreview';
import PhotoUpload from "../PhotoUpload/PhotoUpload";

/**
 * Custom Libraries
 */

import { navigationStatus } from "../../../lib/utilities";
import biqHelper from "../../../lib/biqHelper/index";
import biqConfig from "../../../providers/biqConfig";

// Loaders
import { ProfileInfoLoader, BalanceLoader } from '../../Loaders/ProfileLoader/ProfileLoader';

import './SideNavMain.scss';
import '../../../components/Shared/Modal/Modal.scss';


const ProfileNavButton = (props) => {
  const { icon, name, onClick, active } = props;

  return (
    <ListItem button className={ `profile-nav-list-item${ active ? ' is-active' : '' }` } onClick={onClick}>
      <div className="profile-nav-btn">
        <ListItemIcon>
          <img className="profile-nav-btn__icon" src={icon} alt="list-icon" />
        </ListItemIcon>
        <div className="profile-nav-btn__text">{name}</div>
        <img className="profile-nav-btn__navicon" src={rightArrow} alt="right-arrow" />
      </div>
    </ListItem>
  )
};

class SideNavMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal_is_open: false,
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
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push('/profile');
    } );
  };

  // Will navigate to add balance pages
  onTambahClick() {
    biqHelper.utils.clickTimeout( {
      callback: () =>{
        this.props.history.push('/balance');
      }
    } );
    // navigationStatus.next({ navigationState: 'Tambah Saldo'});
  }

  onProfileImageClick(image) {
    if ( biqHelper.utils.isNull( image )) {
      this.modalSetActiveComponent( PhotoUpload );
      this.setState({ modal_is_open: true });
    } else {
      this.modalSetActiveComponent( ProfileImagePreview );
      this.setState({ modal_is_open: true });
    }
  };

  _balanceRender() {

    const {saldo} = this.props.user.profile;
    biqHelper.utils.assignDefault( saldo, 'N/A' );
    return (
      <div className="balance-info">
        <div className="balance-info__text">Saldo Anda</div>
        <NumberFormat displayType={'text'} value={saldo} prefix={'Rp '} renderText={value => <div className="balance-info__amount">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
      </div>
    )

  }

  _profileInfoRender() {
    const { nama, email, photo } = this.props.user.profile;

    let profileImageUrl = !biqHelper.utils.isNull( photo ) ?
        `${biqConfig.profile_photo_url_base}/${encodeURI( photo )}` :
        avatarPlacerholderBlank;

    return (
      <div className="profile-info">
        <div className="profile-info__img"
             style={{ 'backgroundImage': "url(" + ( profileImageUrl ) + ")" }}
             onClick={this.onProfileImageClick.bind(this, !biqHelper.utils.isNull( photo ) ? photo : null)}>
        </div>
        <div className="profile-info__name">{ biqHelper.utils.isNull( nama ) ? 'N/A': nama }</div>
        <div className="profile-info__email">{ biqHelper.utils.isNull( email ) ? 'N/A': email }</div>
        <div className="divider" />
      </div>
    )
  };

  modalClose = () => {
    this.setState({ modal_is_open: false });
  };

  onLinkClick = (name) => {
    navigationStatus.next({ navigationState: name});
    if (window.innerWidth > 767) {
      this.props.history.push('/');
    }
  };

  render() {
    const {user} = this.props;
    let {cssClasses} = this.props;
    let ModalActiveComponent = this.state.modal_active_component;

    cssClasses = biqHelper.utils.isNull(cssClasses) ? '' : ` ${cssClasses}`;

    let profile_detail_btn_class = this.props.location.pathname === '/profile' ? ' is-active' : '';

    return (
      <>

        <div className= {`side-nav-main${cssClasses}`}>

          <div className="profile">

            <ReactTooltip className="profile-tool-top" place="left" type="dark" effect="solid" />

            <Button className={ `profile-detail-btn${profile_detail_btn_class}` } onClick={this.onProfileSettingClick} data-tip="Profile anda">&nbsp;</Button>

            {!biqHelper.utils.isNull( user ) ?
              this._profileInfoRender()
              :
              <ProfileInfoLoader />
            }

            {!biqHelper.utils.isNull( user )?
              this._balanceRender()
              :
              <BalanceLoader />
            }

            <div className="balance">
              <Button className="balance__btn balance__btn--add" onClick={this.onTambahClick.bind(this)}>Tambah</Button>
              <div className="balance__divider visible-md-up" />
              <Button className="balance__btn balance__btn--withdraw">Tarik</Button>
            </div>

          </div>

          <div className="profile-nav-container">
            <List className="profile-nav-list-container">
              <ProfileNavButton icon={dashboardIcon} name="Dashboard" onClick={this.onLinkClick.bind(this,'Dashboard','Profile')} active={matchPath( this.props.location.pathname, '/dashboard' )}/>
              <ProfileNavButton icon={mutasiIcon} name="Mutasi Saldo" onClick={this.onBtnClick.bind(this)} active={false}/>
              <ProfileNavButton icon={transferIcon} name="Transfer Saldo" onClick={this.onBtnClick.bind(this)} active={false} />
            </List>
          </div>

        </div>

        <Modal
          aria-labelledby="modal-upload"
          aria-describedby="modal-upload-desc"
          open={this.state.modal_is_open}
          onClose={this.modalClose}>

            <div className="modal-inner">
              <ModalActiveComponent modalSetActiveComponent={this.modalSetActiveComponent} modalClose={this.modalClose}/>
            </div>

        </Modal>

      </>
    )
  }//render()

}//class Profile

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
};

export default withRouter( connect( mapStateToProps ) (SideNavMain) );