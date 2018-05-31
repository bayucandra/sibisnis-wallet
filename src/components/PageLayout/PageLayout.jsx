import React, { Component } from 'react';
import DashboardLayout from './../DashboardLayout/DashboardLayout';
import AllNews from './../Pages/AllNews/AllNews';
import AllHistorLogins from './../Pages/AllHistoryLogins/AllHistoryLogins';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Route exact path="/" component={DashboardLayout}></Route>
        <Route path="/all-news" component={AllNews}></Route>
        <Route path="/all-history-logins" component={AllHistorLogins}></Route>
      </div>
    )
  }
}

export default PageLayout;