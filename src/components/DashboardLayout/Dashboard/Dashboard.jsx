import React, { Component } from 'react';
import ProfileProgress from './ProfileProgress/ProfileProgress';
import HistoryLogin from './HistoryLogin/HistoryLogin';
import LatestNews from './LatestNews/LatestNews';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <ProfileProgress />
        <HistoryLogin viewAll={true} />
        <LatestNews />
      </React.Fragment>
    )
  }
}

export default Dashboard;