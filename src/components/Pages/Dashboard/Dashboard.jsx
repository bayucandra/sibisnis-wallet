import React, { Component } from 'react';
import { connect } from 'react-redux';

import dashboardActions from "redux/actions/pages/dashboardActions";

import biqHelper from "lib/biqHelper";

import {Button} from "components/Widgets/material-ui";
import SideNavMain from "components/Shared/SideNavMain/SideNavMain";

import HistoryLogin from "./HistoryLogin/HistoryLogin";
import LatestNews from "./LatestNews/LatestNews";
import historyLoginActions from "../../../redux/actions/pages/historyLoginActions";
import newsActions from "../../../redux/actions/pages/newsActions";
import DashboardProfile from "./DashboardProfile/DashboardProfile";
import HeaderMenuMobile from "../../Shared/HeaderMenuMobile/HeaderMenuMobile";

import './Dashboard.scss';

class Dashboard extends Component {

  _panelMobileToggle = () => {
    biqHelper.utils.clickTimeout( () => {
      let {dispatch} = this.props;
      dispatch( dashboardActions.dashboardPanelMobileVisibility() );
    } );
  };

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch( historyLoginActions.getHistoryLoginList() );
    dispatch( newsActions.getNewsList() );
  }

  render() {
    const { historyLoginList, newsList } = this.props;

    return (
      <div className="main-wrapper biq-wrapper biq-wrapper--md-no-side-padding l-dashboard">

        <div className="biq-wrapper__inner l-dashboard__inner">

          <SideNavMain/>

          <div className={`l-dashboard__panel${ this.props.dashboard.is_panel_mobile_visible ? ' is-visible-mobile' : '' }`}>

            <div className="l-dashboard__panel__header hidden-md-up">
              <Button className="back-btn" onClick={this._panelMobileToggle}>&nbsp;</Button>
              <div className="label">Dashboard</div>
              <HeaderMenuMobile forceVisible={true}/>
            </div>

            <div className="l-dashboard__panel__body">
              <DashboardProfile/>
              <HistoryLogin historyLoginList={historyLoginList} />
              <LatestNews newsList={newsList} />
            </div>

          </div>

        </div>

      </div>
     );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    historyLoginList: state.historyLogin.historyLoginList,
    newsList: state.news.newsList,
  }
};

export default connect( mapStateToProps )(Dashboard);