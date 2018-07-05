import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, HashRouter , Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import * as firebase from 'firebase';

// Redux
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { store, history } from './redux/store';

import 'react-image-crop/dist/ReactCrop.css';

var config = {
  apiKey: "AIzaSyCbCR4mvzjGTPDdzFnBfAEBKahVNj9skYg",
  authDomain: "testapi-220dc.firebaseapp.com",
  databaseURL: "https://testapi-220dc.firebaseio.com",
  projectId: "testapi-220dc",
  storageBucket: "testapi-220dc.appspot.com",
  messagingSenderId: "532452300007"
};

firebase.initializeApp(config);
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
