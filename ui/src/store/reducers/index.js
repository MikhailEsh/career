import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import auth from './auth';
import userInfo from './userInfo';
import history from '@career/history';

export default combineReducers({
  router: connectRouter(history),
  user: combineReducers({ info: userInfo, auth })
});
