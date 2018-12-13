// Node Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Components
import {Button} from "components/Widgets/material-ui";
import SideNavMain from "components/Shared/SideNavMain/SideNavMain";

// Custom CSS
import './Dashboard.scss';
import ProfileProgress from "./ProfileProgress/ProfileProgress";
import HistoryLogin from "./HistoryLogin/HistoryLogin";
import LatestNews from "./LatestNews/LatestNews";
import {getHistoryLoginList} from "../../../redux/actions/pages/historyLoginActions";
import {getNewsList} from "../../../redux/actions/pages/newsActions";
import DashboardProfile from "./DashboardProfile/DashboardProfile";
import biqHelper from "../../../lib/biqHelper";
import HeaderMenuMobile from "../../Shared/HeaderMenuMobile/HeaderMenuMobile";

class Dashboard extends Component {

  state = {
    is_panel_mobile_visible: false
  };

  panelMobileToggle = () => {
    this.setState( { is_panel_mobile_visible: !this.state.is_panel_mobile_visible } );
  };

  _panelMobileToggle = () => {
    biqHelper.utils.clickTimeout( () => {
      this.panelMobileToggle();
    } );
  };

  componentDidMount() {
    this.props.getHistoryLoginList();
    this.props.getNewsList();
  }

  render() {
    const { historyLoginList, newsList } = this.props;

    return (
      <div className="main-wrapper biq-wrapper l-dashboard">

        <div className="biq-wrapper__inner l-dashboard__inner">

          <SideNavMain dashboardPanelMobileToggle={this.panelMobileToggle}/>

          <div className={`l-dashboard__panel${ this.state.is_panel_mobile_visible ? ' is-visible-mobile' : '' }`}>

            <div className="l-dashboard__panel__header hidden-md-up">
              <Button className="back-btn" onClick={this._panelMobileToggle}>&nbsp;</Button>
              <div className="label">Dashboard</div>
              <HeaderMenuMobile forceVisible={true}/>
            </div>

            <div className="l-dashboard__panel__body">
              {/*<ProfileProgress />*/}
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

const mapStateToProps = (store) => {
  return {
    historyLoginList: store.historyLogin.historyLoginList,
    newsList: store.news.newsList,
  }
};


const mapDispatchToProps = {
  getHistoryLoginList,
  getNewsList
};

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);