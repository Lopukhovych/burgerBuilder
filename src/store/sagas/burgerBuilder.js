import {put, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from "../actions/actionTypes";


const BASIC_BURGER_PRICE = 4.0;


const INGREDIENT_PRICES = {
    meat: 1.3,
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7
};
const countTotalPrice = (updatedIngredientsList) => {
    return updatedIngredientsList.reduce((acc, item) => {
        return +acc + INGREDIENT_PRICES[item]
    }, BASIC_BURGER_PRICE)
};

export function* loadIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.burgerLoadIngredients(response.data));
    } catch (error) {
        yield put(actions.burgerLoadIngredientsFailed(error));
    }
}

export function* addIngredientInitSaga(action) {
    const state = yield select();
    const updatedOrderIngredientsList = [action.ingredientName, ...state.burgerBuilder.orderIngredientsList];
    const totalPrice = countTotalPrice(updatedOrderIngredientsList);
    yield put(actions.burgerAddIngredient(updatedOrderIngredientsList, totalPrice));
}

export function* removeIngredientInitSaga(action) {
    const state = yield select();
    let updatedOrderIngredientsList = state.burgerBuilder.orderIngredientsList.slice();
    if (state.burgerBuilder.orderIngredientsList.indexOf(action.ingredientName) !== -1) {
        updatedOrderIngredientsList.splice(state.burgerBuilder.orderIngredientsList.indexOf(action.ingredientName), 1);
    }
    const totalPrice = countTotalPrice(updatedOrderIngredientsList);
    yield put(actions.burgerAddIngredient(updatedOrderIngredientsList, totalPrice));
}


export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_LOAD_INGREDIENTS, loadIngredientsSaga);
    yield takeEvery(actionTypes.ADD_INGREDIENT_INIT, addIngredientInitSaga);
    yield takeEvery(actionTypes.REMOVE_INGREDIENT_INIT, removeIngredientInitSaga);
}
