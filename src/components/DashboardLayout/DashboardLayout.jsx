import React, { Component } from 'react';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';

import { navigationStatus } from './../../lib/utilities';

import './DashboardLayout.css';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileStatus: true
     }
  }


  componentWillMount() {
    navigationStatus.subscribe(
      (data) => {
        if (data.navigationLink === 'Dashboard') {
          this.setState({ profileStatus: false });
        } else {
          this.setState({ profileStatus: true });
        }
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-wrapper">
          <div className="container-inner">
            <div className="dashboard-layout-container">
              <div className="dashboard-layout-container__left">
                <Profile />
              </div>
              <div className="dashboard-layout-container__right">
                <Dashboard />
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-layout-container-mobile">
          {this.state.profileStatus ?
            <div className={"profile-container "+ (this.state.profileStatus ? 'show-profile':'hide-profile')}>
              <Profile />
            </div>
            :
            <div className={"dashboard-container "+(!this.state.profileStatus ? 'show-dashboard':'hide-dashboard')}>
              <Dashboard />
            </div>
          }
        </div>
      </React.Fragment>
     )
  }
}

export default DashboardLayout;