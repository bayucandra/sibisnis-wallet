import React, { Component } from 'react';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';

import './DashboardLayout.css';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <React.Fragment>
        <div id="dashboard-layout-container">
          <Profile />
          {/* <Dashboard/> */}
        </div>
      </React.Fragment>
     )
  }
}

export default DashboardLayout;