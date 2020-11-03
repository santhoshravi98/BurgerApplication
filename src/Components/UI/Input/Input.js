import React from "react";
import css from '../Input/Input.module.css'
const Input = (props) => {
  let cssArray = [];
  cssArray.push(css.InputElement);
  if(!props.ShowValidationError)
  {
    cssArray.push(css.invalid);
  }
  let inputElement = null;
  switch (props.inputtype) {
    case "input":
      inputElement = <input className={cssArray.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
    case "textarea":
      inputElement = <textarea className={cssArray.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
      case "select":
      inputElement = (
      <select className={css.InputElement} value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map((ite) => {
          return <option key={ite.value} value={ite.value}>
            {ite.displayValue}
          </option>
        })}
        </select>
      )
      break;
      default:
          inputElement = <input className={css.InputElement} {...props.elementConfig} value={props.value}/>
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}> {props.label} </label>
      {inputElement}
    </div>
  );
};
export default Input;
