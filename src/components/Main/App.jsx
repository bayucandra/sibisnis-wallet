import React, { Component } from 'react';
import Header from "./../Shared/Header/Header";
import Dashboard from "./../Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header/>
          <Dashboard/>
        </React.Fragment>
    )
  }
}

export default App;