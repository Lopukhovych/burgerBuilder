import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import history from './history';

import * as store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Spinner from './components/UI/Spinner/Spinner';

const app = (
    <Provider store={store.store}>
        <PersistGate loading={<Spinner/>} persistor={store.persistor}>
            <Router history={history}>
                <App/>
            </Router>
        </PersistGate>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
