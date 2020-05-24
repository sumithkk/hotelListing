import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
