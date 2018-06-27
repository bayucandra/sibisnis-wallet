import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';

import epics from './epics';
import rootReducer from './reducers';



const epicMiddleware = createEpicMiddleware();
const initialState = {};
export const history = createHistory();
const routeMiddleware = routerMiddleware(history)

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(epicMiddleware, routeMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

epicMiddleware.run(epics);