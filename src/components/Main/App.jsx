import React, { Component } from 'react';
import Header from "./../Shared/Header/Header";
import DashboardLayout from "./../DashboardLayout/DashboardLayout";

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header/>
          <DashboardLayout/>
        </React.Fragment>
    )
  }
}

export default App;