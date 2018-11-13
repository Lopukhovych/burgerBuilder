import React from 'react';
import classes from './Section.css';
const Section = (props) => {
    return (
        <div className={classes.Section}>
            {props.children}
        </div>
    );
};

/*
 Это не hoc, просто врапер
*/

export default Section;

