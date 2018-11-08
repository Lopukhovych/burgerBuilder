import {takeEvery} from 'redux-saga/effects';
// import {all} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga,
    setLocalStorageSaga,
    authEditEmailInitSaga,
    authEditPasswordInitSaga
} from './auth';
import {loadIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
    yield takeEvery(actionTypes.SET_LOCAL_STORAGE, setLocalStorageSaga);
    yield takeEvery(actionTypes.AUTH_EDIT_EMAIL_INIT, authEditEmailInitSaga);
    yield takeEvery(actionTypes.AUTH_EDIT_PASSWORD_INIT, authEditPasswordInitSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_LOAD_INGREDIENTS, loadIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
}


// for future using
// // foo.js
// export const fooSagas = [
//     takeEvery("FOO_A", fooASaga),
//     takeEvery("FOO_B", fooBSaga),
// ]
//
// // bar.js
// export const barSagas = [
//     takeEvery("BAR_A", barASaga),
//     takeEvery("BAR_B", barBSaga),
// ];
//
// // index.js
// import { fooSagas } from './foo';
// import { barSagas } from './bar';
//
// export default function* rootSaga() {
//     yield all([
//         ...fooSagas,
//         ...barSagas
//     ])
// }
