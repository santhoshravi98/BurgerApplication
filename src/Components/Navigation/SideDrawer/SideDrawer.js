import React from 'react'
import Logo from '../../UI/Logo/Logo.js'
import SideDrawerCss from '../SideDrawer/SideDrawer.module.css'
import NavigationItems from '../NavigationItems/NavigationItems.js'
import BackDrop from '../../UI/Backdrop/Backdrop.js'
import Aux from '../../../HOC/AuxFolder/Auxillary.js'
const SideDrawer = (props) => {
    let sideDrawerCss = [SideDrawerCss.SideDrawer,SideDrawerCss.Close];
    if(props.showSideDrawer)
    {
        sideDrawerCss = [SideDrawerCss.SideDrawer,SideDrawerCss.Open];
    }
return (
    <Aux>
    <BackDrop showBackdrop={props.showSideDrawer} refToCloseModalFunction={props.refToCloseSideDrawer}/>
    <div className={sideDrawerCss.join(' ')} onClick={props.refToCloseSideDrawer}>
        <div className={SideDrawerCss.Logo}>
        <Logo/>
        </div>
        <nav>
        <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
    </div>
    </Aux>
)
}; 
export default SideDrawer;