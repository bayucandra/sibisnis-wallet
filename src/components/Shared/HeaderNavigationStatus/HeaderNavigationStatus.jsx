// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Local Images
import backIcon from './../../../images/icons/back-white.svg';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Custom CSS
import './HeaderNavigationStatus.css';

class HeaderNavigationStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationLabel: 'BantulPulsa',
      navigationState: false,
      navigationLink: false
     }
  }

  componentWillMount() {
    navigationStatus.subscribe(
      (data) => {
        if (data.navigationLink) {
          this.setState({
            navigationLabel: data.navigationLink,
            navigationState: false,
            navigationLink: true
          });
        } else if (data.navigationState) {
          this.setState({
            navigationLabel: data.navigationState,
            navigationState: true,
            navigationLink: false
          });
        }
      }
    )
  }

  onBackClick = (name) => {
    let previousLink = '';

    if (this.state.navigationState) {
      if(this.state.navigationLabel === 'Dashboard' ||
       this.state.navigationLabel === 'Detail Profile' ||
       this.state.navigationLabel === 'Tambah Saldo'
      ){
        if(this.props.location.pathname === "/dashboard/detail-profile" || this.props.location.pathname === "/dashboard/deposit-requirements-check" ){
          this.props.history.goBack();
          navigationStatus.next({ navigationState: 'BantulPulsa'});
        }else{
          navigationStatus.next({ navigationState: 'BantulPulsa'});
        }
      }
    } else if (this.state.navigationLink) {
        this.props.history.goBack();
        navigationStatus.next({navigationState: 'BantulPulsa'})
    }

  }

  goToDashboard = () =>{
    this.props.history.push('/');
  }

  render() {
    const { navigationLabel } = this.state;
    return (
      <div className="header-navigation-status">
        {navigationLabel !== "BantulPulsa" ?
          <div className="navigation-container back-btn-navigation">
            <div className="icon-touch-area-container-40 back-icon-container ripple" onClick={this.onBackClick.bind(this)}>
              <img src={backIcon} alt="back-icon" />
            </div>
            <div className="navigation-label">{navigationLabel}</div>
          </div> :
          <div className="navigation-container">
            {navigationLabel == 'BantulPulsa' ?
              <div className="navigation-label home-page-label ripple" onClick={this.goToDashboard.bind(this)}>{navigationLabel}</div>
              :
              <div className="navigation-label">{navigationLabel}</div>
            }
          </div>
        }
      </div>
     )
  }
}

export default withRouter(HeaderNavigationStatus);