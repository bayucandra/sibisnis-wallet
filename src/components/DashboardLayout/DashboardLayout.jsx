// Node Modules
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom Components
import SideNavMain from '../Shared/SideNavMain/SideNavMain';
import Dashboard from './Dashboard/Dashboard';
import DetailProfile from './DetailProfile/DetailProfile';
// import DepositRequirementsCheck from './Dashboard/Deposit/DepositRequirementsCheck/DepositRequirementsCheck';//TODO: delete along with file soon
import Deposit from "../Pages/Balance"


// Custom CSS
import './DashboardLayout.scss';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>

        <div className="main-wrapper biq-wrapper l-dashboard">

          <div className="biq-wrapper__inner l-dashboard__inner">

            <SideNavMain />

            <div className="l-dashboard__panel">
              <Switch>
                <Route path="/dashboard/detail-profile" component={DetailProfile} />
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </div>

          </div>

        </div>

      </React.Fragment>
     )
  }
}

export default DashboardLayout;