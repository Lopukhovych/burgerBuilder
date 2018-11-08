import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button className={[classes.Button, classes[props.btnType], props.disabled ? classes.Disabled : ''].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
            type={props.type ? props.type : 'submit'}
    > {props.children}</button>
);

export default button;
