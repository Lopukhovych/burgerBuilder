import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const BASIC_BURGER_PRICE = 4;


const initialState = {
    ingredients: null,
    totalPrice: BASIC_BURGER_PRICE,
    error: null,
    building: false
};

const INGREDIENT_PRICES = {
    meat: 1.3,
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7
};
const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
};

const removeIngredient = (state, action) => {
    if (state.ingredients[action.ingredientName] <= 0) {
        return state;
    }
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    return updateObject(state, {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
};

const loadIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: BASIC_BURGER_PRICE,
        building: false
    });
};

const loadIngredientsFailed = (state, action) => {
    return updateObject(state, {error: action.error});
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.LOAD_INGREDIENTS:
            return loadIngredients(state, action);
        case actionTypes.LOAD_INGREDIENTS_FAILED:
            return loadIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default burgerBuilder;
