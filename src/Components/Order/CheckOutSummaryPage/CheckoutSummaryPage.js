import React from "react";
import Button from "../../UI/Button/Button.js";
import Burger from "../../Burger/Burger.js";
import CheckoutSummaryPageCss from "../CheckOutSummaryPage/CheckoutSummaryPage.module.css";
const CheckoutSummaryPage = (props) => {
  return (
    <div className={CheckoutSummaryPageCss.CheckoutSummaryPage}>
      <div>
        <h1>Enjoy the burger</h1>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredients={props.ingredients} />
          <Button buttonClickMethod={props.onCancel} buttonType="Danger">CANCEL</Button>
          <Button buttonClickMethod ={props.onContinue} buttonType="Success">CONTINUE</Button>
        </div>
      </div>    
    </div>
  );
};
export default CheckoutSummaryPage;
