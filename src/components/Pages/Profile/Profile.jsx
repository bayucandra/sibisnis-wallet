import React, { Component } from 'react';
import {connect} from 'react-redux';

import appActions from "../../../redux/actions/global/appActions";
import biqHelper from "../../../lib/biqHelper";

import {Button} from "components/Widgets/material-ui";

import SideNavMain from "../../Shared/SideNavMain/SideNavMain";
import HeaderMenuMobile from "../../Shared/HeaderMenuMobile/HeaderMenuMobile";
import EmailVerificationForm from "../Dashboard/DashboardProfile/EmailVerificationForm";

import './Profile.scss';

class Profile extends Component {

  state = {
    user_verifications: {
      phone: true, email: false, photo: false, address: false,
      // identity: false
    },
    email_verification: false
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

  _onEmailBtnClick = () => {//For desktop Button
    if ( !this.state.user_verifications.email && !biqHelper.mediaQuery.isMobile() )
      biqHelper.utils.clickTimeout( () => this._emailVerificationDekstopToggle() );
  };

  _userVerificationsGen = ( props ) => {
    return {
      phone: props.user_profile.verifications.phone === 1,
      email: props.user_profile.verifications.email === 1,
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

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper biq-wrapper--md-no-side-padding l-profile">

        <div className="biq-wrapper__inner l-profile__inner">

          <SideNavMain cssClasses={"visible-md-up"}/>

          <div className="l-profile__panel">

            <div className="l-profile__panel__header hidden-md-up">

              <Button className="back-btn">&nbsp;</Button>

              <div className="label">Detail Profile</div>

              <HeaderMenuMobile/>

            </div>

            <div className="l-profile__panel__body">

              <div className="title visible-md-up">Detail Profile</div>

              <div className="notice-top">

                <div className="notice-top__icon"/>

                <div className="notice-top__text">
                  Untuk meningkat keamanan akun anda silahkan lengkapi profile yang bertanda warning
                </div>

              </div>




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
                          <Button className={`action-btn${ this.state.email_verification ? ' is-panel-open' : '' }`} onClick={this._onEmailBtnClick}>
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

                <Button className="profile__item">

                  <div className="profile__item__inner">

                    <div className="action">

                      <div className="icon icon--address has-warning"/>

                      <div className="detail">

                        <div className="detail__label">Alamat</div>

                        <div className="detail__description">
                          Alamat Anda adalah info yang penting untuk memperlancar proses verifikasi untuk setiap transaksi saldo Anda
                        </div>

                      </div>

                      <div className="flex-spacer"/>

                      <Button className={`action-btn${ this.state.user_verifications.address ? ' is-edit' : '' }`}>
                        <span className="visible-md-up">
                        {
                          !this.state.user_verifications.address ?
                            'Lengkapi Sekarang'
                              :
                            'Ubah'
                        }
                        </span>
                      </Button>

                    </div>

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

                        <div className="detail__description">
                          Untuk keamanan akun anda lakukan penggantian password secara berkala, gunakan kombinasi huruf angka dan karakter
                        </div>

                      </div>

                      <div className="flex-spacer"/>

                      <Button className="action-btn is-edit">
                        <span className="visible-md-up">Ubah</span>
                      </Button>

                    </div>

                  </div>

                </Button>


              </div>



            </div>

          </div>

        </div>

      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile
  };
};

export default connect( mapStateToProps ) (Profile);