import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SiteDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => {
    return (
        <header>
            <div className={classes.Toolbar}>
                <DrawerToggle toggleSideDrawer={props.showSideDrawer}/>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <div className={classes.DesktopOnly}>
                    <NavigationItems authEmail={props.authEmail} classes={classes.ToolbarItem}/>
                </div>
            </div>
        </header>
    );
};

export default toolbar;

