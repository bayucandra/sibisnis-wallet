import React, { Component } from 'react';
import Profile from "./Profile/Profile";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <React.Fragment>
        <div id="dashboard-container">
          <Profile />
        </div>
      </React.Fragment>
     )
  }
}

export default Dashboard;