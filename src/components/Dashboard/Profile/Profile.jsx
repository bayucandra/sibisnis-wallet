import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import avatarPlacerholder from './../../../images/avatar-placeholder.png';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div id="profile-card">
        <Card>
          <CardContent>
            <div className="profile-container">
              <div className="profile-info">
                <div className="profile-img">
                  <img src={avatarPlacerholder} alt=""/>
                </div>
                <div className="profile-name">Arziky Yusya</div>
                <div className="profile-email">arzikyyu@gmail.com</div>
              </div>


            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Profile;