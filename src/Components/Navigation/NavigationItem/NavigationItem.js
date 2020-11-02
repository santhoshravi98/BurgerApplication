import React from "react";
import NavigationItemCss from "../NavigationItem/NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const NavigationItem = (props) => {
  return (
    <li className={NavigationItemCss.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  );
};
export default NavigationItem;
