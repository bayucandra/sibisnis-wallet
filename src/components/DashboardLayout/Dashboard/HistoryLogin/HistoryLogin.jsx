import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CustomAccordian from './../../../Shared/CustomAccordian/CustomAccordian';

import './HistoryLogin.css';

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
  constructor(props) {
    super(props);
    this.state = {
      data : [
        { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
        { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
        { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
        { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
        { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
      ]
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div id="history-login-container">
        <Card>
          <CardContent>
            <div className="history-login-header">
              <div className="history-login-header__left">Histoy Login</div>
              <div className="history-login-header__right">Lihat Semua</div>
            </div>
          </CardContent>
          <div className="history-login-list-container">
            {data.map((history, index) => {
              return (
                <CustomAccordian
                  title="Tanggal"
                  date={history.date}
                  key={index}
                  accordianBody={<HistoryList country={history.country} ip={history.ip} browser={history.browser} />} />
              );
            })}
          </div>

          <div className="history-login-list-container-desktop">
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
                {
                  data.map((history, index) => {
                    return (
                      <tr className="history-login-list-body__item" key={index}>
                        <td className="history-login-list-table__body-column-date">{history.date}</td>
                        <td className="history-login-list-table__body-column-country">{history.country}</td>
                        <td className="history-login-list-table__body-column-ip">{history.ip}</td>
                        <td className="history-login-list-table__body-column-browser">{history.browser}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            {/* <div className="history-login-list-header">
              <div>Tanggal</div>
              <div>Negara</div>
              <div>IP</div>
              <div>Browser</div>
            </div>

            <div className="history-login-list-body">
              {
                data.map((history, index) => {
                  return (
                    <div className="history-login-list-body__item" key={index}>
                      <div>{history.date}</div>
                      <div>{history.country}</div>
                      <div>{history.ip}</div>
                      <div>{history.browser}</div>
                    </div>
                  )
                })
              }
            </div> */}
          </div>
        </Card>
      </div>
    )
  }
}

export default HistoryLogin;