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
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div id="history-login-container">
          <Card>
            <CardContent>
              <div className="history-login-header">
                <div className="history-login-header__left">Histoy Login</div>
                <div className="history-login-header__right">Lihat Semua</div>
              </div>
            </CardContent>
            <div className="history-login-list-container">
              <CustomAccordian
                title="Tanggal"
                date="30 Sep 2017 , 12:45"
                accordianBody={<HistoryList country="Indonesia" ip="127.747.304.1" browser="Google Chrome" />} />
              <CustomAccordian
                title="Tanggal"
                date="30 Sep 2017 , 12:45"
                accordianBody={<HistoryList country="Indonesia" ip="127.747.304.1" browser="Google Chrome" />} />
              <CustomAccordian
                title="Tanggal"
                date="30 Sep 2017 , 12:45"
                accordianBody={<HistoryList country="Indonesia" ip="127.747.304.1" browser="Google Chrome" />} />
              <CustomAccordian
                title="Tanggal"
                date="30 Sep 2017 , 12:45"
                accordianBody={<HistoryList country="Indonesia" ip="127.747.304.1" browser="Google Chrome" />} />
              <CustomAccordian
                title="Tanggal"
                date="30 Sep 2017 , 12:45"
                accordianBody={<HistoryList country="Indonesia" ip="127.747.304.1" browser="Google Chrome" />} />
            </div>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

export default HistoryLogin;