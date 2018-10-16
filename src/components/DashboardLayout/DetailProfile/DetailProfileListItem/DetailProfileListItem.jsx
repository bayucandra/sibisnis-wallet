// Node Modules
import React, { Component } from 'react';

// Local Images
import editIcon from './../../../../images/icons/ico-edit.svg';
import warningIcon from './../../../../images/icons/profile-verification-icons/ico-warning-red.svg';
import ProfileActionButton from './../../../Shared/ProfileActionButton/ProfileActionButton';

// Custom CSS
import './DetailProfileListItem.scss';

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
  const { title, status, value, icon, edit } = props;
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

      {(!value && edit) ?
        <div className="list-meta-info__right">
          <div className="item-edit-icon-mobile ripple" onClick={props.onActionClick.bind(null, (!status ? 'complete' : 'change'), props.id)}>
            <img src={editIcon} alt="edit-icon" />
          </div>
          <div className="item-edit-icon-desktop">
            {!status ?
              <ProfileActionButton onClick={props.onActionClick.bind(null, 'complete', props.id)} label={`Lengkapi ${title}`} />
              :
              <ProfileActionButton onClick={props.onActionClick.bind(null, 'change', props.id)} label="Ubah" />
            }
          </div>
        </div>
        : null}
    </div>
  )
}

const DetailProfileListItem = (props) => {
  const { icon, title, value, description, status, edit, id } = props;
  return (
    <div className="detail-profile-list-item">
      <ListMetaInfo {...props} />
      <ItemInfo value={value} description={description} />
    </div>
  )
}

export default DetailProfileListItem;