import React from 'react';
import NavigationItemsCss from '../NavigationItems/NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem.js'
const NavigationItems = (props) => {
    return (
        <ul className={NavigationItemsCss.NavigationItems}>
             <NavigationItem link="/" exact>Home</NavigationItem>
             {props.isAuthenticated ? <NavigationItem link="/myorders">My Orders</NavigationItem>: null }
             {!props.isAuthenticated ? 
             <NavigationItem link="/auth">Authenticate</NavigationItem> :
             <NavigationItem link="/logout">LogOut</NavigationItem> }
        </ul>
    )
}
export default NavigationItems;