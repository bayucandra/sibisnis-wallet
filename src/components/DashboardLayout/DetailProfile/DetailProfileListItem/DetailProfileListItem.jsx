import React, { Component } from 'react';
import editIcon from './../../../../images/icons/ico-edit.svg';
import warningIcon from './../../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import ProfileActionButton from './../../../Shared/ProfileActionButton/ProfileActionButton';
import './DetailProfileListItem.css';

const ItemInfo = (props) => {
  return (
    <div className="item-info-container">
      <div className="item-info">
        {props.value ? <div className="item-info__value">{props.value}</div> : null}
        <div className="item-info__description">{props.description}</div>
      </div>
    </div>
  )
}

const ListMetaInfo = (props) => {
  const { title, status, value, icon } = props;
  return (
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
      {!value ?
        <div className="list-meta-info__right">
          <div className="item-edit-icon-mobile ripple">
            <img src={editIcon} alt="edit-icon" />
          </div>
          <div className="item-edit-icon-desktop">
            {!status ?
              <ProfileActionButton label={`Lengkapi ${title}`} />
              :
              <ProfileActionButton label="Ubah" />
            }
          </div>
        </div>
        : null}
    </div>
  )
}

const DetailProfileListItem = (props) => {
  const { icon, title, value, description, status } = props;
  return (
    <div className="detail-profile-list-item">
      <ListMetaInfo value={value} icon={icon} title={title} status={status} />
      <ItemInfo value={value} description={description} />
    </div>
  )
}

export default DetailProfileListItem;