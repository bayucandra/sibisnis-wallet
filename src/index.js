import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';
import { /*BrowserRouter as Router,*/ HashRouter /*, Route, Link*/ } from "react-router-dom";
//import createHistory from 'history/createBrowserHistory';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';//Consider to uninstall later
import { store } from './redux/store';
// Redux

import 'react-image-crop/dist/ReactCrop.css';

// import biqPolyfill from './lib/biqPolyfill/biqPolyfill';//TODO: Deprecated, remove later when sure babel polyfill handle all ES5
import "@babel/polyfill";

// import biqHelperClass from './lib/biqHelper/biqHelper';

//BEGIN INITALIZING ================
// new biqPolyfill();
// let biqHelper = new biqHelperClass();

var config = {
  apiKey: "AIzaSyCbCR4mvzjGTPDdzFnBfAEBKahVNj9skYg",
  authDomain: "testapi-220dc.firebaseapp.com",
  databaseURL: "https://testapi-220dc.firebaseio.com",
  projectId: "testapi-220dc",
  storageBucket: "testapi-220dc.appspot.com",
  messagingSenderId: "532452300007"
};

firebase.initializeApp(config);//TODO: remove later, for development purpose demo only
//END INITIALIZING***************

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
