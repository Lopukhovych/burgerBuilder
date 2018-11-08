import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_INIT,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_INIT
} from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData,
    }
};

export const purchaseBurgerFail = () => {
    return {
        type: PURCHASE_BURGER_FAIL,
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: PURCHASE_BURGER_INIT,
        orderData: orderData,
        token: token
        // token: localStorage.getItem('token') ? localStorage.getItem('token') : null
    }
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    }
};


export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
    };

};

export const fetchOrders = (token, userId) => {
    return {
        type: FETCH_ORDERS_INIT,
        token: token,
        userId: userId
    };
};






