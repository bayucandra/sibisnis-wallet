import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import {Button} from "components/Widgets/material-ui";

import appActions from "redux/actions/global/appActions";

import NumberFormat from 'react-number-format';
import biqHelper from "lib/biqHelper/index";

import avatarPlacerholderBlank from 'images/avatar-placeholder-blank.svg';

import PhotoUpload from "components/Dialogs/DialogProfilePhoto/PhotoUpload/PhotoUpload";

// Loaders
import { ProfileInfoLoader, BalanceLoader } from 'components/Loaders/ProfileLoader/ProfileLoader';

import './SideNavMain.scss';
import 'styles/components/_modal.scss';
import dashboardActions from "../../../redux/actions/pages/dashboardActions";


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

      let {dispatch} = this.props;
      dispatch( dashboardActions.dashboardPanelMobileVisibility( true ) );

    } );
  };

  _onProfileImageClick = () => {
    let {dispatch} = this.props;
    dispatch( appActions.appDialogProfilePhotoOpen('select-dialog') );
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
    const { nama, email, aws_global_url, photo } = this.props.user_profile;

    let profileImageUrl = !biqHelper.utils.isNull( photo ) ?
        `${aws_global_url}${encodeURI( photo )}` :
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

  render() {
    const {user_profile} = this.props;
    let {cssClasses} = this.props;

    cssClasses = biqHelper.utils.isNull(cssClasses) ? '' : ` ${cssClasses}`;

    let profile_detail_btn_class = this.props.location.pathname === '/profile' ? ' is-active' : '';

    let is_desktop_page = this.props.location.pathname === '/dashboard';
    let is_mutasi_saldo_page = this.props.location.pathname === '/balance-mutation';
    let is_transfer_saldo_page = this.props.location.pathname.search('/balance-transfer') !== -1;

    return (

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

          <Button className={ `nav-btn nav-btn--transfer-saldo${ is_transfer_saldo_page ? ' is-active' : '' }` }  onClick={ () => this._onNavigationClick('/balance-transfer') }>
            <div className="nav-btn__inner">
              <div className="icon icon--transfer-saldo"/>
              <div className="label">Transfer Saldo</div>
              <div className="arrow hidden-md-up"/>
            </div>
          </Button>

        </div>

      </div>
    )
  }//render()

}//class Profile

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile
  }
};

export default withRouter( connect( mapStateToProps ) (SideNavMain) );