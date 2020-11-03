import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Css from "../ContactData/ContactData.module.css";
import Axios from "../../../Axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner.js";
import { withRouter } from "react-router";
import Input from "../../../Components/UI/Input/Input";

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
          required : 'skipped'
        },
        validationPassed: true,
      },
    },
    showLoadingModal: false,
    overallformValid: false,
  };

  checkValidation = (value, rule) => {
    let validationPassed = false;

    if (rule.required === 'skipped') validationPassed = true;
    else if (rule.required && value.trim() !== "") validationPassed = true;
    else if (rule.length === 5 && value.length === 5) validationPassed = true;

    return validationPassed;
  };

  buttonClickedHandler = (event) => {
    event.preventDefault();
    this.setState({
      showLoadingModal: true,
    });
    if (this.props.totalPrice.length === 0) {
      this.setState({
        showLoadingModal: false,
      });
      return;
    }
    let customerInfo = {};
    for (let info in this.state.orderForm) {
      customerInfo[info] = this.state.orderForm[info].value;
    }
    let postData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: customerInfo,
    };
    console.log(postData);
    Axios.post("/orders.json", postData)
      .then((response) => {
        this.setState({
          showLoadingModal: false,
        });
        console.log(response);
        console.log("Data posted sucesfully to google firebase - by santhosh");
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          showLoadingModal: false,
        });
        console.log(error);
        console.log("Data post error");
      });
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
    let dynamicDiv = null;
    let inputElementsArray = [];
    for (let i in this.state.orderForm) {
      inputElementsArray.push({
        id: i,
        configuration: this.state.orderForm[i],
      });
    }
    if (!this.state.showLoadingModal) {
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
export default withRouter(ContactData);
