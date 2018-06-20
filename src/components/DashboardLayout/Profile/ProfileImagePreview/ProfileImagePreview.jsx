import React, { Component } from 'react';
import './ProfileImagePreview.css';

class ProfileImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="profile-image-preview-container">
        <img src={`localhost:3000${this.props.data.image}`} alt=""/>
      </div>
    )
  }
}

export default ProfileImagePreview;