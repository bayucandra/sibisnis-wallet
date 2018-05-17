import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';

import './ProfileProgress.css';

const ProgressBar = (props) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-container__text">Tingkat Keamanan Akun Anda</div>
      <LinearProgress variant="determinate" value={35} />
    </div>
  )
}

class ProfileProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="profile-progress-container">
        <Card>
          <CardContent>
            <ProgressBar/>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default ProfileProgress;