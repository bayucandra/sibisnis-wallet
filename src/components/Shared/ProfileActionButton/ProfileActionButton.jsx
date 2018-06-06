import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

import './ProfileActionButton.css';

const ProfileActionButton = (props) => {
  const {label} = props;
  return (
    <ButtonBase focusRipple style={{ 'borderRadius': '200px' }}>
      <div className="verification-action-btn" {...props}>{label}</div>
    </ButtonBase>
  )
}

export default ProfileActionButton;