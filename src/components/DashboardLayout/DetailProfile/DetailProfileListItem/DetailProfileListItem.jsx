import React, { Component } from 'react';
import editIcon from './../../../../images/icons/ico-edit.svg';
import warningIcon from './../../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import './DetailProfileListItem.css';

const DetailProfileListItem = (props) => {
  const { icon, title, value, description, status } = props;
  return (
    <div className="detail-profile-list-item">

      <div className="list-meta-info">
        <div className="list-meta-info__left">
          <div className="item-icon">
            <img src={icon} alt="list-icon" className="i-icon" />
            {!status ?
              <img src={warningIcon} className="warning-icon" alt="warning-icon" />
              : null}
          </div>
          <div className="item-title">
            {title}
          </div>
        </div>
        <div className="list-meta-info__right">
          <div className="item-edit-icon ripple">
            <img src={editIcon} alt="edit-icon" />
          </div>
        </div>
      </div>

      <div className="item-info-container">
        <div className="item-info">
          {/* <div className="item-info__title">{title}</div> */}
          {value ? <div className="item-info__value">{value}</div> : null}
          <div className="item-info__description">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default DetailProfileListItem;