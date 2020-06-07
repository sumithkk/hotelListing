/* eslint-disable no-underscore-dangle */
// Startup point for client-side application

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import reducers from './reducers';
import Routes from './Routes';
import { composeWithDevTools } from 'redux-devtools-extension';
import { consolidateStreamedStyles } from 'styled-components';

const state = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;

const store = createStore(reducers, state, composeWithDevTools(applyMiddleware(thunk)));

/* Make sure you call this before ReactDOM.hydrate! */
consolidateStreamedStyles();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>{renderRoutes(Routes)}</React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
