import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import dashboardActions from "redux/actions/pages/dashboardActions";

import biqHelper from "lib/biqHelper";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CustomAccordian from 'components/Shared/CustomAccordian/CustomAccordian';
import { HistoryLoginMobileLoader, HistoryLoginDesktopLoader } from './HistoryLoginLoader/HistoryLoginLoader';

import './HistoryLogin.scss';

const HistoryList = (props) => {
  const { country, ip, browser } = props;
  return (
    <div className="history-list-container">
      <div className="history-list">
        <div className="history-list__title">Negara</div>
        <div className="history-list__name">{country}</div>
      </div>
      <div className="history-list">
        <div className="history-list__title">IP</div>
        <div className="history-list__name">{ip}</div>
      </div>
      <div className="history-list">
        <div className="history-list__title">Browser</div>
        <div className="history-list__name">{browser}</div>
      </div>
    </div>
  )
}

class HistoryLogin extends Component {

  viewAllHistoryLogin = () => {
    this.props.history.push('/all-history-logins');
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( dashboardActions.dashboardLoginHistoryFetch( { memberid: "ZON40434359" } ) );
    // dispatch( dashboardActions.dashboardLoginHistoryFetch( { memberid: this.props.user_profile.memberid } ) );
  }

  render() {
    let is_fetched = this.props.login_history.is_fetched;
    let is_success = biqHelper.utils.httpResponseIsSuccess( biqHelper.JSON.pathValueGet( this.props.login_history.server_response, 'status' ) );

    let data = biqHelper.JSON.pathValueGet( this.props.login_history.server_response, 'response.data' );

    return (
      <div className={this.props.viewAll ? "history-login-container all-history-login" : "history-login-container"}>
        <Card className="custom-card-styles">
          <CardContent className="history-login-header-container">
            <div className="history-login-header">
              <div className="history-login-header__left">History Login</div>
              <div className="history-login-header__right ripple opacity-background" onClick={this.viewAllHistoryLogin.bind(this)}>Lihat Semua</div>
            </div>
          </CardContent>
          <div className="history-login-list-container">
            {
              is_fetched && is_success ?

              data.map((el) => {
                let id = el.id;
                let date_access = el.date_access;
                let country = el.data.location.country;
                let ip = el.data.location.ip;
                let browser = biqHelper.utils.browserDetect( el.data.headers['User-Agent'] );
                return (
                  <CustomAccordian
                    key={id}
                    title="Tanggal"
                    date={date_access}
                    accordianBody={<HistoryList country={country} ip={ip} browser={browser} />} />
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
                    let date_access = el.date_access;
                    let country = el.data.location.country;
                    let ip = el.data.location.ip;
                    let browser = biqHelper.utils.browserDetect( el.data.headers['User-Agent'] );
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
        </Card>
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