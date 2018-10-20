// Node Modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from "react-router-dom";
import $ from 'jquery';

// Custom Compoenents
// import Modal from './../Shared/Modal/Modal';//TODO: delete very soon
import AllHistorLogins from './../Pages/AllHistoryLogins/AllHistoryLogins';
import AllNews from './../Pages/AllNews/AllNews';
import DashboardLayout from './../DashboardLayout/DashboardLayout';

// Custom CSS
import './PageLayout.scss';

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUpdate() {
    // window.scrollTo(0,0);
    let body = $('html, body');
    body.stop().animate({scrollTop:0}, 500, 'swing');
  }

  render() {
    return (
      <div id="main-area-content">
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