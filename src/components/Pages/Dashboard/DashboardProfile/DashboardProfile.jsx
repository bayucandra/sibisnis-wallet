import React, {Component} from 'react';

import {Button} from "components/Widgets/material-ui";

import "./DashboardProfile.scss";

class DashboardProfile extends Component {

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
              <div className="icon icon--phone"/>
              <div className="label">Verifikasi Nomor Handphone Anda</div>
              <div className="icon-indicator icon-indicator--verified"/>
            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">
              <div className="icon icon--email"/>
              <div className="label">Verifikasi Email Anda</div>
              <div className="icon-indicator icon-indicator--verified"/>
            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">
              <div className="icon icon--profile-name"/>
              <div className="label">Upload foto profil Anda</div>
              <div className="icon-indicator"/>
            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">
              <div className="icon icon--address"/>
              <div className="label">Lengkapi Data Alamat Anda</div>
              <div className="icon-indicator"/>
            </div>
          </Button>

          <Button className="record-item">
            <div className="record-item__inner">
              <div className="icon icon--identity"/>
              <div className="label">Lengkapi Info Data Identitas Anda</div>
              <div className="icon-indicator"/>
            </div>
          </Button>


        </div>

      </div>
    );
  }

}

export default DashboardProfile;
