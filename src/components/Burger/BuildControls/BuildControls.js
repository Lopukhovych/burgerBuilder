import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const buildControls = (props) => {
    let newControls = Object.keys(props.ingredientsList ? props.ingredientsList : {}).map((item) => {
        return {
            type: item,
            count: 0
        }
    });

    if (props.orderIngredients.length !== 0) {
        props.orderIngredients.forEach((item) => {
            for (let ckey in newControls) {
                if (newControls[ckey].type === item) newControls[ckey].count += 1;
            }
        });
    }
    return (
        <div className={classes.BuildControls}>
            {newControls.map((ctrl, i) => {
                return <BuildControl
                    key={ctrl.type + i }
                    label={ctrl.type}
                    disabled={ctrl.count <= 0}
                    addIngredient={() => props.addIngredient(ctrl.type)}
                    removeIngredient={() => props.removeIngredient(ctrl.type)}
                    count={ctrl.count}
                />
            })}
        </div>
    );
}

export default buildControls;
