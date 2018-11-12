import * as actionTypes from './actionTypes';


export const burgerAddIngredientInit = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT_INIT,
        ingredientName: name
    }
};
export const burgerAddIngredient = (updatedIngredientsList, totalPrice) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        updatedIngredientsList: updatedIngredientsList,
        totalPrice: totalPrice
    }
};

export const burgerRemoveIngredientInit = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT_INIT,
        ingredientName: name
    }
};
export const burgerRemoveIngredient = (updatedIngredientsList, totalPrice) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        updatedIngredientsList: updatedIngredientsList,
        totalPrice: totalPrice
    }
};

export const burgerLoadIngredients = (ing) => {
    // console.log('orderIngredients: ', ing);
    return {
        type: actionTypes.LOAD_INGREDIENTS,
        ingredients: ing,

    }
};

export const burgerLoadIngredientsFailed = (err) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS_FAILED,
        error: err
    }
};

export const burgerLoadIngredientsInit = () => {
    return {
        type: actionTypes.INIT_LOAD_INGREDIENTS
    };
};

export const burgerResetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    };
};


