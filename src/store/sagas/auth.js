import {delay} from 'redux-saga';
import {put, call, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from "axios";
import {createNotification} from '../../shared/notification';

const axiosHeader = {
    headers: {"Content-Type": "application/json"}
};

export function* logoutSaga(action) {
    yield call([localStorage, 'clear']);
    yield put(actions.authLogoutSucceed());
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expireTime * 1000);
    yield put(actions.authLogout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    let authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let urlBase = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
    if (action.authType === 'signin') {
        urlBase = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
    }
    try {
        const resp = yield axios.post(urlBase + 'AIzaSyD10EGa7tlAFSqxhSzfqo1l8CnwXNW0AIg', authData);
        yield put(actions.setLocalStorage(resp.data));
        let userData = {
            email: resp.data.email,
            token: resp.data.idToken,
            id: resp.data.localId
        };
        yield createNotification('success', 'Success logged in');
        yield put(actions.authSuccess(userData));
        yield put(actions.checkAuthTimeout(resp.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            yield put(actions.authLogout());
        } else {
            yield put(actions.authSuccess({
                email: yield JSON.parse(localStorage.getItem('user'))['email'],
                token: yield localStorage.getItem('token'),
                id: yield JSON.parse(localStorage.getItem('user'))['id'],
            }));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }

    }
}

export function* setLocalStorageSaga(action) {
    const expireDate = yield new Date(new Date().getTime() + action.data.expiresIn * 1000);
    yield localStorage.setItem('token', action.data.token);
    yield localStorage.setItem('user', JSON.stringify({
        email: action.data.email,
        id: action.data.id
    }));
    yield localStorage.setItem('expirationDate', expireDate);
}

export function* authEditEmailInitSaga(action) {
    const state = yield select();
    console.log('new Email: ', action.email);
    console.log('stateSaga: ', state.auth.token);
    let authData = JSON.stringify({
        idToken: state.auth.token,
        email: action.email,
        returnSecureToken: true,
    });
    let urlBase = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=';
    try {
        const resp = yield axios.post(urlBase + 'AIzaSyD10EGa7tlAFSqxhSzfqo1l8CnwXNW0AIg', authData, axiosHeader);
        // yield put(actions.setLocalStorage(resp.data));
        let userData = {
            email: resp.data.email,
            token: resp.data.idToken,
            id: resp.data.localId
        };
        yield createNotification('success', 'Email has been successfully changed!');
        yield put(actions.authEditEmail(userData));
        yield put(actions.checkAuthTimeout(resp.data.expiresIn));
    } catch (error) {
        yield put(actions.authEditEmailFail(error));
        yield createNotification('error','Error', 'Error with changing email!');
    }
}

export function* authEditPasswordInitSaga(action) {
    const state = yield select();
    console.log('new Password: ', action.password);
    console.log('authToken: ', state.auth.token);
    let authData = JSON.stringify({
        idToken: state.auth.token,
        password: action.password,
        returnSecureToken: true,
    });
    let urlBase = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=';
    try {
        const resp = yield axios.post(urlBase + 'AIzaSyD10EGa7tlAFSqxhSzfqo1l8CnwXNW0AIg', authData, axiosHeader);
        // yield put(actions.setLocalStorage(resp.data));
        let userData = {
            token: resp.data.idToken,
            email: resp.data.email,
            id: resp.data.localId
        };
        yield createNotification('success', 'Password has been successfully changed!');
        yield put(actions.authEditPassword(userData));
        yield put(actions.checkAuthTimeout(resp.data.expiresIn));
    } catch (error) {
        yield put(actions.authEditPasswordFail(error));
        yield createNotification('error','Error', 'Error with changing email!');
    }

}
