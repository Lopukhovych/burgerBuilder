import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import {createNotification} from '../../shared/notification';


export function* purchaseBurgerInitSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
        yield createNotification('success', 'Order was successfully sent!');
        yield put(actions.resetIngredients());
    } catch (error) {
        yield put(actions.purchaseBurgerFail());
        yield createNotification('error','Error', 'Error with sending order!');
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const resp = yield axios.get('orders.json' + queryParams);
        let fetchedOrders = [];
        for (const key in resp.data) {
            yield fetchedOrders.push({
                ...resp.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}
