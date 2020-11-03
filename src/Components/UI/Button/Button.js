import React from "react";
import ButtonCss from "../Button/Button.module.css";
const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.buttonClickMethod}
      className={[ButtonCss.Button, ButtonCss[props.buttonType]].join(" ")}
    >
      {props.children}
    </button>
  );
};
export default Button;
