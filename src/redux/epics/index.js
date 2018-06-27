import { combineEpics } from 'redux-observable';

import * as UserEpics from './UserEpics';

export default combineEpics(
  // UserEpics.getUser
);
