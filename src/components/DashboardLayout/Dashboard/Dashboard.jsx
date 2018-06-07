import React, { Component } from 'react';
import ProfileProgress from './ProfileProgress/ProfileProgress';
import HistoryLogin from './HistoryLogin/HistoryLogin';
import LatestNews from './LatestNews/LatestNews';
import DetailProfile from './../DetailProfile/DetailProfile';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        {/* <DetailProfile/> */}
        <ProfileProgress />
        <HistoryLogin />
        <LatestNews />
      </React.Fragment>
    )
  }
}

export default Dashboard;