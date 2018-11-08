import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SiteDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const siteDrawer = (props) => {

    return (
        <Aux>
            <Backdrop show={props.sideDrawerStatus} hideHandler={props.hideSideDrawer}/>
            <div className={[classes.SiteDrawer, props.sideDrawerStatus ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavigationItems
                    authEmail={props.authEmail}
                    classes={classes.NavigationItems}
                    hidePopupHandler={props.hideSideDrawer}
                />
            </div>
        </Aux>

    );
};

export default siteDrawer;


