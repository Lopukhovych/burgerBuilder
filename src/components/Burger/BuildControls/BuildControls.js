import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const buildControls = (props) => {
    let newControls = Object.keys(props.ingredientsList ? props.ingredientsList : {}).map((item) => {
        return {
            label: capitalizeFirstLetter(item),
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
            {newControls.map((ctrl) => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
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
