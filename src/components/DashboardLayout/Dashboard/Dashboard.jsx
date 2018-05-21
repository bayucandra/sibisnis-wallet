import React, { Component } from 'react';
import ProfileProgress from './ProfileProgress/ProfileProgress';
import HistoryLogin from './HistoryLogin/HistoryLogin';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <ProfileProgress />
        <HistoryLogin />
      </React.Fragment>
    )
  }
}

export default Dashboard;