// Node Modules
import React, { Component } from 'react';

// Custom Components
import HistoryLogin from './../../DashboardLayout/Dashboard/HistoryLogin/HistoryLogin';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Redux
import { connect } from 'react-redux';
import { getHistoryLoginList } from './../../../redux/actions/HistoryLoginActions';
import './AllHistoryLogins.css';
class AllHistoryLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({
      navigationLink: 'History Login'
    });
    this.props.getHistoryLoginList();
  }

  render() {
    const { historyLoginList } = this.props;
    return (
      <div id="all-history-login-container">
        <PageBackButton />
        <HistoryLogin historyLoginList={historyLoginList} viewAll={true} />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    historyLoginList: store.historyLogin.historyLoginList
  }
}

const mapDispatchToProps = {
  getHistoryLoginList
}

export default connect(mapStateToProps, mapDispatchToProps)(AllHistoryLogins);