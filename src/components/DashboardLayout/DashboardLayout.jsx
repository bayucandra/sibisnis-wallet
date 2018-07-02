import React, { Component } from 'react';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';
import DetailProfile from './DetailProfile/DetailProfile';
import LatestNews from "./Dashboard/LatestNews/LatestNews";

import { navigationStatus } from './../../lib/utilities';

import { Route } from 'react-router-dom';

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
        if (data.navigationState === 'Dashboard' || data.navigationState === 'Detail Profile' ) {
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
        {/* <LatestNews/> */}
        <div className="container-wrapper">
          <div className="container-inner">
            <div className="dashboard-layout-container">
              <div className={this.state.profileStatus ? "dashboard-layout-container__left show-profile" : ' dashboard-layout-container__left hide-profile'}>
                <Profile />
              </div>
              <div className={!this.state.profileStatus ? "dashboard-layout-container__right show-dashboard" : 'dashboard-layout-container__right hide-dashboard'}>
                <Route path="/dashboard" exact={true} component={Dashboard} />
                <Route path="/dashboard/detail-profile" component={DetailProfile} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
     )
  }
}

export default DashboardLayout;