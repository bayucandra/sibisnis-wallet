import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';
import { /*BrowserRouter as Router,*/ HashRouter /*, Route, Link*/ } from "react-router-dom";
// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import createHistory from 'history/createBrowserHistory';
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

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"NunitoSans\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightMedium": 600
  }
});

//END INITIALIZING***************

class Index extends React.Component {
  render() {
      return (
        <MuiThemeProvider theme={THEME}>
          <Provider store={ store }>
            <HashRouter hashType="hashbang">
              <App />
            </HashRouter>
          </Provider>
        </MuiThemeProvider>
      );
  }
}

ReactDOM.render(
<Index />,
 document.getElementById('root'));
registerServiceWorker();
