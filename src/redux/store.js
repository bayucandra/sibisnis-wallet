import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpics from './epics';
import rootReducer from './reducers';


const epicMiddleware = createEpicMiddleware();

let compose_obj = process.env.NODE_ENV === 'development' ?
      compose(
        applyMiddleware(epicMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )

        :

      compose(
        applyMiddleware(epicMiddleware)
      );

export const store = createStore(
  rootReducer,
  compose_obj
);

epicMiddleware.run(rootEpics);