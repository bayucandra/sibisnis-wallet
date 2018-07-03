import React, { Component } from 'react';

// Custom Components
import ProfileProgress from './ProfileProgress/ProfileProgress';
import HistoryLogin from './HistoryLogin/HistoryLogin';
import LatestNews from './LatestNews/LatestNews';

// Redux
import { getHistoryLoginList } from './../../../redux/actions/HistoryLoginActions';
import { getNewsList } from './../../../redux/actions/NewsActions'
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getHistoryLoginList();
    this.props.getNewsList();
  }

  render() {
    const { historyLoginList, newsList } = this.props;
    return (
      <React.Fragment>
        <ProfileProgress />
        <HistoryLogin historyLoginList={historyLoginList} />
        <LatestNews newsList={newsList} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    historyLoginList: store.HistoryLoginReducer.historyLoginList,
    newsList: store.NewsReducer.newsList,
  }
}

const mapDispatchToProps = {
  getHistoryLoginList,
  getNewsList
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);