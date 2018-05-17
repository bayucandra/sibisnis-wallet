import React, { Component } from 'react';
import './ProfileButton.css';

const ProfileButton = (props) => {
  return (
    <React.Fragment>
      <div className='profile-button-mobile ripple' {...props}>{props.value}</div>
      <div className='profile-button-desktop' {...props}>{props.value}</div>
    </React.Fragment>
  )
}

export default ProfileButton;