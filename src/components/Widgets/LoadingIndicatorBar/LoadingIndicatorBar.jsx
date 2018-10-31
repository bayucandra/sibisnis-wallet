import React from 'react';
import "./LoadingIndicatorBar.scss";

class LoadingIndicatorBar extends React.Component {

  render() {

    return (
      <section className="widget-loading-indicator-bar">
        <div className="widget-loading-indicator-bar__bar-1"/>
        <div className="widget-loading-indicator-bar__bar-2"/>
      </section>
    );

  }

}

export default LoadingIndicatorBar;