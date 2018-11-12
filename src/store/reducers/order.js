import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const initialState = {
    orders: [],
    purchased: false,
    loading: false,
    error: false
};

const purchaseBurgerInit = (state, action) => {
    return updateObject(state, {purchased: false});
};
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.id,
    };
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
    });
};

const purchaseBurgerFail = (state) => {
    return updateObject(state, {
        loading: false
    });
};
const purchaseBurgerStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const fetchOrderStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};
const fetchOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state, action);
        default:
            return state;
    }
};

const persistConfig = {
    key: 'order',
    storage: storage,
    blacklist: ['loading', 'error'],
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
export default persistReducer(persistConfig, orderReducer);

