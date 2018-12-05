import React from 'react';
import "./LoadingIndicatorBar.scss";
import biqHelper from "../../../lib/biqHelper";

class LoadingIndicatorBar extends React.Component {

  render() {
    let wrapperStyle = {};

    if ( !biqHelper.utils.isNull( this.props.wrapperStyle ) ) wrapperStyle = this.props.wrapperStyle;

    let barStyle = {};
    if ( !biqHelper.utils.isNull( this.props.barStyle ) ) barStyle = this.props.barStyle;

    Object.assign( wrapperStyle, this.props.style )

    return (
      <section className={`widget-loading-indicator-bar${ !biqHelper.utils.isNull( this.props.className ) ? ' ' + this.props.className : '' }` } style={wrapperStyle}>
        <div className="widget-loading-indicator-bar__bar-1" style={barStyle}/>
        <div className="widget-loading-indicator-bar__bar-2" style={barStyle}/>
      </section>
    );

  }

}

export default LoadingIndicatorBar;