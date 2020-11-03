import React from "react";
import css from "../Input/Input.module.css";
const Input = (props) => {
  let cssArray = [];
  cssArray.push(css.InputElement);
  let validationError = null;
  if (!props.ShowValidationError && props.HasTouched) {
    cssArray.push(css.invalid);
    switch (props.FieldType) {
      case "name":
        validationError = <p>Name is Required</p>;
        break;

      case "Email":
        validationError = <p>Email is Required</p>;
        break;

      case "Address":
        validationError = <p>Address is Required</p>;
        break;

      case "Zip":
        validationError = <p>Zip not in Valid Format</p>;
        break;

      case "Country":
        validationError = <p>Country is Required</p>;
        break;

      default:
        validationError = <p>Required</p>;
        break;
    }
  }
  let inputElement = null;
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={cssArray.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={cssArray.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={css.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((ite) => {
            return (
              <option key={ite.value} value={ite.value}>
                {ite.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={css.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}> {props.label} </label>
      {inputElement}
      {validationError}
    </div>
  );
};
export default Input;
