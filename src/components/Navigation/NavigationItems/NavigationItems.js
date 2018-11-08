import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let navigationList = (
        <ul className={classes.NavigationItems}>
            <NavigationItem  hidePopupHandler={props.hidePopupHandler} link='/' exact>Burger Builder</NavigationItem>
            {/*<NavigationItem link='/orders'>Orders</NavigationItem>*/}
            <NavigationItem hidePopupHandler={props.hidePopupHandler} link='/auth'>Log in</NavigationItem>
        </ul>
    );
    if (props.authEmail) {
        navigationList = (
            <ul className={classes.NavigationItems}>
                <NavigationItem hidePopupHandler={props.hidePopupHandler}
                                link='/' exact>Burger Builder</NavigationItem>
                <NavigationItem hidePopupHandler={props.hidePopupHandler}
                                link='/orders'>Orders</NavigationItem>
                <NavigationItem hidePopupHandler={props.hidePopupHandler}
                                link='/logout'>Log out</NavigationItem>
                <NavigationItem hidePopupHandler={props.hidePopupHandler}
                                link='/profile'>My profile</NavigationItem>
            </ul>
        );
    }
    return (
        <nav className={props.classes}>
            {navigationList}
        </nav>

    );
};

export default navigationItems;
