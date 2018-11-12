import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";
import sagaMiddleware, {runSagas} from './store/sagas/index';
import pReducer from './store/reducers/index';
import {persistStore} from "redux-persist";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

runSagas();

export const persistor = persistStore(store);
