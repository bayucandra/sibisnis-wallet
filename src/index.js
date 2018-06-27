import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, HashRouter , Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

// Redux
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { store, history } from './redux/store';

import 'react-image-crop/dist/ReactCrop.css';

class Index extends React.Component {
  render() {
      return (
        <Provider store={ store }>
          <HashRouter hashType="hashbang">
            <App />
          </HashRouter>
        </Provider>
      );
  }
}

ReactDOM.render(
<Index />,
 document.getElementById('root'));
registerServiceWorker();
