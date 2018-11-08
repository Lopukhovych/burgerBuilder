import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Loading}>
        <div className={classes.Loader}>Loading...</div>
        <span>Loading...</span>
    </div>
);

export default spinner;
