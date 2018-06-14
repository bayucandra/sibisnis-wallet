import React, { Component } from 'react';
import DashboardLayout from './../DashboardLayout/DashboardLayout';
import AllNews from './../Pages/AllNews/AllNews';
import AllHistorLogins from './../Pages/AllHistoryLogins/AllHistoryLogins';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from "react-router-dom";
import './PageLayout.css';
import Modal from './../Shared/Modal/Modal';

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div id="main-area-content">
      <Modal/>
        <Switch>
          <Redirect from="/" exact={true} to="/dashboard" />
          <Route path="/dashboard" component={DashboardLayout}></Route>
          <Route path="/all-news" component={AllNews}></Route>
          <Route path="/all-history-logins" component={AllHistorLogins}></Route>
        </Switch>
      </div>
    )
  }
}

export default PageLayout;