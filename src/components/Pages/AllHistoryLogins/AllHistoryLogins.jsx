// Node Modules
import React, { Component } from 'react';

// Custom Components
import HistoryLogin from '../Dashboard/HistoryLogin/HistoryLogin';
import PageBackButton from './../../Shared/PageBackButton/PageBackButton';

// Custom Libraries
import { navigationStatus } from './../../../lib/utilities';

// Redux
import { connect } from 'react-redux';
import historyLoginActions from '../../../redux/actions/pages/historyLoginActions';
import './AllHistoryLogins.scss';
class AllHistoryLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    navigationStatus.next({
      navigationLink: 'History Login'
    });
    let {dispatch} = this.props;
    dispatch( historyLoginActions.getHistoryLoginList() );
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
};


export default connect(mapStateToProps)(AllHistoryLogins);