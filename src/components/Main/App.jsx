import React, { Component } from 'react';

import Header from "./../Shared/Header/Header";
import PageLayout from './../PageLayout/PageLayout';
import AppActions from "../../redux/actions/AppActions";
class App extends Component {

  componentWillMount(){
    AppActions.setProfileData();
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

export default App;