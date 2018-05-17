import React, { Component } from 'react';
import ProfileProgress from './ProfileProgress/ProfileProgress';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <ProfileProgress/>
      </React.Fragment>
    )
  }
}

export default Dashboard;