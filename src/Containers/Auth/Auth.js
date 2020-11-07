import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Css from "../Checkout/ContactData/ContactData.module.css";
import * as ActionCreator from "../../Store/Actions/Index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    isSignUp: true,
    orderForm: {
      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Email Address",
        },
        value: "",
        validationRules: {
          required: true,
          isEmailType: true,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password",
        },
        value: "",
        validationRules: {
          required: true,
          length: 6,
        },
        validationPassed: false,
        HasTouched: false,
      },
    },
  };

  onChangeHandler = (event, id) => {
    //console.log(event.target.value);
    const formData = {
      ...this.state.orderForm,
    };
    const selectedOrderForm = {
      ...formData[id],
    };
    selectedOrderForm.value = event.target.value;
    selectedOrderForm.validationPassed = this.checkValidation(
      selectedOrderForm.value,
      selectedOrderForm.validationRules
    );
    selectedOrderForm.HasTouched = true;
    formData[id] = selectedOrderForm;
    // let formValid = true;
    // for (let i in formData) {
    //   if (formData[i].validationPassed === false) formValid = false;
    // }
    this.setState({
      orderForm: formData,
    });
  };

  isValidEmail = (email) => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email);
  };

  checkValidation = (value, rule) => {
    let validationPassed = false;

    if (rule.required === "skipped") validationPassed = true;
    else if (
      rule.required &&
      value.trim() !== "" &&
      rule.isEmailType &&
      this.isValidEmail(value)
    )
      validationPassed = true;
    else if (
      rule.required &&
      value.trim() !== "" &&
      rule.length === 6 &&
      value.length === 6
    )
      validationPassed = true;
    else if (rule.isNumeric) {
      const pattern = /^\d+$/;
      validationPassed = pattern.test(value);
    }
    return validationPassed;
  };

  buttonClickedHandler = (event) => {
    event.preventDefault();
    this.props.authUser(
      this.state.orderForm.Email.value,
      this.state.orderForm.Password.value,
      this.state.isSignUp
    );
  };

  loginClickHandler = () => {
    this.setState({
      isSignUp: false,
    });
  };

  signupClickHandler = () => {
    this.setState({
      isSignUp: true,
    });
  };

  render() {
    if(this.props.isAuthenticated)
    {
      if(this.props.totalPrice > 0)
      {
        this.props.history.push("/checkout");
      }
      else
      this.props.history.push("/");
    }
    let inputElementsArray = [];
    for (let i in this.state.orderForm) {
      inputElementsArray.push({
        id: i,
        configuration: this.state.orderForm[i],
      });
    }

    let dynamicDiv = null;
    if (this.props.showLoadingModal) {
      dynamicDiv = <Spinner />;
    } else {
      if (this.state.isSignUp) {
        dynamicDiv = (
          <div>
            <p>Create Account</p>
            <form onSubmit={this.buttonClickedHandler}>
              {inputElementsArray.map((iterator) => {
                return (
                  <Input
                    key={iterator.id}
                    inputtype={iterator.configuration.elementType}
                    value={iterator.configuration.value}
                    elementConfig={iterator.configuration.elementConfig}
                    label={iterator.configuration.elementConfig.label}
                    ShowValidationError={
                      iterator.configuration.validationPassed
                    }
                    HasTouched={iterator.configuration.HasTouched}
                    changed={(event) =>
                      this.onChangeHandler(event, iterator.id)
                    }
                    FieldType={iterator.id}
                  />
                );
              })}
              <Button buttonType="Success">Submit</Button>
            </form>
            <p>{this.props.error}</p>
          </div>
        );
      } else {
        dynamicDiv = (
          <div>
            <p>Login</p>
            <form onSubmit={this.buttonClickedHandler}>
              {inputElementsArray.map((iterator) => {
                return (
                  <Input
                    key={iterator.id}
                    inputtype={iterator.configuration.elementType}
                    value={iterator.configuration.value}
                    elementConfig={iterator.configuration.elementConfig}
                    label={iterator.configuration.elementConfig.label}
                    ShowValidationError={
                      iterator.configuration.validationPassed
                    }
                    HasTouched={iterator.configuration.HasTouched}
                    changed={(event) =>
                      this.onChangeHandler(event, iterator.id)
                    }
                    FieldType={iterator.id}
                  />
                );
              })}
              <Button buttonType="Success">Login</Button>
              <p>{this.props.error}</p>
            </form>
          </div>
        );
      }
    }
    return (
      <div className={Css.ContactData}>
        <Button buttonClickMethod={this.loginClickHandler} buttonType="Success">
          Login
        </Button>

        <Button buttonClickMethod={this.signupClickHandler} buttonType="Danger">
          Sign Up
        </Button>
        {dynamicDiv}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoadingModal: state.AuthReducer.showloadingModal,
    error: state.AuthReducer.error,
    isAuthenticated : state.AuthReducer.token !== null,
    totalPrice : state.BurgerBuilderReducer.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (username, password, isSignUp) =>
      dispatch(ActionCreator.authUser(username, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
