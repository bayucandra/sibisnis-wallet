// Node Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Components
import SideNavMain from '../../Shared/SideNavMain/SideNavMain';

// Custom CSS
import './Dashboard.scss';
import ProfileProgress from "./ProfileProgress/ProfileProgress";
import HistoryLogin from "./HistoryLogin/HistoryLogin";
import LatestNews from "./LatestNews/LatestNews";
import {getHistoryLoginList} from "../../../redux/actions/pages/historyLoginActions";
import {getNewsList} from "../../../redux/actions/pages/newsActions";

class Dashboard extends Component {

  state = {};

  componentDidMount() {
    this.props.getHistoryLoginList();
    this.props.getNewsList();
  }

  render() {
    const { historyLoginList, newsList } = this.props;

    return (
      <div className="main-wrapper biq-wrapper l-dashboard">

        <div className="biq-wrapper__inner l-dashboard__inner">

          <SideNavMain />

          <div className="l-dashboard__panel">

            <ProfileProgress />
            <HistoryLogin historyLoginList={historyLoginList} />
            <LatestNews newsList={newsList} />

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