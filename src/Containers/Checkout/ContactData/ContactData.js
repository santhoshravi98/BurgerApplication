import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Css from "../ContactData/ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner.js";
import { withRouter } from "react-router";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import * as OrderActionCreator from "../../../Store/Actions/Index";


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Name",
        },
        value: "",
        validationRules: {
          required: true,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Email",
        },
        value: "",
        validationRules: {
          required: true,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Address",
        },
        value: "",
        validationRules: {
          required: true,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter ZipCode",
        },
        value: "",
        validationRules: {
          length: 5,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Country",
        },
        value: "",
        validationRules: {
          required: true,
        },
        validationPassed: false,
        HasTouched: false,
      },
      Delivery: {
        elementType: "select",
        elementConfig: {
          label: "Select the Delivery Method",
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" },
          ],
        },
        value: "fastest",
        validationRules: {
          required: "skipped",
        },
        validationPassed: true,
      },
    },
    overallformValid: false,
  };

  checkValidation = (value, rule) => {
    let validationPassed = false;

    if (rule.required === "skipped") validationPassed = true;
    else if (rule.required && value.trim() !== "") validationPassed = true;
    else if (rule.length === 5 && value.length === 5) validationPassed = true;

    return validationPassed;
  };

  buttonClickedHandler = (event) => {
    event.preventDefault();
    let customerInfo = {};
    for (let info in this.state.orderForm) {
      customerInfo[info] = this.state.orderForm[info].value;
    }
    let postData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: customerInfo,
    };
    this.props.postIng(postData,this.props.token);
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
    let formValid = true;
    for (let i in formData) {
      if (formData[i].validationPassed === false) formValid = false;
    }
    console.log("form valid" + formValid);
    this.setState({
      orderForm: formData,
      overallformValid: formValid,
    });
  };

  render() {
    if(this.props.purchaseCompleted)
    {
      window.location = '/';
    }
    let dynamicDiv = null;
    let inputElementsArray = [];
    for (let i in this.state.orderForm) {
      inputElementsArray.push({
        id: i,
        configuration: this.state.orderForm[i],
      });
    }
    if (!this.props.showLoadingModal) {
      dynamicDiv = (
        <form onSubmit={this.buttonClickedHandler}>
          {inputElementsArray.map((iterator) => {
            return (
              <Input
                key={iterator.id}
                inputtype={iterator.configuration.elementType}
                value={iterator.configuration.value}
                elementConfig={iterator.configuration.elementConfig}
                label={iterator.configuration.elementConfig.label}
                ShowValidationError={iterator.configuration.validationPassed}
                HasTouched={iterator.configuration.HasTouched}
                changed={(event) => this.onChangeHandler(event, iterator.id)}
                FieldType={iterator.id}
              />
            );
          })}
          <Button buttonType="Success" disabled={!this.state.overallformValid}>
            ORDER THE BURGER
          </Button>
        </form>
      );
    } else dynamicDiv = <Spinner />;
    return <div className={Css.ContactData}>{dynamicDiv}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.BurgerBuilderReducer.ingredientsState,
    totalPrice: state.BurgerBuilderReducer.totalPrice,
    showLoadingModal : state.OrderReducer.showLoadingModal,
    purchaseCompleted : state.OrderReducer.purchaseCompleted,
    token:state.AuthReducer.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postIng: (orderData,token) => {
      dispatch(OrderActionCreator.postIngredients(orderData,token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
