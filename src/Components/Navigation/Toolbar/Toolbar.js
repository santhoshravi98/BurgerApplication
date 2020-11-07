import React from 'react';
import ToolbarCss from '../Toolbar/Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems.js'
import DrawerToggle from  '../SideDrawer/DrawerToggle/DrawerToggle.js'

const Toolbar = (props) => {
return (
        <header className={ToolbarCss.Toolbar}>
            <DrawerToggle refToToggleSideDrawer={props.refToToggleSideDrawer}/>
            <div onClick={props.refToOpenSideDrawer}>MENU</div>
            <div className={ToolbarCss.Logo}>
            <Logo/>
            </div>
            <nav className={ToolbarCss.DesktopOnly}>
                <NavigationItems isAuthenticated = {props.isAuthenticated}/>
            </nav>
        </header>
)
}
export default Toolbar;