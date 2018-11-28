import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
//import createHistory from 'history/createBrowserHistory'//TODO: Consider to uninstall later
//import { routerMiddleware } from 'react-router-redux';//TODO: Consider to uninstall later

import rootEpics from './epics';
import rootReducer from './reducers';


const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

epicMiddleware.run(rootEpics);