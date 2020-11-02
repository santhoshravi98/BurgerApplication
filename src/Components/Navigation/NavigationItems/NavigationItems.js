import React from 'react';
import NavigationItemsCss from '../NavigationItems/NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem.js'
const NavigationItems = (props) => {
    return (
        <ul className={NavigationItemsCss.NavigationItems}>
             <NavigationItem link="/" exact>Home</NavigationItem>
             <NavigationItem link="/myorders">My Orders</NavigationItem>
        </ul>
    )
}
export default NavigationItems;