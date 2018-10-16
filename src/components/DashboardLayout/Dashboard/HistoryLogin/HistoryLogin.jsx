// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// React Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Custom Components
import CustomAccordian from './../../../Shared/CustomAccordian/CustomAccordian';
import { HistoryLoginMobileLoader, HistoryLoginDesktopLoader } from './../../../Loaders/HistoryLoginLoader/HistoryLoginLoader';

// Custom CSS
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      historyList : null
    }
  }

  viewAllHistoryLogin = () => {
    this.props.history.push('/all-history-logins');
  }

  componentWillMount() {
    this.setState({historyList:this.props.historyLoginList});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({historyList:nextProps.historyLoginList});
  }

  render() {
    const { historyList } = this.state;
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
            {historyList ?
              historyList.map((history, index) => {
                return (
                  <CustomAccordian
                    title="Tanggal"
                    date={history.date}
                    key={index}
                    accordianBody={<HistoryList country={history.country} ip={history.ip} browser={history.browser} />} />
                );
              })
              : <HistoryLoginMobileLoader />
            }
          </div>

          <div className="history-login-list-container-desktop">
            {historyList ?
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
                  {historyList.map((history, index) => {
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
              : <HistoryLoginDesktopLoader />
            }
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(HistoryLogin);