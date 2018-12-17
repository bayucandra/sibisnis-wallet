import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

/**React Material Compoenents*/
import {List, ListItem, ListItemIcon} from '@material-ui/core';
import {Button} from "components/Widgets/material-ui";

import appActions from "redux/actions/global/appActions";

/**External libraries*/
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';

/**
 * Custom Icons
 */
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
import '../../../styles/components/_modal.scss';
import PhotoUploadFile from "../PhotoUploadFile/PhotoUploadFile";


class SideNavMain extends Component {

  state = {
    modal_is_open: false,
    modal_active_component: PhotoUpload
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

  _onProfileImageClick = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appProfilePhotoDialogOpen('select-dialog') );
  };

  _balanceRender() {

    const {saldo} = this.props.user_profile;
    biqHelper.utils.assignDefault( saldo, 'N/A' );
    return (
      <div className="balance-info">
        <div className="balance-info__text">Saldo Anda</div>
        <NumberFormat displayType={'text'} value={saldo} prefix={'Rp '} renderText={value => <div className="balance-info__amount">{value}</div>} thousandSeparator={'.'} decimalSeparator={','}/>
      </div>
    )

  }

  _profileInfoRender() {
    const { nama, email, photo } = this.props.user_profile;

    let profileImageUrl = !biqHelper.utils.isNull( photo ) ?
        `${biqConfig.profile_photo_url_base}/${encodeURI( photo )}` :
        avatarPlacerholderBlank;

    return (
      <div className="profile-info">
        <div className="profile-info__img"
             style={{ 'backgroundImage': "url(" + ( profileImageUrl ) + ")" }}
             onClick={ this._onProfileImageClick }>
        </div>
        <div className="profile-info__name">{ biqHelper.utils.isNull( nama ) ? 'N/A': nama }</div>
        <div className="profile-info__email">{ biqHelper.utils.isNull( email ) ? 'N/A': email }</div>
        <div className="divider" />
      </div>
    )
  };

  modalClose = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appProfilePhotoDialogClose() );
    this.forceUpdate();
  };

  render() {
    const {user_profile} = this.props;
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

            {!biqHelper.utils.isNull( user_profile ) ?
              this._profileInfoRender()
              :
              <ProfileInfoLoader />
            }

            {!biqHelper.utils.isNull( user_profile )?
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
          open={this.props.profile_photo_dialog.is_open}
          onClose={this.modalClose}>

            <div className="modal-inner tst">
              {
                this.props.profile_photo_dialog.mode === 'select-dialog' ?
                  (
                    biqHelper.utils.isNull( this.props.user_profile.photo ) ?

                      <PhotoUpload modalClose={this.modalClose}/>
                        :
                      <ProfileImagePreview modalClose={this.modalClose}/>
                  )
                    :

                  <PhotoUploadFile modalClose={this.modalClose}/>

              }
            </div>

        </Modal>

      </>
    )
  }//render()

}//class Profile

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    profile_photo_dialog: state.app.profile_photo_dialog
  }
};

export default withRouter( connect( mapStateToProps ) (SideNavMain) );