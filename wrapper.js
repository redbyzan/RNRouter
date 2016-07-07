/**
 * Created by roger on 2016. 6. 28..
 */
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from './apps/reducers';
import App from './apps/App';

const reducer = combineReducers(reducers);
const logger  = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const wrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default wrapper;