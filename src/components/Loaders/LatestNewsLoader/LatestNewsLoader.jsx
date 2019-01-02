import React from 'react';

import './LatestNewsLoader.scss';

const count = [1, 2, 3, 4, 5];

export default () => {
  return count.map((r, index) => {
    return (
      <div className="latest-new-loader" key={index}>
        <div className="latest-new-loader__title-placeholder"/>
        <div className="latest-new-loader__date-placeholder"/>
        <div className="latest-new-loader__content-placeholder-1"/>
        <div className="latest-new-loader__content-placeholder-2"/>
        <div className="latest-new-loader__content-placeholder-3"/>
      </div>
    )
  })
}