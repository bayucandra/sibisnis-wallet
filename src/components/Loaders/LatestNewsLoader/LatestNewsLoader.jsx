import React from 'react';

import './LatestNewsLoader.css';

const count = [1, 2, 3, 4, 5];

export const LatestNewsLoader = () => {
  return count.map((r, index) => {
    return (
      <div className="latest-new-loader" key={index}>
        <div className="latest-new-loader__title-placeholder"></div>
        <div className="latest-new-loader__date-placeholder"></div>
        <div className="latest-new-loader__content-placeholder-1"></div>
        <div className="latest-new-loader__content-placeholder-2"></div>
        <div className="latest-new-loader__content-placeholder-3"></div>
      </div>
    )
  })
}