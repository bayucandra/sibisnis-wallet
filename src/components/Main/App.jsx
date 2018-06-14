import React, { Component } from 'react';
import Header from "./../Shared/Header/Header";
import PageLayout from './../PageLayout/PageLayout';
class App extends Component {
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