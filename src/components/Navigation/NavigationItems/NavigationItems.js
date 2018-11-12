import React, {Fragment} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let authNavigationList = (
        <Fragment>
            <NavigationItem hidePopupHandler={props.hidePopupHandler}
                            link='/orders'>Orders</NavigationItem>
            <NavigationItem hidePopupHandler={props.hidePopupHandler}
                            link='/logout'>Log out</NavigationItem>
            <NavigationItem hidePopupHandler={props.hidePopupHandler}
                            link='/profile'>My profile</NavigationItem>
        </Fragment>
    );

    let navigationList = (
        <ul className={classes.NavigationItems}>
            <NavigationItem hidePopupHandler={props.hidePopupHandler} link='/' exact>Burger Builder</NavigationItem>
            {props.authEmail
                ? authNavigationList
                : <NavigationItem hidePopupHandler={props.hidePopupHandler} link='/auth'>Log in</NavigationItem>}
            <NavigationItem  link='/help' exact>Help</NavigationItem>
        </ul>
    );
    return (
        <nav className={props.classes}>
            {navigationList}
        </nav>

    );
};

export default navigationItems;
