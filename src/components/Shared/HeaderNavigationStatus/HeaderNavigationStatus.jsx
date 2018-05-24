import React, { Component } from 'react';
import backIcon from './../../../images/icons/back-white.svg';
import { navigationStatus } from './../../../lib/utilities';

import './HeaderNavigationStatus.css';

class HeaderNavigationStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationLabel: 'BantulPulsa'
     }
  }

  componentWillMount() {
    navigationStatus.subscribe(
      (data) => {
        if (data.navigationLink) {
          this.setState({ navigationLabel: data.navigationLink });
        }
      }
    )
  }

  onBackClick = (name) => {
    let previousLink = '';
    if(this.state.navigationLabel === 'Dashboard'){
      navigationStatus.next({ navigationLink: 'BantulPulsa'});
    }
  }

  render() {
    const { navigationLabel } = this.state;
    return (
      <div className="header-navigation-status">
        <div className="navigation-container">
          {navigationLabel !== "BantulPulsa" ?
            <img src={backIcon} alt="back-icon" onClick={this.onBackClick.bind(this)} /> : null
          }
          <div className="navigation-label">{navigationLabel}</div>
        </div>
      </div>
     )
  }
}

export default HeaderNavigationStatus;