import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

const configureStore = () => {
  const logger = createLogger();
  const enhancer = compose(
    composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk, logger)),
  );
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;
