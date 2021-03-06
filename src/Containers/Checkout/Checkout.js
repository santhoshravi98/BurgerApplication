import React, { Component } from "react";
import CheckoutSummaryPage from "../../Components/Order/CheckOutSummaryPage/CheckoutSummaryPage.js";
import { Route ,Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData.js";
import { connect } from "react-redux"; 
class Checkout extends Component {

  CancelButtonHandler = () => {
    this.props.history.goBack();
  };

  ContinueButtonHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/"/>;
    if (this.props.ing) {
      summary = (
        <div>
          <CheckoutSummaryPage
            ingredients={this.props.ing}
            onCancel={this.CancelButtonHandler}
            onContinue={this.ContinueButtonHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.BurgerBuilderReducer.ingredientsState,
  };
};
export default connect(mapStateToProps)(Checkout);
