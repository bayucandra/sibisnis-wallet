import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Subject, of } from 'rxjs';
import {takeUntil, delay, tap, switchMap} from 'rxjs/operators';
import $ from 'jquery';

import appActions from "../../../../redux/actions/global/appActions";
import biqHelper from "../../../../lib/biqHelper";

import { Modal } from '@material-ui/core';
import { Button } from "components/Widgets/material-ui";

import EmailVerificationForm from "./EmailVerificationForm";
import ProfileUploadForm from "./ProfileUploadForm/ProfileUploadForm";


import "styles/components/_modal.scss";
import "./DashboardProfile.scss";
import AddressVerificationForm from "./AddressVerificationForm/AddressVerificationForm";


class DashboardProfile extends Component {

  wrapperRef = React.createRef();

  stop$ = new Subject();

  state = {
    is_visible: false,
    user_verifications: {
      phone: true, email: false, photo: false, address: false,
      // identity: false
    },
    profile_completeness: 100,
    profile_completeness_delay_is_set: false,
    email_verification: false,
    profile_upload_desktop: false,//This is for desktop, Mobile version placed on redux
    address_input_desktop: false//This is for desktop, Mobile version placed on redux
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

    let {dispatch} = this.props;
    dispatch( appActions.appDialogEmailOpen() );
  };


  _photoProfileVerificationDesktopToggle = () => {
    biqHelper.utils.clickTimeout( () => this.setState( { profile_upload_desktop: !this.state.profile_upload_desktop } ) );
  };
  _photoProfileVerificationMobileOpen = () => {
    if ( this.state.user_verifications.photo ) return;
    if (!biqHelper.mediaQuery.isMobile()) return;

    let {dispatch} = this.props;
    biqHelper.utils.clickTimeout( () => {
      dispatch( appActions.appDialogProfilePhotoOpen('select-dialog') );
    } );
  };


  _addressInputDesktopToggle = () => {
    biqHelper.utils.clickTimeout( () => this.setState( { address_input_desktop: !this.state.address_input_desktop } ) );
  };
  _addressInputMobileOpen = () => {
    if( this.state.user_verifications.address ) return;
    if( !biqHelper.mediaQuery.isMobile() ) return;

    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( appActions.appDialogAddressOpen() );
    } );
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
  
  _profileCompletenessLevelGet = () => {

    let profile_completeness_total = 0;
    let profile_completeness = 0;

    for( let key in this.state.user_verifications ) {
      profile_completeness_total++;
      if ( this.state.user_verifications[key] === true ) {
        profile_completeness++;
      }
    }

    return profile_completeness / profile_completeness_total * 100;
    
  };

  _profileCompletenessLevelUpdate$ = new Subject()
    .pipe(
      takeUntil( this.stop$ ),
      switchMap(
        (data={}) => {
          let params = { delay_time: 800 };
          Object.assign(params, data);

          return of( params )
            .pipe(
              takeUntil( this.stop$ ),
              delay( params.delay_time ),
              tap( () => {
                let is_changed = this.state.profile_completeness !== this._profileCompletenessLevelGet();
                if(is_changed)
                  this.setState({
                    profile_completeness: this._profileCompletenessLevelGet()
                  });
              } )
            );
        }
      )
    );

  _wrapperVisibility$ = new Subject()
    .pipe(

      takeUntil( this.stop$ ),

      switchMap(

        (data = {}) => {
          let params = {
            is_visible: false,
            delay_time: 800
          };
          Object.assign( params, data );

          return of( params )

            .pipe(

              takeUntil( this.stop$ ),

              delay(params.delay_time),

              tap(()=>{
                let is_changed = this.state.is_visible !== params.is_visible;

                if( is_changed ) {
                  this.setState({is_visible: params.is_visible, profile_completeness: 0} );
                }
              })

            )
        }

      )

    );

  componentDidMount() {
    let user_verifications = this._userVerificationsGen( this.props );
    this.setState( { user_verifications } );

    this._profileCompletenessLevelUpdate$.subscribe(data => {
      if ( data.visibility_refresh ) {
        if (this.state.is_visible && this.state.profile_completeness === 100) {
          this._wrapperVisibility$.next({is_visible: false, delay_time: 600});
        } else if (!this.state.visible && this.state.profile_completeness < 100) {
          this._wrapperVisibility$.next({is_visible: true, delay_time: 600});
        }
      }
    });

    this._wrapperVisibility$.subscribe(data=>{
      this._profileCompletenessLevelUpdate$.next({is_init: true});
    });

    setTimeout( ()=> {
      if (this._profileCompletenessLevelGet() < 100) {
        this._wrapperVisibility$.next({ is_visible: true, delay_time: 1000});
      }
    }, 100 );

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    let user_verifications = this._userVerificationsGen(nextProps);

    let verifications_is_changed = !biqHelper.JSON.isEqualShallow( user_verifications, this.state.user_verifications );

    if ( verifications_is_changed ) {
      this.setState( { user_verifications } );
      return false;
    }

    let profile_completeness_changed = nextState.profile_completeness !== this._profileCompletenessLevelGet();
    if (profile_completeness_changed && this.state.is_visible) {
      this._profileCompletenessLevelUpdate$.next({ visibility_refresh: true });
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();
  }

  render() {

    return (
      <div className={`dashboard-profile${ this.state.is_visible ? ' is-visible' : '' }`} ref={ this.wrapperRef }>

        <div className="account-security-level">

          <div className="title">Tingkat Keamanan Akun Anda</div>

          <div className="level-bar">

            <div className="indicator">
              <div className="bar" style={ { width: `${this.state.profile_completeness}%` } }/>
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
                <div className={`icon-indicator${ this.state.user_verifications.phone ? ' icon-indicator--verified' : ''} hidden-md-up`}/>

                {
                  this.state.user_verifications.phone ?
                    <div className="icon-verified-desktop visible-md-up"/>
                      :
                    <Button className={`action-btn-desktop visible-md-up`}>
                      Lengkapi Sekarang
                    </Button>
                }
              </div>

            </div>
          </Button>

          <Button className="record-item" onClick={ this._emailVerificationMobileOpen }>
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--email"/>
                <div className="label">Verifikasi Email Anda</div>
                <div className={`icon-indicator${ this.state.user_verifications.email ? ' icon-indicator--verified' : '' } hidden-md-up`}/>

                {
                  this.state.user_verifications.email ?

                  <div className="icon-verified-desktop visible-md-up"/>

                    :

                  <Button className={`action-btn-desktop visible-md-up${ this.state.email_verification ? ' action-btn-desktop--close' : '' }`} onClick={this._emailVerificationDekstopToggle}>
                    { this.state.email_verification ? 'Tutup' : 'Lengkapi Sekarang' }
                  </Button>
                }

              </div>

              <EmailVerificationForm isVisible={this.state.email_verification && !this.state.user_verifications.email}/>

            </div>

          </Button>

          <Button className="record-item" onClick={this._photoProfileVerificationMobileOpen}>
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--profile-name"/>
                <div className="label">Upload foto profil Anda</div>
                <div className={ `icon-indicator${ this.state.user_verifications.photo ? ' icon-indicator--verified' : '' } hidden-md-up` }/>

                {
                  this.state.user_verifications.photo ?

                    <div className="icon-verified-desktop visible-md-up"/>
                      :
                    <Button
                      className={`action-btn-desktop visible-md-up${this.state.profile_upload_desktop ? ' action-btn-desktop--close' : ''}`}
                      onClick={this._photoProfileVerificationDesktopToggle}>
                      {this.state.profile_upload_desktop ? 'Batal' : 'Upload Sekarang'}
                    </Button>
                }

              </div>

              <ProfileUploadForm isVisible={this.state.profile_upload_desktop && !this.state.user_verifications.photo}/>

            </div>
          </Button>

          <Button className="record-item" onClick={this._addressInputMobileOpen}>
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--address"/>
                <div className="label">Lengkapi Data Alamat Anda</div>
                <div className={ `icon-indicator${ this.state.user_verifications.address ? ' icon-indicator--verified' : '' } hidden-md-up` }/>

                {
                  this.state.user_verifications.address ?

                    <div className="icon-verified-desktop visible-md-up"/>
                    :
                    <Button
                      className={`action-btn-desktop visible-md-up${this.state.address_input_desktop ? ' action-btn-desktop--close' : ''}`}
                      onClick={this._addressInputDesktopToggle}>
                      {this.state.address_input_desktop ? 'Batal' : 'Lengkapi Sekarang'}
                    </Button>
                }
              </div>

              <AddressVerificationForm isVisible={this.state.address_input_desktop && !this.state.user_verifications.address} addressInputDesktopToggle={this._addressInputDesktopToggle}/>

            </div>
          </Button>

{/*
          <Button className="record-item">
            <div className="record-item__inner">

              <div className="action">
                <div className="icon icon--identity"/>
                <div className="label">Lengkapi Info Data Identitas Anda</div>
                <div className="icon-indicator hidden-md-up"/>
              </div>

            </div>
          </Button>
*/}


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

export default connect( mapStateToProps ) ( DashboardProfile );
