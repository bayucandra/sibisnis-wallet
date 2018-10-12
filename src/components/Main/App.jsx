import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from "./../Shared/Header/Header";
import PageLayout from './../PageLayout/PageLayout';
import AppActions from "../../redux/actions/AppActions";
class App extends Component {

  componentWillMount(){
    this.props.setProfileData();
  }

  render() {
    return (
        <React.Fragment>
          <Header/>
          <PageLayout/>
        </React.Fragment>
    )
  }
}

export default withRouter(connect(null, AppActions)(App) );