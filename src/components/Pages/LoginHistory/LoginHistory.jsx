import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as moment from "moment";

import appActions from "redux/actions/global/appActions";
import loginHistoryActions from "redux/actions/pages/loginHistory";

import biqHelper from "lib/biqHelper";
import biqConfig from "providers/biqConfig";

import HeaderMobile from "components/Shared/HeaderMobile/HeaderMobile";
import {Button} from "components/Widgets/material-ui";

import ScrollPagination from "components/Widgets/ScrollPagination/ScrollPagination";
import CustomAccordion, {HistoryList} from "components/Shared/CustomAccordion/CustomAccordion";
import {
  HistoryLoginDesktopLoader,
  HistoryLoginMobileLoader
} from "../Dashboard/HistoryLogin/HistoryLoginLoader/HistoryLoginLoader";

import "./LoginHistory.scss";

class LoginHistory extends Component {

  refPanel = React.createRef();

  state = {
    data_is_ready: false
  };

  _backBtnClickMobile = () => {
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push('/dashboard');
    } );
  };

  _onFetch = () => {
    let {dispatch} = this.props;
    dispatch( loginHistoryActions.loginHistoryFetch() );
  };

  _onFetched = obj => {
    this.setState({data_is_ready: true}, ()=>{
      let {dispatch} = this.props;
      dispatch( loginHistoryActions.loginHistoryFetched( { data: obj.data_all } ) );
    });
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( appActions.appRouterChange( { header_mobile_show : false } ) );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let memberid_current = biqHelper.JSON.pathValueGet( this.props, 'user_profile.memberid' );
    let memberid_prev = biqHelper.JSON.pathValueGet( prevProps, 'user_profile.memberid' );

    let scroll_pagination_instance = this.refPanel.current;
    if( !biqHelper.utils.isNull( scroll_pagination_instance )) {
      if (
        memberid_current !== memberid_prev
        && typeof scroll_pagination_instance.loadInit === 'function'
      ) {
        scroll_pagination_instance.loadInit({force_load: true});
      }
    }

  }

  render() {
    const data = this.props.login_history.data;

    return (
      <div className="main-wrapper main-wrapper--mobile-no-header biq-wrapper l-login-history">

        <div className="biq-wrapper__inner l-login-history__inner">

          <HeaderMobile backBtnClick={this._backBtnClickMobile} label={'History Login'}/>

          <div className="l-login-history__header-desktop">
            <Button className="back-btn" onClick={this._backBtnClickMobile}>
              Kembali
            </Button>
          </div>

          <div className="l-login-history__panel">

            <div className="l-login-history__panel__header-title visible-md-up">
              History Login
            </div>

            <div className="l-login-history__panel__header-table visible-md-up">
              <div className="biq-col biq-col--spacer-start"/>
              <div className="biq-col biq-col--date">Tanggal</div>
              <div className="biq-col biq-col--country">Negara</div>
              <div className="biq-col biq-col--ip">IP</div>
              <div className="biq-col biq-col--browser">Browser</div>
            </div>

            <ScrollPagination className={ `l-login-history__panel__body` } ref={this.refPanel} biqLimit={15}
              biqUrl={`${biqConfig.api.url_base}/api/wallet/history_login`} biqMethod={'POST'}
              biqData={ Object.assign( { memberid: this.props.user_profile.memberid, action: 'login' }, biqConfig.api.data_auth ) }
              onFetch={this._onFetch} onFetched={ this._onFetched }>


              {
                (!biqHelper.utils.isNull( data ) && data.length > 0) || (this.state.data_is_ready && data.length === 0 ) ?

                  data.map((el, idx) => {
                    let id = el.id;
                    let date_access = moment( el.date_access ).format('DD MMM YYYY , HH:mm');
                    let country = el.data.location.country;
                    let ip = el.data.location.ip;
                    let browser = biqHelper.utils.browserDetect( el.data.headers['User-Agent'] );
                    return (
                      <>
                        <CustomAccordion
                          className="hidden-md-up hidden-md-up--block"
                          key={id}
                          title="Tanggal"
                          date={date_access}
                          accordionBody={<HistoryList country={country} ip={ip} browser={browser} />} />

                        <div className={`login-history-record${ idx === 0 ? ' is-first' : '' }`}>
                          <div className="biq-col biq-col--spacer-start"/>
                          <div className="biq-col biq-col--date">{ date_access }</div>
                          <div className="biq-col biq-col--country">{country}</div>
                          <div className="biq-col biq-col--ip">{ip}</div>
                          <div className="biq-col biq-col--browser">{browser}</div>
                        </div>

                      </>
                    );
                  })

                  :

                  <>
                    <HistoryLoginDesktopLoader noHeader={true} />
                    <HistoryLoginMobileLoader />
                  </>

              }

            </ScrollPagination>

          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    login_history: state.loginHistory.login_history
  };
};

export default withRouter( connect( mapStateToProps ) (LoginHistory) );