import React from 'react';

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
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 5px',
            border: '1px solid #d68135',
            padding: '1px 5px'
        }} key={ig.name}>
            {ig.name} {ig.value}
        </span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
