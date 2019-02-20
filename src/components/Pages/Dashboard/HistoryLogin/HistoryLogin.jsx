import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as moment from 'moment';

import appActions from "../../../../redux/actions/global/appActions";
import dashboardActions from "redux/actions/pages/dashboardActions";

import biqHelper from "lib/biqHelper";

import {Button} from "components/Widgets/material-ui";

import CustomAccordion, { HistoryList } from 'components/Shared/CustomAccordion/CustomAccordion';
import { HistoryLoginMobileLoader, HistoryLoginDesktopLoader } from './HistoryLoginLoader/HistoryLoginLoader';

import './HistoryLogin.scss';

class HistoryLogin extends Component {

  _loginHistoryPage = () => {
    biqHelper.utils.clickTimeout( () => {
      this.props.history.push('/login-history');
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    // dispatch( dashboardActions.dashboardLoginHistoryFetch( { memberid: "ZON40434359" } ) );
    dispatch( dashboardActions.dashboardLoginHistoryFetch( { memberid: this.props.user_profile.memberid } ) );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let is_just_fetched = this.props.login_history.is_fetched && !prevProps.login_history.is_fetched;

    let is_success = biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet( this.props.login_history.server_response, 'status' ) );
    if ( !is_success && is_just_fetched ) {
      let {dispatch} = this.props;
      dispatch( appActions.appDialogNoticeOpen( { title: 'Error', notice: 'Terjadi masalah saat mengambil data "History Login"!' } ) );
    }
  }

  render() {
    let is_fetched = this.props.login_history.is_fetched;
    let is_success = biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet( this.props.login_history.server_response, 'status' ) );

    let data = biqHelper.JSON.pathValueGet( this.props.login_history.server_response, 'response.data' );

    return (
      <div className={"history-login-container"}>

          <div className="history-login-header-container">
            <div className="history-login-header">
              <div className="history-login-header__left">History Login</div>
              <Button className="history-login-header__right" onClick={this._loginHistoryPage}>Lihat Semua</Button>
            </div>
          </div>

          <div className="history-login-list-container">
            {
              is_fetched && is_success ?

              data.map( (el) => {
                let id = el.id;
                let date_access = moment( el.date_access ).format('DD MMM YYYY , HH:mm');

                let location = biqHelper.utils.isNull(el.data.location) ? {} : el.data.location;
                let country = location.country;
                let ip = location.ip;
                let browser = !biqHelper.utils.isNull( el.data.headers ) ?
                  biqHelper.utils.browserDetect( el.data.headers['User-Agent'] )
                    :
                  '';

                return (
                  <CustomAccordion
                    key={id}
                    title="Tanggal"
                    date={date_access}
                    accordionBody={<HistoryList country={country} ip={ip} browser={browser} />} />
                );
              })

                :

              <HistoryLoginMobileLoader />

            }

          </div>

          <div className="history-login-list-container-desktop">

            {
              is_fetched && is_success ?

              <table className="history-login-list-table">
                <thead>
                  <tr>
                    <td className="history-login-list-table__header-column">Tanggal</td>
                    <td className="history-login-list-table__header-column">Negara</td>
                    <td className="history-login-list-table__header-column">IP</td>
                    <td className="history-login-list-table__header-column">Browser</td>
                  </tr>
                </thead>
                <tbody>

                  {data.map((el) => {
                    let id = el.id;
                    let date_access = moment( el.date_access ).format('DD MMM YYYY , HH:mm');
                    let location = biqHelper.utils.isNull(el.data.location) ? {} : el.data.location;
                    let country = location.country;
                    let ip = location.ip;
                    let browser = !biqHelper.utils.isNull( el.data.headers ) ?
                      biqHelper.utils.browserDetect( el.data.headers['User-Agent'] )
                      :
                      '';
                    return (
                      <tr className="history-login-list-body__item" key={id}>
                        <td className="history-login-list-table__body-column-date">{date_access}</td>
                        <td className="history-login-list-table__body-column-country">{country}</td>
                        <td className="history-login-list-table__body-column-ip">{ip}</td>
                        <td className="history-login-list-table__body-column-browser">{browser}</td>
                      </tr>
                    )
                  })
                  }

                </tbody>
              </table>

                :

              <HistoryLoginDesktopLoader />

            }

          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user_profile: state.user.profile,
    login_history : state.dashboard.login_history
  }
};

export default withRouter( connect( mapStateToProps ) (HistoryLogin));