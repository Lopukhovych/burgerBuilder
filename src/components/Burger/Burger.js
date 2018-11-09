import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = [...props.ingredients]
        .map((igKey, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });


    if (transformedIngredients.length === 0) {
        transformedIngredients = <p className={classes.addIngredients}>Please start adding ingredients!</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
};

export default burger;
