import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    for (let ingredient in props.ingredients) {

        if (props.ingredients[ingredient] !== 0) ingredients.push({
            name: ingredient,
            value: props.ingredients[ingredient]
        });
    }
    let ingredientsOutput = ingredients.map(ig => {
        return <span className={classes.IngredientItem} key={ig.name}>
            {ig.value}
        </span>
    });
    return (
        <div className={classes.Order} onClick={() => { props.history.push(`${props.location.pathname}/${props.index}`) }}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default withRouter(order);
