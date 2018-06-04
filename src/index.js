import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tippy/dist/tippy.css'
import './styles/styles.css';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, HashRouter , Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';


class Index extends React.Component {
  render() {
      return (
      <HashRouter hashType="hashbang">
        <App />
      </HashRouter>
      );
  }
}

ReactDOM.render(
<Index />,
 document.getElementById('root'));
registerServiceWorker();
