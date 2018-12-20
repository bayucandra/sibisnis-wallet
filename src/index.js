import React from 'react';
import ReactDOM from 'react-dom';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import './styles/styles.scss';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { /*BrowserRouter as Router,*/ HashRouter /*, Route, Link*/ } from "react-router-dom";

//import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';//Consider to uninstall later
import { store } from './redux/store';
// Redux

// import biqPolyfill from './lib/biqPolyfill/biqPolyfill';//TODO: Deprecated, remove later when sure babel polyfill handle all ES5
import "@babel/polyfill";
import "moment/locale/id";

// import biqHelperClass from './lib/biqHelper/biqHelper';

//BEGIN INITALIZING ================
// new biqPolyfill();
// let biqHelper = new biqHelperClass();


const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

const THEME = createMuiTheme({

  typography: {
    fontFamily: `"NunitoSans", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightMedium: 600,
    useNextVariants: true
  },

  overrides: {
    MuiButton: {
      root: { // Name of the rule
        "textTransform": "none",
        "padding" : 0,
        "minHeight" : 0,
        "minWidth" : 0,
        "component" : "div"
      },
    },
    MuiTextField: {
      root: {

      }
    },

    MuiMenuItem: {
      root: {
        height: 'auto'
      }
    },

    MuiFormLabel: {
      focused: {
        "&$focused": {
          color: "#4a90e2"
        }
      }
    }

  }//overrides

});

//END INITIALIZING***************

class Index extends React.Component {
  render() {
      return (
        <MuiThemeProvider theme={THEME}>
          <Provider store={ store }>
            <HashRouter hashType={"hashbang"}>
              <JssProvider jss={jss} generateClassName={generateClassName}>
                <App />
              </JssProvider>
            </HashRouter>
          </Provider>
        </MuiThemeProvider>
      );
  }
}

ReactDOM.render(
<Index />,
 document.getElementById('root'));
// registerServiceWorker();//TODO: enable in production env
