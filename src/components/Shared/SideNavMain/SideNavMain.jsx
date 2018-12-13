import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

/**React Material Compoenents*/
import {List, ListItem, ListItemIcon} from '@material-ui/core';
import {Button} from "components/Widgets/material-ui";

/**External libraries*/
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';

/**
 * Custom Icons
 */
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

import biqHelper from "../../../lib/biqHelper/index";
import biqConfig from "../../../providers/biqConfig";

// Loaders
import { ProfileInfoLoader, BalanceLoader } from '../../Loaders/ProfileLoader/ProfileLoader';

import './SideNavMain.scss';
import '../../../components/Shared/Modal/Modal.scss';


class SideNavMain extends Component {

  state = {
    modal_is_open: false,
    modal_active_component: PhotoUpload
  };

  modalSetActiveComponent = ( component ) => {
    this.setState({ modal_active_component: component });
  };

  onProfileSettingClick = () => {
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push('/profile');
    } );
  };

  _onNavigationClick = (path) => {
    biqHelper.utils.clickTimeout( {
      callback: () =>{
        this.props.history.push(path);
      }
    } );
  };

  _onDashboardBtnClick = () => {
    biqHelper.utils.clickTimeout( () => {

      if (
        this.props.location.pathname !== '/dashboard'
      ) {
        this._onNavigationClick('/dashboard');
      }

      if (typeof this.props.dashboardPanelMobileToggle === 'function') {
        this.props.dashboardPanelMobileToggle();
      }

    } );
  };

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

  render() {
    const {user} = this.props;
    let {cssClasses} = this.props;
    let ModalActiveComponent = this.state.modal_active_component;

    cssClasses = biqHelper.utils.isNull(cssClasses) ? '' : ` ${cssClasses}`;

    let profile_detail_btn_class = this.props.location.pathname === '/profile' ? ' is-active' : '';

    let is_desktop_page = this.props.location.pathname === '/dashboard';
    let is_mutasi_saldo_page = false;
    let is_transfer_saldo_page = false;

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
              <Button className="balance__btn balance__btn--add" onClick={() => this._onNavigationClick('/balance')}>Tambah</Button>
              <div className="balance__divider visible-md-up" />
              <Button className="balance__btn balance__btn--withdraw">Tarik</Button>
            </div>

          </div>

          <div className="nav-btn-wrapper">

            <Button className={ `nav-btn${ is_desktop_page ? ' is-active' : '' }` } onClick={ this._onDashboardBtnClick }>
              <div className="nav-btn__inner">
                <div className="icon icon--home"/>
                <div className="label">Dashboard</div>
                <div className="arrow hidden-md-up"/>
              </div>
            </Button>

            <Button className={ `nav-btn${ is_mutasi_saldo_page ? ' is-active' : '' }` } onClick={ () => this._onNavigationClick('/balance-mutation') }>
              <div className="nav-btn__inner">
                <div className="icon icon--mutasi"/>
                <div className="label">Mutasi Saldo</div>
                <div className="arrow hidden-md-up"/>
              </div>
            </Button>

            <Button className={ `nav-btn nav-btn--transfer-saldo${ is_transfer_saldo_page ? ' is-active' : '' }` }  onClick={ () => this._onNavigationClick('/dashboard') }>
              <div className="nav-btn__inner">
                <div className="icon icon--transfer-saldo"/>
                <div className="label">Transfer Saldo</div>
                <div className="arrow hidden-md-up"/>
              </div>
            </Button>

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