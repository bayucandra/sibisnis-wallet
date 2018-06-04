import React, { Component } from 'react';
import { navigationStatus } from './../../../lib/utilities';
import './AllHistoryLogins.css';
import HistoryLogin from './../../DashboardLayout/Dashboard/HistoryLogin/HistoryLogin';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';
class AllHistoryLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({
      navigationLink: 'History Login'
    })
  }

  render() {
    return (
      <div id="all-history-login-container">
        <PageBackButton/>
        <HistoryLogin viewAll={true}/>
      </div>
      )
  }
}

export default AllHistoryLogins;