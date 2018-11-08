import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Meat', type:'meat'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map((ctrl) => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]}
                addIngredient={() => props.addIngredient(ctrl.type)}
                removeIngredient={() => props.removeIngredient(ctrl.type)}
                count={props.ingredients[ctrl.type]}
            />
        })}
    </div>
);

export default buildControls;
