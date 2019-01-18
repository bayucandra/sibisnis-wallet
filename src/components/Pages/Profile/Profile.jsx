import React, { Component } from 'react';
import {connect} from 'react-redux';

import appActions from "redux/actions/global/appActions";
import userActions from "redux/actions/global/userActions";

import biqHelper from "lib/biqHelper";

import {Button} from "components/Widgets/material-ui";

import HeaderMobileGeneral from "components/Shared/HeaderMobileGeneral/HeaderMobileGeneral";
import SideNavMain from "components/Shared/SideNavMain/SideNavMain";
import EmailVerificationForm from "components/Shared/ProfileForms/EmailVerificationForm";

import AddressVerificationForm from "components/Shared/ProfileForms/AddressVerificationForm/AddressVerificationForm";
import PasswordSetForm from "components/Shared/ProfileForms/PasswordSetForm/PasswordSetForm";
import DialogPasswordUpdate from "components/Dialogs/DialogPasswordUpdate/DialogPasswordUpdate";

import './Profile.scss';

class Profile extends Component {

  state = {
    user_verifications: {
      phone: true, email: false, photo: false, address: false,
      // identity: false
    },
    email_verification: false,
    address_input_desktop: false,
    password_set: false
  };


  _emailVerificationDekstopToggle = () => {
    biqHelper.utils.clickTimeout( () => {

      this.setState({
        email_verification: !this.state.email_verification
      });

    });

  };
  _emailVerificationMobileOpen = () => {
    if ( this.state.user_verifications.email || !biqHelper.mediaQuery.isMobile() ) return;
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch(appActions.appDialogEmailOpen());
    });
  };



  _addressInputDesktopToggle = () => {
    biqHelper.utils.clickTimeout( () => this.setState( { address_input_desktop: !this.state.address_input_desktop } ) );
  };
  _addressInputMobileOpen = () => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( appActions.appDialogAddressOpen() );
    } );
  };
  _addressActionClick = () => {
    if ( !biqHelper.mediaQuery.isMobile() ) {
      this._addressInputDesktopToggle();
    } else {
      this._addressInputMobileOpen();
    }

  };

  _passwordSetDesktopClose = () => {
    this.setState( { password_set: false } );
  };
  _passwordSetDesktopToggle = () => {
    biqHelper.utils.clickTimeout( () => this.setState( { password_set: !this.state.password_set } ) );
  };
  _passwordSetMobileOpen = () => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( userActions.userUpdatePasswordDialogOpen() );
    } );
  };
  _passwordActionClick = () => {
    if ( !biqHelper.mediaQuery.isMobile() ) {
      this._passwordSetDesktopToggle();
    } else {
      this._passwordSetMobileOpen();
    }
  };


  _userVerificationsGen = ( props ) => {
    let verifications = biqHelper.JSON.parse( props.user_profile.verifications );

    return {
      phone: verifications.phone === 1,
      email: verifications.email === 1,
      photo : !biqHelper.utils.isNull( props.user_profile.photo ),
      address: !biqHelper.utils.isNull( props.user_profile.alamat ),
      // identity: false
    };
  };

  componentDidMount() {

    let user_verifications = this._userVerificationsGen( this.props );
    this.setState( { user_verifications } );

    let {dispatch} = this.props;
    dispatch(appActions.appRouterChange({header_mobile_show: false}));

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    let user_verifications = this._userVerificationsGen(nextProps);

    let verifications_is_changed = !biqHelper.JSON.isEqualShallow(user_verifications, this.state.user_verifications);

    if (verifications_is_changed) {
      this.setState({user_verifications});
      return false;
    }

    return true;
  };

  render() {

    let profile_has_issue = false;

    for( let key in this.state.user_verifications ) {
      if (this.state.user_verifications[key]=== false) profile_has_issue = true;
    }

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper biq-wrapper--md-narrow-side-padding l-profile">

        <div className="biq-wrapper__inner l-profile__inner">

          <SideNavMain cssClasses={"visible-md-up"}/>

          <div className="l-profile__panel">

            <HeaderMobileGeneral headerTitle="Detail Profile"/>

            <div className="l-profile__panel__body">

              <div className="title visible-md-up">Detail Profile</div>

              {
                profile_has_issue &&

                <div className="notice-top">

                  <div className="notice-top__icon"/>

                  <div className="notice-top__text">
                    Untuk meningkat keamanan akun anda silahkan lengkapi profile yang bertanda warning
                  </div>

                </div>
              }




              <div className="profile">


                <Button className="profile__item is-set">

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className="icon icon--profile"/>

                      <div className="detail">

                        <div className="detail__label">Nama Lengkap</div>
                        <div className="detail__value">{ this.props.user_profile.nama }</div>

                        <div className="detail__description">
                          Nama lengkap adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda
                        </div>

                      </div>

                    </div>

                  </div>

                </Button>

                <Button className={`profile__item${ this.state.user_verifications.phone ? ' is-set' : '' }`}>

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className={`icon icon--phone${ !this.state.user_verifications.phone ? ' has-warning' : '' }`}/>

                      <div className="detail">

                        <div className="detail__label">Nomor Handphone</div>
                        <div className="detail__value">{this.props.user_profile.kontak}</div>

                        <div className="detail__description">
                          Nomor handphone sangat penting digunakan untuk proses pengiriman token, Saat Anda melakukan transaksi
                        </div>

                      </div>

                    </div>

                  </div>

                </Button>


                <Button className={`profile__item${ this.state.user_verifications.email ? ' is-set' : '' }`} onClick={this._emailVerificationMobileOpen}>

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className={`icon icon--email${ !this.state.user_verifications.email ? ' has-warning' : '' }`}/>

                      <div className="detail">

                        <div className="detail__label">Email</div>
                        <div className="detail__value">{ this.props.user_profile.email }</div>

                        <div className="detail__description">
                          Email sangat penting digunakan untuk proses pengiriman invoice dan cara pembayaran, Saat Anda melakukan transaksi
                        </div>

                      </div>

                      <div className="flex-spacer"/>

                      {
                        !this.state.user_verifications.email ?
                          <Button className={`action-btn${ this.state.email_verification ? ' is-panel-open' : '' }`} onClick={this._emailVerificationDekstopToggle}>
                            <span className="visible-md-up">
                              { this.state.email_verification ? 'Tutup' : 'Lengkapi Sekarang' }
                            </span>
                          </Button>
                            :
                          null
                      }

                    </div>

                    <EmailVerificationForm isVisible={this.state.email_verification}/>

                  </div>

                </Button>

                <Button className={`profile__item${ this.state.user_verifications.email ? ' is-set' : '' }`}>

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className={`icon icon--address${ !this.state.user_verifications.address ? ' has-warning' : '' }`}/>

                      <div className="detail">

                        <div className="detail__label">Alamat</div>

                        <div className="detail__description">
                          Alamat Anda adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda
                        </div>

                      </div>

                      <div className="flex-spacer"/>

                      <Button className={`action-btn${ this.state.user_verifications.address ? ' is-edit' : '' }${ this.state.address_input_desktop ? ' is-panel-open' : '' }`}
                            onClick={this._addressActionClick}>

                        <span className="visible-md-up">
                          {
                            !this.state.user_verifications.address ?

                              !this.state.address_input_desktop ?
                                'Lengkapi Sekarang'
                                  :
                                'Tutup'

                                :

                              !this.state.address_input_desktop?
                                'Ubah'
                                  :
                                'Tutup'
                          }
                        </span>

                      </Button>

                    </div>

                    <AddressVerificationForm isVisible={this.state.address_input_desktop} addressInputDesktopToggle={this._addressInputDesktopToggle}/>

                  </div>

                </Button>


{/*
                <Button className="profile__item">

                  <div className="profile__item__inner">

                    <div className="icon icon--identity has-warning"/>

                    <div className="detail">

                      <div className="detail__label">Identitas</div>

                      <div className="detail__description">
                        Data Identitas Anda sangat penting digunakan untuk melakukan verifikasi pembayaran dalam jumlah yang besar.
                      </div>

                    </div>

                    <div className="flex-spacer"/>

                    <Button className="action-btn">&nbsp;</Button>

                  </div>

                </Button>
*/}


                <Button className="profile__item is-set">

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className="icon icon--password"/>

                      <div className="detail">

                        <div className="detail__label">Password</div>

                        <div className={`detail__description`}>
                          Untuk keamanan akun anda lakukan penggantian password secara berkala, gunakan kombinasi huruf angka dan karakter
                        </div>

                      </div>

                      <div className="flex-spacer"/>

                      <Button className={`action-btn is-edit${ this.state.password_set ? ' is-panel-open' : '' }`}
                        onClick={this._passwordActionClick}>
                        <span className="visible-md-up">
                          {
                            !this.state.password_set ?
                              'Ubah'
                              :
                              'Tutup'
                          }
                        </span>
                      </Button>

                    </div>

                    <PasswordSetForm isVisible={this.state.password_set} passwordSetDesktopClose={this._passwordSetDesktopClose}/>

                  </div>

                </Button>


              </div>



            </div>

          </div>

        </div>

        { this.props.password_update_dialog.is_open && <DialogPasswordUpdate/>}

      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    password_update_dialog: state.user.password_update_dialog,
  };
};

export default connect( mapStateToProps ) (Profile);