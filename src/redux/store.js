import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/index';
import rootReducer from './reducer';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [sagaMiddleware, routerMiddleware(history)];

// Configurations for Redux Dev Tools
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
);

// Mount everything on the Store
const store = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers);

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
