// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Material UI
import { Button } from '../../Widgets/material-ui';

import HeaderMenuMobile from "../HeaderMenuMobile";

// Local Images
import switchIcon from './../../../images/icons/switch.svg';
import logoutIcon from './../../../images/icons/logout.svg';

// Custom Libraries
import biqHelper from "../../../lib/biqHelper";
import biqConfig from "../../../providers/biqConfig";

// Custom CSS
import './Header.scss';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  onSwitch = () => {
    biqHelper.utils.clickTimeout( () => {
      window.location = biqConfig.agen.url_base;
    } );
  };

  goToDashboard = () =>{
    biqHelper.utils.clickTimeout( () =>{
      this.props.history.push('/');
    } );
  };

  render() {
    return (
      <div className={`biq-wrapper header-main${!this.props.main_header_mobile_show ? ' header-main--hidden-mobile' : ''}`}>

        <div className="biq-wrapper__inner header-main__inner">

          <div className="left">

            <Button className="switch-btn visible-md-up" onClick={this.onSwitch}>
              <img src={switchIcon} alt="switch" />
            </Button>

            <Button className="brand" onClick={this.goToDashboard}>
               BantulPulsa
            </Button>

          </div>

          <div className="right">

            <Button className="logout-btn visible-md-up">
              <img src={logoutIcon} className="logout-btn__icon" onClick={this.onSwitch} alt="switch" />
              <span className="logout-btn__text">Logout</span>
            </Button>

            <HeaderMenuMobile/>

          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    main_header_mobile_show: state.app.main_header_mobile_show
  }
};

export default withRouter( connect( mapStateToProps ) (Header) );