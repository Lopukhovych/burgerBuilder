import React from 'react';
import classes from './Logo.css';
import {Link} from 'react-router-dom';

import BurgerLogo from '../../assets/images/burger_logo.png';

const logo = () => (
    <Link to='/'>
        <div className={classes.Logo}>
            <img src={BurgerLogo}  alt="Burger logo"/>
        </div>
    </Link>
);

export default logo;
