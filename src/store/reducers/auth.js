import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


export const initialState = {
    token: null,
    userId: null,
    email: null,
    loading: false,
    error: null,
    authRedirectPath: '/',
    expirationDate: null,
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};
const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.authData.token,
        userId: action.authData.id,
        email: action.authData.email,
        expirationDate: action.authData.expirationDate
    });
};

const authFail = (state, action) => {
  return updateObject(state, {
      error: action.error,
      loading: false
  });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        email: null,
        expirationDate: null
    })
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
      authRedirectPath: action.path
  })
};
// AUTH_SUCCESS, AUTH_EDIT_EMAIL, AUTH_EDIT_PASSWORD get same data from firebase,
// TODO change processing data response data with custom server in diff functions

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_EDIT_EMAIL:
            return authSuccess(state, action);
        case actionTypes.AUTH_EDIT_PASSWORD:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

const persistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['loading', 'error', 'authRedirectPath'],
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
export default persistReducer(persistConfig, reducer);
