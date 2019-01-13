import React from 'react';
import ReactDOM from 'react-dom';
import { /*BrowserRouter as Router,*/ HashRouter /*, Route, Link*/ } from "react-router-dom";

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
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
    MuiInputLabel: {
      root: {
        fontWeight: 'normal',
        color: '#999999'
      }
    },

    MuiFormLabel: {
      focused: {
        "&$focused": {
          color: "#4a90e2"
        }
      },

      root : {

        fontWeight: 'normal',
        color: '#999999',

        "&$error" : {
          fontWeight: 'normal',
          color: '#999999'
        }
      }

    },

    MuiInput: {
      input: {
        display: 'flex',
        padding: '0',
        height: '30px',

        fontSize: '15px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.5px',
        color: 'rgba(0, 0, 0, 0.87)',

        '&::placeholder' : {
          fontSize: '0.875rem',
          fontFamily: '"NunitoSans", sans-serif',
          fontWeight: '400',
          lineHeight: '1.5'
        }
      },

      underline: {
        ':not($disabled)&:before': { //underline color when textfield is inactive
          borderBottom: '1px solid #cccccc',
        },
        ':not($disabled):after': {
          borderBottom: '2px solid #4a90e2'
        },
        '&$error:after' : {
          transform: 'scaleX(0)'
        },
        '&$focused:after' : {
          transform: 'scaleX(1)!important',
          borderBottom: '2px solid #4a90e2'
        }
/*        '&:hover:not($disabled):before': { //underline color when hovered
          backgroundColor: 'green',
        },*/
      },

      error: {
        underline: {
          ':not($disabled)&:before': { //underline color when textfield is inactive
            borderBottom: '1px solid #cccccc',
          }

        }
      }
    },

    MuiFormHelperText: {

      root: {
        color: '#80858a',

        '&$error': {
          marginTop: '4px',
          fontSize: '12px',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 'normal',
          letterSpacing: '0.4px',
          color: '#ff233e'
        }

      }

    },

    MuiMenuItem: {
      root: {
        height: 'auto'
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
