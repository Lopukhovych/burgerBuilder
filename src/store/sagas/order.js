import {put, select,takeEvery} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import {createNotification} from '../../shared/notification';
import * as actionTypes from "../actions/actionTypes";



export function* purchaseBurgerInitSaga(action) {
    const state = yield select();
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + state.auth.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
        yield createNotification('success', 'Order was successfully sent!');
        yield put(actions.burgerResetIngredients());
    } catch (error) {
        yield put(actions.purchaseBurgerFail());
        yield createNotification('error','Error', 'Error with sending order!');
    }
}

export function* fetchOrdersSaga(action) {
    const state = yield select();
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${state.auth.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const resp = yield axios.get('orders.json' + queryParams);
        let fetchedOrders = [];
        for (const key in resp.data) {
            yield fetchedOrders.push({
                ...resp.data[key],
                id: key
            });
        }
        fetchedOrders.forEach((item) => {
            item.ingredients = item.ingredients.split(',');
        });
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}


export function* watchOrder() {
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerInitSaga);
}
