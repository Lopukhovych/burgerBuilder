import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const BASIC_BURGER_PRICE = 4;

const initialState = {
    ingredients: null,
    orderIngredientsList: [],
    totalPrice: BASIC_BURGER_PRICE,
    error: null,
    building: false
};

const addIngredient = (state, action) => {
    return updateObject(state, {
        orderIngredientsList: action.updatedIngredientsList,
        totalPrice: action.totalPrice,
        building: true
    });
};

const removeIngredient = (state, action) => {
    return updateObject(state, {
        orderIngredientsList: action.updatedIngredientsList,
        totalPrice: action.totalPrice,
        building: true
    });
};

const loadIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        building: false
    });
};

const loadIngredientsFailed = (state, action) => {
    return updateObject(state, {error: action.error});
};

const resetIngredientsState = (state, action) => {
    return updateObject(state, {
        orderIngredientsList: [],
        totalPrice: BASIC_BURGER_PRICE,
        error: null,
        building: false
    });
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
        case actionTypes.RESET_INGREDIENTS:
            return resetIngredientsState(state, action);
        default:
            return state;
    }
};

export default burgerBuilder;
