import React from 'react'
import Logo from '../../UI/Logo/Logo.js'
import SideDrawerCss from '../SideDrawer/SideDrawer.module.css'
import NavigationItems from '../NavigationItems/NavigationItems.js'
import BackDrop from '../../UI/Backdrop/Backdrop.js'
import Aux from '../../../HOC/AuxFolder/Aux.js'
const SideDrawer = (props) => {
    let sideDrawerCss = [SideDrawerCss.SideDrawer,SideDrawerCss.Close];
    if(props.showSideDrawer)
    {
        sideDrawerCss = [SideDrawerCss.SideDrawer,SideDrawerCss.Open];
    }
return (
    <Aux>
    <BackDrop showBackdrop={props.showSideDrawer} refToCloseModalFunction={props.refToCloseSideDrawer}/>
    <div className={sideDrawerCss.join(' ')}>
        <div className={SideDrawerCss.Logo}>
        <Logo/>
        </div>
        <nav>
        <NavigationItems/>
        </nav>
    </div>
    </Aux>
)
}; 
export default SideDrawer;