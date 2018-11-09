import * as actionTypes from './actionTypes';


export const addIngredientInit = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT_INIT,
        ingredientName: name
    }
};
export const addIngredient = (updatedIngredientsList, totalPrice) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        updatedIngredientsList: updatedIngredientsList,
        totalPrice: totalPrice
    }
};

export const removeIngredientInit = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT_INIT,
        ingredientName: name
    }
};
export const removeIngredient = (updatedIngredientsList, totalPrice) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        updatedIngredientsList: updatedIngredientsList,
        totalPrice: totalPrice
    }
};

export const setIngredients = (ing) => {
    // console.log('orderIngredients: ', ing);
    return {
        type: actionTypes.LOAD_INGREDIENTS,
        ingredients: ing,

    }
};

export const loadIngredientsFailed = (err) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS_FAILED,
        error: err
    }
};

export const loadIngredients = () => {
    return {
        type: actionTypes.INIT_LOAD_INGREDIENTS
    };
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    };
};


