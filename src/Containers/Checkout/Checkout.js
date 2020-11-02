import React, { Component } from "react";
import CheckoutSummaryPage from "../../Components/Order/CheckOutSummaryPage/CheckoutSummaryPage.js";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData.js";
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice : 0
  };
  componentWillMount() {
    let queryParams = new URLSearchParams(this.props.location.search);
    let ingObject = {};
    let price = '';
    for (let i of queryParams.entries()) 
    {
      if(i[0]!== 'price')
      ingObject[i[0]] = +i[1];
      else
      price = +i[1]
    }

    this.setState({
      ingredients: ingObject,
      totalPrice:price
    });
  }

  CancelButtonHandler = () => {
    this.props.history.goBack();
  };
  ContinueButtonHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummaryPage
          ingredients={this.state.ingredients}
          onCancel={this.CancelButtonHandler}
          onContinue={this.ContinueButtonHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render = {()=>{return (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>)}}
        />
      </div>
    );
  }
}
export default Checkout;
