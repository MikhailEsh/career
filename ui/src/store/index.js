import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import baseReducer from './reducers';
import { loadState, saveState } from '../utils';

const persistedState = loadState();

const store = createStore(
  baseReducer,
  persistedState
);

/*
  here we subscribing for every store change
  and process them in chunks accumulated for 1 sec
*/
store.subscribe(
  throttle(() => {
    const state = store.getState();
    const { user, reports, sideMenu, charts } = state;

    saveState({ user, reports, sideMenu, charts });
  }, 1000)
);

export default store;
