import React, {Component} from 'react';
import { connect } from 'react-redux';

import dashboardActions from "redux/actions/pages/dashboardActions";

import { Modal } from '@material-ui/core';
import { Button } from "components/Widgets/material-ui";

import biqHelper from "../../../../lib/biqHelper";

import "./DashboardProfile.scss";
import "styles/components/_modal.scss";

import EmailVerificationForm from "./EmailVerificationForm/EmailVerificationForm";
import EmailVerificationDialog from "./EmailVerificationDialog/EmailVerificationDialog";


class DashboardProfile extends Component {

  state = {
    email_verification: {
      desktop: false,
      mobile: false
    }
  };

  _emailVerificationDekstopToggle = () => {
    if ( biqHelper.mediaQuery.isMobile() ) return;

    biqHelper.utils.clickTimeout( () => {

      this.setState({
        email_verification: {
          desktop: !this.state.email_verification.desktop,
          mobile: false
        }
      });

    });

  };

  _emailVerificationMobileOpen = () => {
    // if ( this.props.user_profile.verifications.email === 1 ) return;//TODO: Uncoment this while done with development
    if ( biqHelper.mediaQuery.isMobile() ) {
      this.setState({ email_verification: { desktop: false, mobile: true } });
    }
  };

  _emailVerificationMobileClose = () => {
    this.setState({ email_verification: { desktop: false, mobile: false } });
  };

  render() {
    let profile_completeness_full = 5;
    let profile_completeness = 3;
    let security_level_percent = profile_completeness / profile_completeness_full * 100;

    return (
      <div className={`dashboard-profile${ this.props.profileMobileVisible ? ' is-mobile-visible' : '' }`}>

        <div className="account-security-level">

          <div className="title">Tingkat Keamanan Akun Anda</div>

          <div className="level-bar">

            <div className="indicator">
              <div className="bar" style={ { width: `${security_level_percent}%` } }/>
            </div>

            <div className="description">LEMAH</div>

          </div>

        </div>

        <div className="account-security-info">
          Silahkan melakukan hal dibawah ini meningkatkan keamanan akun Anda
        </div>

        <div className="profile-data">


          <Button className="record-item">
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--phone"/>
                <div className="label">Verifikasi Nomor Handphone Anda</div>
                <div className="icon-indicator icon-indicator--verified hidden-md-up"/>

                <div className="icon-verified-desktop visible-md-up"/>
              </div>

            </div>
          </Button>

          <Button className="record-item" onClick={ this._emailVerificationMobileOpen }>
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--email"/>
                <div className="label">Verifikasi Email Anda</div>
                <div className="icon-indicator icon-indicator--verified hidden-md-up"/>

                {
                  this.props.user_profile.verifications.email !== 1 ?

                  <div className="icon-verified-desktop visible-md-up"/>

                    :

                  <Button className={`action-btn-desktop visible-md-up${ this.state.email_verification.desktop ? ' action-btn-desktop--close' : '' }`} onClick={this._emailVerificationDekstopToggle}>
                    { this.state.email_verification.desktop ? 'Tutup' : 'Lengkapi Sekarang' }
                  </Button>
                }

              </div>

              <EmailVerificationForm isVisible={this.state.email_verification.desktop}/>

            </div>

          </Button>

          <Button className="record-item">
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--profile-name"/>
                <div className="label">Upload foto profil Anda</div>
                <div className="icon-indicator hidden-md-up"/>
                <Button className={`action-btn-desktop visible-md-up`} onClick={null}>
                  Upload Sekarang
                </Button>
              </div>

            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--address"/>
                <div className="label">Lengkapi Data Alamat Anda</div>
                <div className="icon-indicator hidden-md-up"/>
              </div>

            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--identity"/>
                <div className="label">Lengkapi Info Data Identitas Anda</div>
                <div className="icon-indicator hidden-md-up"/>
              </div>

            </div>
          </Button>


        </div>

        <Modal
          open={this.state.email_verification.mobile}
          onClose={this._emailVerificationMobileClose}
        >

          <div className="modal-inner">

            <EmailVerificationDialog emailVerificationMobileClose={this._emailVerificationMobileClose}/>

          </div>

        </Modal>

      </div>
    );
  }

}

const mapStateToProps = state => {

  return {
    user_profile: state.user.profile
  };

};

export default connect( mapStateToProps ) ( DashboardProfile );
