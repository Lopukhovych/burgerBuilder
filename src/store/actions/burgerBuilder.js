import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    INIT_LOAD_INGREDIENTS
} from './actionTypes';


export const addIngredient = (name) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ing) => {
    return {
        type: LOAD_INGREDIENTS,
        ingredients: ing,

    }
};

export const loadIngredietsFailed = (err) => {
    return {
        type: LOAD_INGREDIENTS_FAILED,
        error: err
    }
};

export const loadIngredients = () => {
    return {
        type: INIT_LOAD_INGREDIENTS
    };
};


