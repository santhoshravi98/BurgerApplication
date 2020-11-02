import React from "react";
import css from '../Input/Input.module.css'
const Input = (props) => {
  let inputElement = null;
  switch (props.inputtype) {
    case "input":
      inputElement = <input className={css.InputElement} {...props}/>;
      break;
    case "textarea":
      inputElement = <textarea className={css.InputElement} {...props}/>;
      break;
      default:
          inputElement = <input className={css.InputElement} {...props}/>
  }
  return (
    <div className={css.Input}>
      <lable className={css.Label}> {props.label} </lable>
      {inputElement}
    </div>
  );
};
export default Input;
