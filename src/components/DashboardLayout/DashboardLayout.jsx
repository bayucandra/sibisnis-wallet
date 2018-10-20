// Node Modules
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom Components
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';
import DetailProfile from './DetailProfile/DetailProfile';
import DepositRequirementsCheck from './Dashboard/Deposit/DepositRequirementsCheck/DepositRequirementsCheck';

// Custom Libraries
import { navigationStatus } from './../../lib/utilities';

// Custom CSS
import './DashboardLayout.scss';

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
        if (
          data.navigationState === 'Dashboard' ||
          data.navigationState === 'Detail Profile' ||
          data.navigationState === 'Tambah Saldo'
        ) {
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
              <div className={this.state.profileStatus ? "dashboard-layout-container__left show-profile" : ' dashboard-layout-container__left hide-profile'}>
                <Profile />
              </div>
              <div className={!this.state.profileStatus ? "dashboard-layout-container__right show-dashboard" : 'dashboard-layout-container__right hide-dashboard'}>
                <Switch>
                  <Route path="/dashboard/detail-profile" component={DetailProfile} />
                  <Route path="/dashboard/deposit-requirements-check" component={DepositRequirementsCheck} />
                  <Route path="/dashboard" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
     )
  }
}

export default DashboardLayout;