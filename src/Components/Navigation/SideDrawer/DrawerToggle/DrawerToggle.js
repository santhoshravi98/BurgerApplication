import React from 'react';
import DrawerToggleCss from '../DrawerToggle/DrawerToggle.module.css';
const DrawerToggle = (props) => {
return(
    <div onClick={props.refToToggleSideDrawer} className={DrawerToggleCss.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
}
export default DrawerToggle;