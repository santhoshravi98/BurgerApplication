import React from 'react';
import LogoImage from '../../../Assets/Images/burger-logo.png';
import LogoCss from '../Logo/Logo.module.css';
const Logo = (props) => {
    return (
        <div className={LogoCss.Logo}>
            <img src={LogoImage} alt="burger logo"/>
        </div>
    )
}
export default Logo;